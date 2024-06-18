import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { User, DepartmentsProps, TaskDetails } from '../types';

const UpdateTaskForm: React.FC<DepartmentsProps> = ({departments}) => {
    const { id } = useParams<{ id: string }>();
    const [users, setUsers] = useState<User[]>([]);
    
    const [formData, setFormData] = useState<TaskDetails>({
        title:"",
        description:"",
        due_date:"",
        status: '',
        user_id:0
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTasksDetails = async () => {
            try {
                const response = await axios.get<TaskDetails>(`/tasks/${id}`);
                setFormData(response.data);
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('Error fetching user details');
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get<User[]>('/users');
                setUsers(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Error fetching users');
                setLoading(false);
            }
        };

        fetchTasksDetails();
        fetchUsers();
    }, [id]);


    

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
        const updatedData: Partial<TaskDetails> = {
            title: formData.title,
            description: formData.description,
            due_date: formData.due_date,
            status: formData.status,
            user_id: formData.user_id,
        };

        

        try {
            console.log('Submitting data:', updatedData); // Log the data being submitted
            await axios.patch(`/tasks/${id}`, updatedData);
            console.log('Task updated successfully');
            // Optionally handle success (e.g., show success message, redirect)
        } catch (error: any) {
            console.error('Error updating task:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
                setError(`Error updating task: ${error.response.data.message || 'Bad Request'}`);
            } else {
                setError('Error updating task');
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
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"><strong className='uppercase'>Details of {formData.title}</strong></h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Title: </strong>{formData.title}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Description: </strong>{formData.description}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Due Date: </strong>{formData.due_date}</p>
                    <p className="font-normal text-gray-700 dark:text-gray-400"><strong>Status:</strong> {formData.status}</p>
                    <p className='font-normal text-gray-700 dark:text-gray-400'>Employee Name: {departments.map((department) => (<>
                            {department.users.map((user) => (
                                <strong>{user.id === formData.user_id ? `${user.username}` : ""}</strong>
                            ))}
                        </>
                    ))}
                    </p>
                    </div>
                </div>

            
            <div className="w-1/2">
                <h2 className="flex justify-center mb-3 font-bold uppercase">Update Task</h2>
                <form onSubmit={handleSubmit} className='max-w-sm mx-auto'>
                <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="due_date" className="block mb-2 text-sm font-medium text-gray-900">Date:</label>
                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        type="datetime-local"
                        id="due_date"
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                    />
                </div>
                <div>
                <label htmlFor="status" className="block mb-2 text-sm font-medium text-gray-900">Status:</label>
                <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="">Select an Option</option>
                    <option value="not started">Not Started</option>
                    <option value="in progress">In Progress</option>
                    <option value="done">Done</option>
                </select>

                </div>
                <div>
                    <label htmlFor="user_id" className="block mb-2 text-sm font-medium text-gray-900">Employee:</label>
                    <select
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        id="user_id"
                        name="user_id"
                        value={formData.user_id}
                        onChange={handleChange}
                    >
                        <option value="">Select a user</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update Task</button>
            </form>
                {loading && <p>Loading...</p>}
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>

            
            </div>
        </>
    );
};

export default UpdateTaskForm;
