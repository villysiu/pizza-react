 import { Button, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useMenu } from '../context/MenuContext'

const AddCartButton = ({ 
    menuitemId,
    sizeId, 
    ingredientDetails,
    quantity, 
    handleClose
}) => {
   console.log(ingredientDetails, sizeId)
    const { user, setShow } = useAuth();
    const { addCart, loading, setPendingItem } = useCart();
    const { sizes, ingredients } = useMenu();
    const [price, setPrice] = useState(0);

    const handleClick = () => {
        console.log("adding item")
        const selectedItem = {
            menuitemId,
            sizeId,
            ingredientDetails: ingredientDetails,
            quantity
       }
       
       // handle no user login
       if(user === null){
            setPendingItem(selectedItem)
            
            setShow('login')
            handleClose();
            return;
       }
       addCart(selectedItem);
       handleClose();


    }
    useEffect(()=>{
        if(!sizeId) 
            setPrice(0);
        else{
            const size = sizes.find(s=>s._id === sizeId);
            const count = ingredientDetails.reduce((total, ingrDetail)=> total+ingrDetail.qty, 0) 
            setPrice(quantity * (size.price + count * size.perTopping));}
    }, [ingredientDetails, sizeId, quantity])



    return (
        <Button
            style={{ minWidth: "2rem" }}
            disabled={loading || !sizeId}
            onClick={handleClick}
            className="ms-auto d-flex align-items-center justify-content-center"
        >

            <>Add to Cart ${price.toFixed(2)}</>

        </Button>
    )
}
export default AddCartButton