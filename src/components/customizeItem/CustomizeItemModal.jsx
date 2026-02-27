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
    const { sizes } = useMenu();
    const {title, ingredientIds, _id: menuitemId} = item
    const [sizeId, setSizeId] =useState("")
    const [ingredientDetails, setIngredientDetails] = useState(ingredientIds.map(ingredientId=> ({ingredientId, qty: 1})));
    const [quantity, setQuantity] = useState(1)

    
    console.log(ingredientDetails)
    return(
            <Modal show={true} onHide={handleClose} size="lg" >
            
                <Modal.Header closeButton>
                    <Modal.Title>Customize {title} </Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <Container>
                        <CustomizeSize sizeId={sizeId} setSizeId={setSizeId} count={ingredientDetails.length} />
        
                        <div>
                        
                            <b>Toppings</b>
                            <Row className='mx-0'>
                            {
                                ingredientDetails.map(ingrDetail=>(
                                    <CustomizeToppings key={ingrDetail.ingredientId} 
                                                    ingrDetail={ingrDetail}
                                                    // ingredientDetails={ingredientDetails}
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
                    {/* { item.cartId ? 
                        <UpdateCartButton 
                            handleClose={handleClose} 
                            item = {{
                                cartId: item.cartId,
                                menuitem: item.menuitem,
                                temperature: temperature,
                                sizeId: sizeId,
                                milkId: milkId,
                                sugar: sugar,
                                quantity: quantity
                            }}
                        />
                        // :*/}
                        {}
                        <AddCartButton 
                            handleClose={handleClose} 
                            menuitemId = {menuitemId}
                            sizeId = {sizeId}
                            ingredientDetails = {ingredientDetails}
                            quantity = {quantity}
                    
                         />
                        {/* }  */}
                            
            
                </Modal.Footer> 
            </Modal>
        )
    }
export default CustomizeItemModal