 import { Button, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import {useAuth} from '../context/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMenu } from '../context/MenuContext'

const UpdateCartButton = ({
    cartId,
    sizeId, 
    ingredientDetails,
    quantity, 
    handleClose
}) => {

    const { user } = useAuth();
    const { updateCart, loading } = useCart();
    const { sizes } = useMenu();

    const [subtotal, setSubtotal]= useState(0);

    const handleClick = () => {
        console.log("update item")
        const selectedItem = {
            sizeId,
            ingredientDetails,
            quantity
       }
       // handle no user login
       if(user === null){
            return;
       }
       updateCart({cartId: cartId, selectedItem} )
       handleClose();
    }
       useEffect(()=>{
        if(!sizeId) 
            setSubtotal(0);
        else{
            const size = sizes.find(s=>s._id === sizeId);
            const count = ingredientDetails.reduce((total, ingrDetail)=> total+ingrDetail.qty, 0) 
            setSubtotal(quantity * (size.price + count * size.perTopping));}
    }, [ingredientDetails, sizeId, quantity])


    return (
        <Button
            style={{ minWidth: "2rem" }}
            disabled={loading}
            onClick={handleClick}
            className="ms-auto d-flex align-items-center justify-content-center"
        >
    
            Update cart ${subtotal.toFixed(2)}

        </Button>
    )
}
export default UpdateCartButton