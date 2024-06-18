import React, { createContext, useEffect, useState,ReactNode } from 'react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  username: string;
  email: string;
  is_manager: boolean;
  access_token: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isLoading: boolean;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  userToken: string | null;
  userData: UserData | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  loginUser: () => {},
  logoutUser: () => {},
  userToken: null,
  userData: null,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string | null>(null)
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await axios.post("/login", {
        email,
        password,
      });
      
      const userdata: UserData = res.data;
      console.log(userdata)
      setUserData(userdata);
      setUserToken(userdata.access_token);
      
      
      localStorage.setItem('userInfo', JSON.stringify(userdata));
      localStorage.setItem('userToken', userdata.access_token);
      navigate(userdata.is_manager ? '/manager-dashboard' : '/dashboard');
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const logoutUser = () => {
    setUserToken(null)
    localStorage.removeItem('userInfo')
    localStorage.removeItem('userToken')
    setIsLoading(false)
    navigate("/")
  }

  const isLoggedIn = async () =>{
    try{
        setIsLoading(true)
        const usertoken = await localStorage.getItem('userToken') 
        const userinfo = await localStorage.getItem('userInfo')
        if (userinfo){
            setUserToken(usertoken)
            setUserData(JSON.parse(userinfo))
        }
        setIsLoading(false)
    }
    catch(error){
        console.log(`isLogged in error ${error}`)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoading, loginUser, logoutUser, userToken, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

