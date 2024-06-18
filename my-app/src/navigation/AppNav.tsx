import { AuthContext } from "../context/Authentication";
import { useContext } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";

export default function AppNav() {
    const { isLoading, userToken } = useContext(AuthContext);

    if (isLoading) {
        return (
            <>
            <p>Loading...</p>
            </>
        )
    }

    return (
       <div>
            {userToken !== null ? <AppStack /> : <AuthStack />}
        
       </div>
    )
}

