import { useState } from 'react'

import CustomizeSize from './CustomizeSize'
import CustomizeToppings from './CustomizeToppings'
import Quantity from './Quantity'
import AddCartButton from './AddCartButton'
import UpdateCartButton from './UpdateCartButton'
import {Modal, Container, Row} from 'react-bootstrap'

import {useMenu} from '../context/MenuContext'

const CustomizeItemModal = ({handleClose, item}) => {
    if (!item) return null;

    console.log(item)
//    {
//      cartId: "69a20e94423d066823907213"
//       menuitemId: "76767567596"
//       sizeId: "",
//       ingredientDetails: menuitem.ingredientIds.map(
//                             ingredientId=> ({ingredientId, qty: 1})),
//       quantity: 1
//     }
    const { sizes, menuitems } = useMenu();
    const [sizeId, setSizeId] =useState(item.sizeId)
    const [ingredientDetails, setIngredientDetails] = useState(item.ingredientDetails);
    const [quantity, setQuantity] = useState(item.quantity)

    const menuitem = menuitems.find(m=>m._id === item.menuitemId)

    return(
            <Modal show={true} onHide={handleClose} size="lg" >
            
                <Modal.Header closeButton>
                    <Modal.Title>Customize {menuitem.title} </Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <Container>
                        <CustomizeSize sizeId={sizeId} setSizeId={setSizeId} ingredientDetails={ingredientDetails} />
        
                        <div>
                        
                            <b>Toppings</b>
                            <Row className='mx-0'>
                            {
                                ingredientDetails.map(ingrDetail=>(
                                    <CustomizeToppings key={ingrDetail.ingredientId} 
                                                    ingrDetail={ingrDetail}
                                                    setIngredientDetails={setIngredientDetails} />
                                ))
                            }
                            </Row>
                        </div>              
                    </Container>
                    
                    {/* <CustomizeIngredients /> */}
                    
                </Modal.Body>

                <Modal.Footer>
                    <Quantity quantity={quantity} setQuantity={setQuantity} />
                        {
                            item.cartId ? 
                            <UpdateCartButton
                                handleClose={handleClose} 
                                cartId = {item.cartId}
                                sizeId = {sizeId}
                                ingredientDetails = {ingredientDetails} 
                                quantity = {quantity}
                            />
                            :
                            <AddCartButton 
                                handleClose={handleClose} 
                                menuitemId = {item.menuitemId}
                                sizeId = {sizeId}
                                ingredientDetails = {ingredientDetails} 
                                quantity = {quantity}
                        
                                />
                    
                        }    
            
                </Modal.Footer> 
            </Modal>
        )
    }
export default CustomizeItemModal