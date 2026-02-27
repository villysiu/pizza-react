 import { Button, Spinner } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useMenu } from '../context/MenuContext'

const AddCartButton = ({ 
    menuitemId,
    sizeId, 
    toppings,
    quantity, 
    handleClose
}) => {
   console.log(toppings, sizeId)
    const { user, setShow } = useAuth();
    const { addCart, loading, setPendingItem } = useCart();
    const { sizes, ingredients } = useMenu();
    const [price, setPrice] = useState(0);

    const handleClick = () => {
        console.log("adding item")
    //     const selectedItem = {
    //         menuitemId: item.menuitem._id,
           
    //         sizeId: item.sizeId,
           
    //         quantity: item.quantity,
    //    }
       
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
            const count = toppings.reduce((total, topping)=> total+topping.qty, 0) 
            setPrice(quantity * (size.price + count * size.perTopping));}
    }, [toppings, sizeId])



    return (
        <Button
            style={{ minWidth: "2rem" }}
            disabled={loading || !sizeId}
            onClick={handleClick}
            className="ms-auto d-flex align-items-center justify-content-center"
        >
        {loading ? (
            <Spinner animation="border" size="sm" />
        ) : (
            <>Add to Cart ${price.toFixed(2)}</>
        )}
        </Button>
    )
}
export default AddCartButton