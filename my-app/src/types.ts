import exp from "constants";

 
export interface UserData {
    id: number;
    username: string;
    email: string;
    is_manager: boolean;
    tasks: Task[];
    department_id:number;
}
  
export interface Task {
    id: number;
    title: string;
    description: string;
    due_date: string;
    status: string;
    user_id:number;
    
}
  

export interface User {
    id: number;
    username: string;
    email: string;
    is_manager: boolean;
    department_id:number;
    
   
  }

export interface Department{
    id: number;
    name:string;
    users:UserData[];
}

export interface DepartmentsProps {
    departments: Department[];
  }

export interface UserFormState {
    username: string;
    email: string;
    password: string;
    is_manager: boolean;
    department_id: number;
}

export interface DepartmentOnly {
    id: number;
    name: string;
}

export interface Users{
    id: number;
    username: string;
  }

export interface DepartmentDetails {
    name: string;
}

export interface TaskDetails {
    title: string;
    description: string;
    due_date: string;
    status: string;
    user_id:number;
    
}

export interface RegisterUser{
    id: number;
    username: string;
    email: string;
    is_manager: boolean;
    department_id:number;
    password:string;

}
