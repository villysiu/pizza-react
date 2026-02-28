import { Cart } from 'react-bootstrap-icons'
import { Nav, Offcanvas, Spinner } from "react-bootstrap"
import { Link } from "react-router-dom"
import {useState} from 'react'
import CartOffcanvas from './CartOffcanvas'
import { useCart } from '../context/CartContext'

const CartIcon = () => {
    
    const { show, setShow, loading } = useCart();

    if(!show && loading){
        return (
            <Nav.Link>
                <Spinner animation="border"
                            variant="danger"
                            style={{ width: "20px", height: "20px" }}
                />
            </Nav.Link >
        )
    }

    return (
        <>
       
        <Nav.Link onClick={()=>setShow(true)} style={{cursor: 'pointer'}}>
            <Cart size={20} className="me-2 cart-icon" />
        </Nav.Link>

        <CartOffcanvas />
        
    

        </>
    )
}
export default CartIcon