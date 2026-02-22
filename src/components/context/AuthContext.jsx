import React, { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from './AlertContext'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const backendApi = 'http://localhost:3000'

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState(''); // controle login/signup modal

    const { showAlert } = useAlert();

    const login = async(userData) => {
        setLoading(true);
        console.log('IN LOGIN')
            console.log(userData)
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/login', {
                'method': "POST",
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                },
                'body': JSON.stringify(userData),
            })

            const data = await response.json();
            if(!response.ok) {            
                throw new Error(data.msg || "faileed to login");
            }

            setUser(data)
            localStorage.setItem("token", data.token)

            showAlert(`Welcome back, ${data.user.name}`, 'success') 
            return true;
        }
        catch(error){
            console.error(error);
            showAlert(error.message, 'danger')
        } 
        finally {
            setLoading(false);
            setShow('');
        }
    }
    const register = async ({userData}) => {
        setLoading(true);
            
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/register', {
                'method': "POST",
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                },
                'body': JSON.stringify(userData),
            })

            const data = await response.json();
            if(!response.ok) {            
                throw new Error(data.msg || 'failed to register user');
            }

            setUser(data)
            localStorage.setItem("token", data.token)

            showAlert(`Welcome, ${data.user.name}`, 'success') 
            return true;
        }
        catch(error){
            console.error(error);
            showAlert(error.message, 'danger')
        } 
        finally {
            setLoading(false);
            setShow('');
        }
    }
    const logout = async () => {
        try {
            setLoading(true);
            await new Promise((resolve)=>setTimeout(resolve, 2000))
            
            setUser(null)
            
            localStorage.removeItem("token");
            setAlert("Goodbye")
            
        } catch (error) {
            // no error not api
            console.error(error)
        } finally {
            setLoading(false);
        }
        
    }

    const fetchCurrentUser = async() => {
        setLoading(true);
        if(!localStorage.getItem("token")){
            setLoading(false);
            return null;
        }
        // await new Promise((resolve)=>setTimeout(resolve, 2000))
        try{
            const response = await fetch('http://localhost:3000/api/v1/auth/me',{
                'method': "GET",
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (response.status === 401) {
                throw new Error("Session expired. Please login again.");
            }
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.msg || "Failed to fetch current user")
            }
            setUser(data.user)
        }
        catch(error){
            console.error(error);
            logout()
        } 
        finally {
            setLoading(false);
        }
    }

    // fetch current user if jwt key exists in local storage
    useEffect(()=>{
        console.log(show)
      fetchCurrentUser();
  }, [])

  useEffect(() => {
    console.log("User changed:", user);
    }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, show, setShow }}>
            {children}
        </AuthContext.Provider> 
    )
}

export const useAuth = () => useContext(AuthContext)