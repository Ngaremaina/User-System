import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { DepartmentsProps, DepartmentDetails } from '../types';


const UpdateDepartmentForm: React.FC<DepartmentsProps> = ({departments}) => {
    const { id } = useParams<{ id: string }>();
    
    const [formData, setFormData] = useState<DepartmentDetails >({
        name: '',
        
    });

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await axios.get<DepartmentDetails >(`/departments/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching department details:', error);
                setError('Error fetching department details');
            }
        };
        
        fetchUserDetails();
    }, [id]);

    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);   

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = event.target;
        if (type === 'checkbox') {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: (event.target as HTMLInputElement).checked,
            }));
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        // Create an object with only the fields to be updated
        const updatedData: Partial<DepartmentDetails > = {
            name: formData.name,
            
        };


        try {
            console.log('Submitting data:', updatedData); // Log the data being submitted
            await axios.patch(`/departments/${id}`, updatedData);
            console.log('Department updated successfully');
            // Optionally handle success (e.g., show success message, redirect)
        } catch (error: any) {
            console.error('Error updating department:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(`Error updating user: ${error.response.data.message || 'Bad Request'}`);
            } else {
                setError('Error updating user');
            }
        } finally {
            setLoading(false);
        }

        window.location.reload()
        
        
    };

    return (
        <>
            <Header />
            <div className='flex justify-center mt-5 w-full'>
                <div className='w-1/2 flex justify-center'>
                    <div  className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><strong className='uppercase'> Department</strong></h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Name: </strong>{formData.name}</p>
                    
                    </div>
                </div>

            
            <div className="w-1/2">
                <h2 className="flex justify-center mb-3 font-bold uppercase">Update Department</h2>
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">
                            Name:
                        </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Update Department
                    </button>
                </form>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

          
            </div>
        </>
    );
};

export default UpdateDepartmentForm;
