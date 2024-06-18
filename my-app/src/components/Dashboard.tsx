import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Header from './Header';
import { UserData, TaskDetails } from '../types';
import { AuthContext } from '../context/Authentication';


const Dashboard: React.FC = () => {
    const {userData} = useContext(AuthContext)
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
   
    useEffect(() => {

        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get<UserData>(`/users/${userData?.id}`);
                setUser(response.data); // Assuming API returns user object
            } catch (error) {
                setError('Error fetching user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
        


    },[userData?.id])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    if (!user) return <p>User not found</p>; // Handle case when user is not fetched yet or not found


    const UpdateTask = async (id: number, title: string, description: string, due_date: string, status: string) => {

        // Create an object with only the fields to be updated
        const updatedData: Partial<TaskDetails> = {
            title: title,
            description: description,
            due_date: due_date,
            status: status,
            user_id: userData?.id,
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

    }

  
    return (
        <div>
            <Header />
            <div>
            
            <h2 className='flex justify-center font-bold uppercase'>Task Board</h2>
            <div className='flex flex-wrap justify-center mt-10 gap-4'>

           
            {user.tasks.filter(task => task.status.toLowerCase() !== "done").map(task => (
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-3" key={task.id}>
            
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
       
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}.</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.due_date}.</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.status}.</p>
            <div className='flex justify-between'>

            <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => UpdateTask(task.id, task.title, task.description, task.due_date, "In progress")}>
                In Progress
                
            </button>
            <button  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => UpdateTask(task.id, task.title, task.description, task.due_date,"Done")}>
                Done
            </button>
            </div>
        </div>


            ))}

            </div>

            <h2 className='flex justify-center font-bold uppercase'>Completed Tasks</h2>
            <div className='flex flex-wrap justify-center mt-10 gap-4'>
            
            
            {user.tasks.filter(task => task.status.toLowerCase() === "done").map(task => (
            <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-3" key={task.id}>
            
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task.title}</h5>
       
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}.</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.due_date}.</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.status}.</p>
            <div className='flex justify-between'>

            <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={() => UpdateTask(task.id, task.title, task.description, task.due_date, "In progress")}>
                In Progress
                
            </button>
            <button  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={() => UpdateTask(task.id, task.title, task.description, task.due_date,"Done")}>
                Done
            </button>
            </div>
        </div>


            ))}


        </div>

           
        </div>
        
        </div>
    );
    };

export default Dashboard;
