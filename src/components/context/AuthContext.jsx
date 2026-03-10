import React, { createContext, useContext, useEffect, useState } from "react";
import { useAlert } from './AlertContext'
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    // console.log(BACKEND_API)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(''); // controle login/signup modal

    const { showAlert } = useAlert();
    const navigate = useNavigate();

    const login = async(userData) => {
        setLoading(true);

        try {
            const response = await fetch(`${BACKEND_API}/api/v1/auth/login`, {
                'method': "POST",
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                },
                'body': JSON.stringify(userData),
            })

            const data = await response.json();
            if(!response.ok) {            
                throw new Error(data.message || "Failed to login");
            }

            setUser(data.user)
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
    const register = async (userData) => {
        setLoading(true);
        
        try {
            const response = await fetch(`${BACKEND_API}/api/v1/auth/register`, {
                'method': "POST",
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                },
                'body': JSON.stringify(userData),
            })

            const data = await response.json();
            if(!response.ok) {            
                throw new Error(data.message || 'failed to register user');
            }

            setUser(data.user)
            localStorage.setItem("token", data.token)

            showAlert(`Welcome, ${data.user.name}`, 'success') 
            return true;
        }
        catch(error){
            console.error(error);
            showAlert(error.message)
        } 
        finally {
            setLoading(false);
            setShow('');
        }
    }
    const logout = async () => {
        setLoading(true);
        try {
            // await new Promise((resolve)=>setTimeout(resolve, 2000))
            
            setUser(null)
            
            localStorage.removeItem("token");
            showAlert("Goodbye", "success")
        
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
            const response = await fetch(`${BACKEND_API}/api/v1/auth/me`,{
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
                throw new Error(data.message || "Failed to fetch current user")
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
    const updateCredential = async (userData) => {
        setLoading(true);

        try {
            // await new Promise((resolve)=>setTimeout(resolve, 3000))
            const response = await fetch(`${BACKEND_API}/api/v1/auth`, {
                'method': 'PATCH',
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`

                },
                'body': JSON.stringify(userData),
            })
            const data = await response.json();
            // console.log(data)
            if(!response.ok) {
                throw new Error(data.message || "Failed to update user")
            }
            setUser(data.user);
            showAlert("User credential updated", "success");
            return true
   
        } 
        catch (error) {
            console.error(error);
            showAlert(error.message)
            return false
        }
        finally {
            setLoading(false);
        }
    }

    // fetch current user if jwt key exists in local storage
    useEffect(()=>{

      fetchCurrentUser();
  }, [])

//   useEffect(() => {
//     console.log("User changed:", user);
//     }, [user]);

    return (
        <AuthContext.Provider value={{ user, login, register, logout, updateCredential, loading, setLoading, show, setShow }}>
            {children}
        </AuthContext.Provider> 
    )
}

export const useAuth = () => useContext(AuthContext)