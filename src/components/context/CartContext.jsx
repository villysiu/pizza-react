import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from './AuthContext'
import { useAlert } from './AlertContext';

const CartContext = createContext();


export const CartProvider = ({ children }) => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;

    const { user } = useAuth();
    const { createCartAlert, showAlert } = useAlert();
    const [carts, setCarts] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false) //control cart offcanvas
    const [ pendingItem, setPendingItem ] = useState(null)

    const getCarts = async () => {
        setLoading(true)

        try {
            const response = await fetch(`${BACKEND_API}/api/v1/carts`, {
                'method': "GET",
                'headers': {
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json()
            if(!response.ok) {
                console.log("Failed to fetch carts");
                throw new Error(data.msg);
            }
            setCarts(data.carts)
            setSubtotal(data.subtotal)
            
        
        } catch (error) {
            console.error(error);
            showAlert(error.message, 'danger')
        }
        finally{
            setLoading(false)
        }
    }
    
    const addCart = async (item) => {
        console.log(item)
        setLoading(true)
        try {
            // await new Promise((resolve)=>setTimeout(resolve, 2000))
            
            const response = await fetch(`${BACKEND_API}/api/v1/carts`, {
                'method': "POST",
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                'body': JSON.stringify(item)
            })
            const data = await response.json()
            console.log(data)
            if(!response.ok) {
                throw new Error(data.message || "Failed to add item");
            }
            console.log('new item added:', data.cart);
            
            await getCarts()
            setShow(true)
            createCartAlert("item added", 'success')

        } catch (error) {
            console.error(error);
            showAlert(error.message, 'danger')
        }
        finally{
            setLoading(false)
        }
    }
    const updateCart = async (item) => {
        console.log("update cart")
        console.log(item);
        setLoading(true)

        try {
            // await new Promise((resolve)=>setTimeout(resolve, 2000))
                
            const response = await fetch(`${BACKEND_API}/api/v1/carts/${item.cartId}`, {
                'method': 'PATCH',
                'headers': {
                    'content-type': 'application/json',
                    'accept': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                'body': JSON.stringify(item.selectedItem)
            })


            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.message || "Failed to update cart item")
            }
            await getCarts()   
            createCartAlert("Item updated", 'success')

        } catch (error) {
            createCartAlert(error.message, 'danger')
        }
        finally {
            setLoading(false)
        }
    }
    const deleteCart = async(cartId) => {
        console.log("delete cart")
        setLoading(true)

        try {
            // await new Promise((resolve)=>setTimeout(resolve, 2000))
                
            const response = await fetch(`${BACKEND_API}/api/v1/carts/${cartId}`, {
                'method': 'DELETE',
                'headers': {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            })

            const data = await response.json();
            if(!response.ok) {
                throw new Error(data.msg || "Failed to delete cart")
            }
            await getCarts()
            createCartAlert("Item removed", 'success')
            
        } catch (error) {
            console.error(error.message)
            createCartAlert(error.msg, 'danger')
        }
        finally {
            setLoading(false)
        }
    }

    
    
    useEffect(()=>{
        if(user === null){
            setCarts([])
            // setFetchCartsStatus('idle')
            setShow(false)
            return;
        }
        getCarts();
    }, [user])

    useEffect(()=>{
        console.log("pendingItem", pendingItem)
        if(user && pendingItem){
            addCart(pendingItem)
            setPendingItem(null)
        }
    }, [user, pendingItem])

    

    return (
        <CartContext.Provider 
            value={{ 
                carts, 
                getCarts,
                subtotal, 
                show, setShow, 
                addCart,
                deleteCart, 
                updateCart,
                loading,
                setPendingItem

        }}>
            {children}
        </CartContext.Provider> 
    )
}

export const useCart = () => useContext(CartContext)