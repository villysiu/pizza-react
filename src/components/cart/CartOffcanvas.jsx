import { useState, useEffect } from 'react'
import CartItem from './CartItem'
import { Offcanvas, Button, Spinner } from 'react-bootstrap'
import { useCart } from '../context/CartContext'
import CheckoutButton from './CheckoutButton'
import { Cart } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'; 

const CartOffcanvas = () => {
    

    const { carts, subtotal, show, setShow, loading } = useCart();

    console.log( carts)
    const count = carts.reduce((total, c )=>total+ c.quantity, 0)
    return (
        <Offcanvas  show={show} onHide={() => setShow(false)} 
                    placement="end"
                    style={{
                        top: '3rem', 
                        bottom: '3rem', 
                        right: '1rem', 
                        height: 'auto', 
                        borderRadius: '12px',
                        boxShadow:'0 10px 30px rgba(0,0,0,0.3)',
                    }} 
        >


            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart ({count} items)</Offcanvas.Title>
            </Offcanvas.Header>

            { carts.length > 0 ? 
            <>
                <Offcanvas.Body>
                {  carts.map(cart => <CartItem key={cart._id} cart={cart} />) }
                </Offcanvas.Body>
                
                <div className="border-top p-3">
                    Subtotal: ${subtotal.toFixed(2)}
                    <CheckoutButton />
                </div>
            </> 
            :
                <Offcanvas.Body className="d-flex justify-content-center align-items-center">
                    <Link to="/menu" onClick={()=>setShow(false)}>Start Shopping  <Cart size={22}/></Link>
                </Offcanvas.Body>
            
            }
        </Offcanvas>
    )
}
export default CartOffcanvas