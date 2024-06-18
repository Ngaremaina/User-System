import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import { DepartmentsProps, Users } from '../types';



const CreateTaskForm: React.FC<DepartmentsProps> = ({departments}) => {
   
    const [formData, setFormData] = useState({
        
        title:"",
        description:"",
        due_date:"",
        status: '',
        user_id:0
        
    });
    const [users, setUsers] = useState<Users[]>([]);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get<Users[]>('/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
            // Handle error (e.g., show error message to user)
        }
    };

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
            await axios.post('/tasks', formData);
            // Optionally handle success (e.g., show success message, redirect)
            console.log('Task created successfully');
            window.location.reload()
        } catch (error) {
            console.error('Error creating task:', error);
            // Handle error (e.g., show error message to user)
        }
       
    };

    const handleDelete = async (id: number) => {
        
        try {
            await axios.delete(`/tasks/${id}`);
            console.log("Task Deleted successfully")
            window.location.reload()
          } catch (err) {
            console.error('Error deleting task');
          }
      }

    return (
        <>
        <Header />

        
        <div className='mt-2'>
            <h2 className='flex justify-center mb-3 font-bold uppercase'>Create Task</h2>
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
                <button type="submit" className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Task</button>
            </form>

            <p className='flex justify-center mb-3 font-bold uppercase'><strong >TASKS </strong></p>

            {departments.map(department => (
            <div key={department.id}> 
                
                {department.users.map(user => (
                    !user.is_manager ? (    
                        <div key={user.id}>
                            <hr/>
                            

                        
                        <div className='relative overflow-x-auto p-6'>
                            <p className='flex justify-center font-bold uppercase'>Tasks for {user.username}</p>
                            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                                <thead className='class="text-xs text-gray-700 uppercase bg-gray-400  dark:text-gray-400"'>
                                    <tr>

                                    
                                    <th scope="col" className="px-6 py-3">ID</th>
                                    <th scope="col" className="px-6 py-3">Title</th>
                                    <th scope="col" className="px-6 py-3">Description</th>
                                    <th scope="col" className="px-6 py-3">Due Date</th>
                                    <th scope="col" className="px-6 py-3">Status</th>
                                    <th scope="col" className="px-6 py-3">Edit Task</th>
                                    <th scope="col" className="px-6 py-3">Delete Task</th>
                                    </tr>
                                </thead>
                                <tbody>

                            {user.tasks.map(task => (
                                <tr key={task.id}>
                                    <td>{task.id}</td>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td>{task.due_date}</td>
                                    <td className='uppercase font-bold'>{task.status}</td>
                                    <td><Link className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to={`/update tasks/${task.id}`}>Edit</Link></td>
                                    <td><button className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"onClick={() => handleDelete(task.id)}>Delete</button></td>
                                    
                                </tr> 
                            ))}
                             </tbody>
                            </table>
                            
                        </div>
                        </div>
                      
                    ) : null
                ))}

                
                            
            </div>
            
          ))}

            



        </div>
        </>
    );
};

export default CreateTaskForm;
