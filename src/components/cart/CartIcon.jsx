import { CartFill } from 'react-bootstrap-icons'
import { Nav, Offcanvas, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import {useState} from 'react'
import CartOffcanvas from './CartOffcanvas'
import { useCart } from '../context/CartContext'

const CartIcon = () => {
    
    const { show, setShow, loading, carts } = useCart();

    const count = carts.reduce((total, cart) => total + cart.quantity, 0 )
    if(!show && loading){
        return (
            <Nav.Link>
                <Spinner animation="border"
                            variant="secondary"
                            style={{ width: "20px", height: "20px" }}
                />
            </Nav.Link >
        )
    }

    return (
        <div style={{ position: 'relative'}}>
       
            <Nav.Link onClick={()=>setShow(true)} style={{cursor: 'pointer'}}>
                <CartFill size={22} className="me-2 cart-icon" />
            </Nav.Link>

            <CartOffcanvas />
            {count > 0 && 
                <div style={{ 
                    position: 'absolute', 
                    right: '-4px', 
                    top: 0,
                    border: 'solid 1px',
                    width: '1.5rem', height: '1.5rem',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '0.8rem',
                }}>{count}</div>}
    

        </div>
    )
}
export default CartIcon