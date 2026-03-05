import React from 'react'

import { Routes, Route } from "react-router-dom"

import Home from "./components/Home"
import Menuitem from "./components/menuitem/Menuitem"
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Profile from './components/user/Profile'
import Orders from "./components/order/Orders"
import NavigationBar from "./components/navbar/Navbar"
import AlertBar from "./components/navbar/AlertBar"
import ProtectedRoute from "./components/routes/ProtectedRoute"

import { useAuth } from './components/context/AuthContext'
import { useCart } from './components/context/CartContext'
import { useOrder } from './components/context/OrderContext'
import FullScreenSpinner from './components/FullScreenSpinner'

function App(){
  const { loading: cartLoading } = useCart();
  const {loading: orderLoading } = useOrder();
  const {loading: authLoading } = useAuth();

  return (
    <>
      {(
        orderLoading || 
        cartLoading || 
        authLoading) && <FullScreenSpinner /> }
      <NavigationBar />
      <AlertBar />
      <Routes>
        <Route path="/" element={<Menuitem />} />
        <Route path="/menu" element={<Menuitem />} />
       
        <Route
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>

          }
        />
        <Route
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>

          }
        />

      </Routes>
    </>
  )
}

export default App
