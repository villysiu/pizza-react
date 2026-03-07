import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { MenuProvider } from './components/context/MenuContext'
import { AuthProvider } from './components/context/AuthContext'
import { AlertProvider } from './components/context/AlertContext'
import { CartProvider } from './components/context/CartContext'
import { OrderProvider } from './components/context/OrderContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <HashRouter>
    <AlertProvider>
      <AuthProvider>
        <CartProvider>
          <MenuProvider>
            <OrderProvider>
              <App />
            </OrderProvider>
          </MenuProvider>
        </CartProvider>
      </AuthProvider>
    </AlertProvider>
  </HashRouter>
)
