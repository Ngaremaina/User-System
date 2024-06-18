import React, { useState } from 'react';
import axios from 'axios';
import { DepartmentsProps } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterFormData {
  username: string;
  password: string;
  is_manager: boolean;
  email: string;
  department_id: number;
}

const Register: React.FC<DepartmentsProps> = ({departments}) => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    is_manager: false,
    email: '',
    department_id: 1
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: (event.target as HTMLInputElement).checked, // Type assertion to HTMLInputElement
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      await axios.post('/register', formData);
      console.log('User registered successfully');
      // Optionally handle success (i.e redirect to login page)
      navigate("/sign in")
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle error (e.g., display error message to user)
    }
  };

  

  return (
    <div className="flex justify-center mt-4">

    
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      
      <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xl font-medium text-gray-900 dark:text-white">Sign Up on our Platform</h2>
        <div>
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        
        
        <div>
          <label htmlFor="email"  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        <div>
        <label htmlFor="department_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Department:
        </label>
        <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="department_id"
            name="department_id"
            value={formData.department_id}
            onChange={handleChange}
        >
            <option value="">Select a department</option>
            {departments.map((department) => (
                <option key={department.id} value={department.id}>
                    {department.name}
                </option>
            ))}
        </select>
                    </div>
                    <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <input
              type="checkbox"
              name="is_manager"
              checked={formData.is_manager}
              onChange={handleChange}
              
             
            />  Manager
          </label>
        </div>
        <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Already registered? <Link to="/sign in" className="text-blue-700 hover:underline dark:text-blue-500">Login to account</Link></div>
      </form>
    </div>
    </div>
  );
};

export default Register;
