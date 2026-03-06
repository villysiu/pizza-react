import React, {useEffect} from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAlert } from '../context/AlertContext'

const ProtectedRoute = ({children}) => {
    const { user, loading } = useAuth();
    const { showAlert } = useAlert();
    const location = useLocation();

    console.log(location)
    console.log("loading;", loading)
    
    useEffect(() => {
        if (!loading && !user) {
            showAlert("Authentication required. Return to homepage", "warning");
        }
    }, [user, loading, showAlert]);

        if(loading)
            return;
        if (!user) {
            return <Navigate to="/" state={{ from: location }} replace />;

            
        }


    return children
}

export default ProtectedRoute