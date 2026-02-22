import { useCart } from '../context/CartContext'
import { useState } from 'react'
import { Form } from 'react-bootstrap'

const EditQuantityInput = ({cart}) => {

    const { updateCart } = useCart();
    const [quantity, setQuantity] = useState(cart.quantity);
    const [ error, setError]= useState("")

    const handleUpdate = () => {

       
        
    }
    return (
        <>
        <Form.Control type="text" 
                    placeholder="8" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value) || 0)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setError('')}
                />
        {error && <div className='text-danger'>{error} </div>}
        </>
    )
}
export default EditQuantityInput