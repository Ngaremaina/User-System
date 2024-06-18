import React, { useContext, useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateTaskForm from '../components/CreateTasks';
import AddDepartment from '../components/AddDepartment';
import Dashboard from '../components/Dashboard';
import ManagerDashboard from '../components/ManagerDashBoard';
import { AuthContext } from '../context/Authentication';
import UpdateUserForm from '../components/UpdateUser';
import { Department } from '../types';
import axios from 'axios';
import UpdateDepartmentForm from '../components/UpdateDepartment';
import UpdateTaskForm from '../components/UpdateTasks';
import UserForm from '../components/AddUsers';


const App: React.FC = () => {
    const {userData} = useContext(AuthContext)
    const [departments, setDepartments] = useState<Department[]>([]);
    

  useEffect(() => {

    const fetchDepartments = async () => {
        
        try {
          const response = await axios.get<Department[]>("/departments");
          setDepartments(response.data);
        } catch (err) {
          console.error('Error fetching employees');
        } 
      };

    fetchDepartments();
  }, []);
  
  return (
    <>           
        <Routes>
          <Route
            path="/dashboard"
            element={userData ? <Dashboard /> : <p>Loading...</p>}
          />
          <Route
            path="/manager-dashboard"
            element={userData ? <ManagerDashboard departments = {departments}/> : <p>Loading...</p>}
          />
         
            <Route path="/manager-departments" element = {<AddDepartment departments = {departments}/>}></Route>
            <Route path="/manager-users" element = {<UserForm departments = {departments} />}></Route>
            <Route path="/manager-tasks" element = {<CreateTaskForm departments = {departments}/>}></Route>
            <Route path="/update user/:id" element = {<UpdateUserForm departments = {departments}/>} ></Route>
            <Route path="/update department/:id" element = {<UpdateDepartmentForm departments = {departments}/>} ></Route>
            <Route path="/update tasks/:id" element = {<UpdateTaskForm departments = {departments}/>} ></Route>
    
          
        </Routes>

        </>
  );
};

export default App;
