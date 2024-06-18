import { useContext } from "react"
import { AuthContext } from "../context/Authentication"
import { Link } from "react-router-dom";

export default function Header(){
    const {logoutUser, userData} = useContext(AuthContext);   
    
    return(        

        <nav className="bg-white dark:bg-gray-900 fixed w-full top-0 start-0 border-b border-gray-200 dark:border-gray-600 relative">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href={userData?.is_manager ? "/manager-dashboard" : "/dashboard"} className="flex items-center space-x-3 rtl:space-x-reverse">

            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Company System</span>
            </a>
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <p className="text-white py-1 pr-5">{userData?.username}</p>
                 
                
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => logoutUser()}>Logout</button>
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
            </div>
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                <Link to={userData?.is_manager ? "/manager-dashboard" : ""} className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">{userData?.is_manager ? "Home" : ""}</Link>
                </li>
                <li>
                <Link to={userData?.is_manager ? "/manager-departments" : ""}  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{userData?.is_manager ? "Departments" : ""} </Link>
                </li>
                <li>
                <Link to={userData?.is_manager ? "/manager-users" : ""}  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{userData?.is_manager ? "Users" : ""} </Link>
                </li>
                <li>
                <Link to={userData?.is_manager ? "/manager-tasks" : ""}  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{userData?.is_manager ? "Tasks" : ""} </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>


           
    )
}