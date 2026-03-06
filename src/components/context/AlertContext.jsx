

import React, { createContext, useContext, useEffect, useState } from "react";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);
    const [cartAlert, setCartAlert] = useState(null);

    const showAlert = (message, variant='danger') => {
        const id = Date.now();

        setAlerts((currentAlerts )=>{
            if(currentAlerts.some(alert=>(alert.message===message && alert.variant ===variant)))
                return currentAlerts;

            const updatedAlerts = [...currentAlerts, {id, message, variant}];
            setTimeout(()=>{
                setAlerts(arr=>arr.filter(item => item.id !== id));
            }, 3000);

            return updatedAlerts;
        })
    }
    const createCartAlert = (message, variant = 'danger') => {
        setCartAlert({ message, variant });

        setTimeout(() => {
            setCartAlert(null);
        }, 3000);
    };
        
        

    const removeAlert = (id) => {
        setAlerts(arr=>arr.filter(item => item.id !== id));
    }

    return (
        <AlertContext.Provider value={{ alerts, showAlert, removeAlert, cartAlert, createCartAlert }} >
            { children }
        </AlertContext.Provider>
    )
}
export const useAlert = () => useContext(AlertContext)
