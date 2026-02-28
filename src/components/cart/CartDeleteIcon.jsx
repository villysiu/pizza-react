import { Trash } from 'react-bootstrap-icons'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartDeleteIcon = ({cartId}) =>{

    const { deleteCart } = useCart();
    return (
        <Nav.Link as={Link} className='delete-icon' onClick={()=>deleteCart(cartId)}>
            <Trash />
        </Nav.Link>
    )
}
export default CartDeleteIcon