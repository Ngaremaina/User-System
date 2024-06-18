import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { DepartmentsProps, DepartmentDetails } from '../types';
import { Link } from 'react-router-dom';

const AddDepartment: React.FC<DepartmentsProps> = ({departments}) => {
    
    const [formData, setFormData] = useState<DepartmentDetails>({
        name: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('/departments', formData);
            console.log('Post successful:', response.data);
            // Handle success (e.g., show success message, redirect, etc.)
            window.location.reload()
        } catch (error) {
            console.error('Error posting data:', error);
            // Handle error (e.g., show error message, log error, etc.)
        }
        
    };

    const handleDelete = async (id: number) => {
        
        try {
            await axios.delete(`/departments/${id}`);
            console.log("Department Deleted successfully")
            window.location.reload()
          } catch (err) {
            console.error('Error deleting department:', err);
            
          }
      }

    return (
        <>

        <Header />
     
        <div className='mt-2'>
            <h2 className='flex justify-center mb-3 font-bold uppercase'>Create Department</h2>
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                <div className='mb-5'>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Department Name:</label>
                    <input 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Department</button>
            </form>

            <table>

            </table>
        </div>

        <div className='relative overflow-x-auto mt-5'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">DEPARTMENT NAME</th>
                        <th scope="col" className="px-6 py-3">EDIT DEPARTMENT</th>
                        <th scope="col" className="px-6 py-3">DELETE DEPARTMENT</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map(department => (
                    <tr key={department.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'> 
                        <td className="px-6 py-4">{department.id}</td>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{department.name}</th>    
                        <td><Link className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to={`/update department/${department.id}`}>Edit</Link></td>
                        <td><button className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"onClick={() => handleDelete(department.id)}>Delete</button></td>           
                    </tr>
                    
                ))}
                    
                </tbody>
            </table>
        
        </div>

        </>
    );
};

export default AddDepartment;
