import React, { useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { DepartmentsProps } from '../types';
import { Link } from 'react-router-dom';


const UserForm: React.FC<DepartmentsProps> = ({departments}) => {
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        is_manager:false,
        department_id: '',
       
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formData)
        try {
            await axios.post('/register', formData);
            // Optionally handle success (e.g., show success message, redirect)
            console.log('User created successfully');
            window.location.reload()
        } catch (error) {
            console.error('Error creating department:', error);
            // Handle error (e.g., show error message to user)
        }
       
    };


    const handleDelete = async (id: number) => {
        
        try {
            await axios.delete(`/users/${id}`);
            console.log("User Deleted successfully")
            window.location.reload()
          } catch (err) {
            console.error('Error deleting user');
          }
      }

    return (
        <>
        <Header />
        
        
        <div className='mt-2'>
            <h2 className='flex justify-center mb-3 font-bold uppercase'>Create User</h2>
            <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                <div>
                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="department_id" className="block mb-2 text-sm font-medium text-gray-900">Department:</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="department_id"
                        name="department_id"
                        value={formData.department_id}
                        onChange={handleChange}
                    >
                        <option value="">Select a department</option>
                        {departments.map(department => (
                            <option key={department.id} value={department.id}>
                                {department.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Users</button>
            </form>
        </div>

        <div className='mt-5'>

        {departments.map(department => (
            <div key={department.id}>
                <hr/>
                <p className='flex justify-center mb-3 font-bold uppercase mt-2'>{department.name}</p>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-5 mt-3'>

                
               
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>

                
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email Address</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">Edit User</th>
                        <th scope="col" className="px-6 py-3">Delete User</th>

                    </tr>
                </thead>
                {department.users.map(user => (
                    !user.is_manager ? (
                        <tbody key={user.id}>

                        
                        <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                            <td className="px-6 py-4">{user.id}</td>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.username}</th>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">Employee</td>
                            
                            
                            <td><Link className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to={`/update user/${user.id}`}>Edit</Link></td>
                            <td><button className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"onClick={() => handleDelete(user.id)}>Delete</button></td>
                        </tr>
                        </tbody>
                    ) : null
                ))}

                </table>
                            
            </div>
            
          ))}
        </div>

        

        </>
    );
};

export default UserForm;
