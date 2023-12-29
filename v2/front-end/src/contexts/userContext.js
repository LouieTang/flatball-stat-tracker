import React, {createContext, useState, useEffect} from "react";
import { getUser } from "../services/userManager.js";

export const UserContext = createContext({});

export function UserContextProvider({children}) {

    const [user, setUser] = useState("");
    useEffect(()=>{
        if(!user){
            setUser(async () => {
                const receivedUser = await getUser();
                console.log(receivedUser);
                return receivedUser;
            });
        }
    }, []);
    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};