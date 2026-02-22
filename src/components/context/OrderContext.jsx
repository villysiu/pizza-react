import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthContext'
import { useAlert } from './AlertContext';
import {useCart} from './CartContext';
const OrderContext = createContext();


export const OrderProvider = ({ children }) => {
    const backendApi = 'http://localhost:3000'

    const { user } = useAuth();
    const { showAlert } = useAlert();
    const { getCarts } = useCart();
    const [orders, setOrders] = useState([])
    // const [orderDetails, setOrderDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false) // control the details display


    const getOrders = async () => {
        setLoading(true)
        try {
            const response = await fetch(`${backendApi}/api/v1/orders`, {
                'method': "GET",
                'headers': {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(!response.ok) {
                console.log("Failed to fetch orders");
                throw new Error(data.msg);
            }
            setOrders(data.orders)
            
            
        
        } catch (error) {
            console.error(error);
            showAlert(error.message, 'danger')
            // setFetchOrdersStatus('failed')
        }
        finally{
            setLoading(false)
        }
    }
    const getOrderDetails = async (orderId) => {
        setLoading(true)
        setShow(null)
        try {
            await new Promise((resolve)=>setTimeout(resolve, 2000))
            
            const response = await fetch(`${backendApi}/api/v1/orders/${orderId}`, {
                'method': "GET",
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.msg || "Failed to create new order");
            }
            console.log('order added:', data);
            
            // replace order with fetched order with orderdetails to 
            setOrders(orders.map(order =>
                order._id === orderId ? data : order
            ))
            setShow(orderId)


        } catch (error) {
            console.error(error);
            showAlert(error.message, 'danger')
        }
        finally{
            setLoading(false)
        }
    }
    const addOrder = async () => {

        setLoading(true)
        try {
            await new Promise((resolve)=>setTimeout(resolve, 2000))
            
            const response = await fetch(`${backendApi}/api/v1/orders`, {
                'method': "POST",
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(!response.ok) {
                throw new Error(data.msg || "Failed to create new order");
            }
            console.log('new order added:', data);
            
            await getOrders()
            await getCarts()


        } catch (error) {
            console.error(error);
            showAlert(error.message, 'danger')
        }
        finally{
            setLoading(false)
        }
    }
    
    const deleteOrder = async(orderId) => {
        console.log("delete order")
        setLoading(true)

        try {
            await new Promise((resolve)=>setTimeout(resolve, 2000))
                
            const response = await fetch(`${backendApi}/api/v1/orders/${orderId}`, {
                'method': 'DELETE',
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.msg || "Failed to delete order")
            }
            await getOrders()
            
        } catch (error) {
            console.error(error.message)
            showAlert(error.message, 'danger')
        }
        finally {
            setLoading(false)
        }
    }

    
    
    useEffect(()=>{
        if(user === null){
            setOrders([])
            return;
        }
        getOrders();
    }, [user])

    

    return (
        <OrderContext.Provider 
            value={{ 
                orders, 
                show, setShow, 
                getOrders,
                getOrderDetails,
                addOrder,
                deleteOrder, 
                loading 
        }}>
            {children}
        </OrderContext.Provider> 
    )
}

export const useOrder = () => useContext(OrderContext)