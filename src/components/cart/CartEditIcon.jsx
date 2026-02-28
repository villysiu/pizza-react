import { useState } from 'react'
import { PencilSquare } from 'react-bootstrap-icons'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import CustomizeItemModal  from '../customizeItem/CustomizeItemModal'

const CartEditIcon = ({cart}) =>{

    const [selectedItem, setSelectedItem,] = useState(null)
    console.log(cart)

    const handleClose = () =>{
        setSelectedItem(null)
    }

   
    return (
        <>
        <CustomizeItemModal handleClose={handleClose} item={selectedItem} />

        <Nav.Link as={Link} 
            className="edit-icon"
            onClick={()=>setSelectedItem(
                {
                    cartId: cart._id,
                    menuitemId: cart.menuitemId,
                    sizeId: cart.sizeId,
                    ingredientDetails: cart.ingredientDetails,
                    quantity: cart.quantity
                }
            )} >
            <PencilSquare />
        </Nav.Link>
        </>
    )
}
export default CartEditIcon