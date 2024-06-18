import Login from "../components/Login";
import { Routes, Route } from "react-router-dom";
import SignUp from "../components/SignUp";
import { useState, useEffect } from "react";
import axios from "axios";
import { Department } from "../types";
import LandingPage from "../components/LandingPage";

export default function AuthStack(){
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
    return(
      <div>
        <Routes>
            <Route path="/" element = {<LandingPage />}></Route>
            <Route path = "/sign in" element = {<Login />}></Route>
            <Route path = "/sign up" element = {<SignUp departments = {departments} /> }></Route>
        </Routes>
        </div>
    )
}