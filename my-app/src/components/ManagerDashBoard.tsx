import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import { DepartmentsProps, Task } from '../types';


const ManagerDashboard: React.FC<DepartmentsProps> = ({departments}) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {

        const fetchTasks = async () => {
            
            try {
              const response = await axios.get<Task[]>("/tasks");
              setTasks(response.data);
            } catch (err) {
              console.error('Error fetching tasks');
            } 
          };
    
        fetchTasks();
      }, []);
    
    const handleDelete = async (id: number) => {
        
        try {
            await axios.delete(`/users/${id}`);
            console.log("User Deleted successfully")
            window.location.reload()
          } catch (err) {
            console.error('Error deleting user');
          }
      }

     
      return(
        <>

        <Header />
        
        
      
        <div className='mt-2'>
          <h1 className='flex justify-center mb-3 font-bold uppercase'>Employee List</h1>
          
          {departments.map(department => (
            <div key={department.id}>
                <hr/>
                <p className='flex justify-center mb-3 font-bold uppercase'><strong >Department: </strong>{department.name}</p>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 mb-5 mt-3'>

                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>

                
                    <tr>
                        <th scope="col" className="px-6 py-3">ID</th>
                        <th scope="col" className="px-6 py-3">Name</th>
                        <th scope="col" className="px-6 py-3">Email Address</th>
                        <th scope="col" className="px-6 py-3">Role</th>
                        <th scope="col" className="px-6 py-3">Tasks</th>
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
                            <td>
                            {user.tasks.map(task => (
                                <ul key={task.id}>
                                    <li>{task.title}
                                    </li>
                                </ul> 
                            ))}
                            </td>
                            <td><Link className="mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" to={`/update user/${user.id}`}>Edit</Link></td>
                            <td><button className="mt-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"onClick={() => handleDelete(user.id)}>Delete</button></td>
                        </tr>
                        </tbody>
                    ) : null
                ))}

                </table>
                            
            </div>
            
          ))}

          

          <div className='flex flex-wrap justify-center mt-10 gap-4'>

            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Task Completion Rates</h5>
            
            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>{tasks.length}</strong> Pending Tasks</p>
            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>{tasks.filter(task => task.status === 'completed').length}</strong> Completed Tasks</p>
            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>{(tasks.length > 0 ? (tasks.filter(task => task.status === 'completed').length / tasks.length) * 100 : 0).toFixed(2)}%</strong> Completion Rate</p>
            </div>

            <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Pending Tasks</h5>
            
            <p className="font-normal text-gray-700 dark:text-gray-400"><strong>{tasks.filter(task => task.status !== 'completed').length}</strong> Total Tasks</p>
            
            </div>
        </div>


        
          
        </div>

        </>
      )
}

export default ManagerDashboard;