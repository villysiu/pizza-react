import { useState, useDispatch } from 'react'

import CustomizeSize from './CustomizeSize'
import CustomizeTemperature from './CustomizeTemperature'
import CustomizeMilk from './CustomizeMilk'
import CustomizeSugar from './CustomizeSugar'
import Quantity from './Quantity'
import AddCartButton from './AddCartButton'
import UpdateCartButton from './UpdateCartButton'
import {Modal, Button} from 'react-bootstrap'


const CustomizeItemModal = ({handleClose, item}) => {

    if (!item) return null;
    console.log(item)
// add
//  {
//         menuitem: {
            // _id: menuitem.id,
            // title: menuitem.title,
            // price: mnenuite,.price
            // },
//         sugar: menuitem.sugar,
//         temperature: menuitem.temperature,
//         sizeId: menuitem.sizeId,
//         milkId: menuitem.milkId
        
//       }
// update

    

    const [temperature, setTemperature] = useState(item.temperature ) 
    const [sizeId, setSizeId] =useState(item.sizeId)
    const [milkId, setMilkId] = useState(item.milkId)
    const [sugar, setSugar] = useState(item.sugar)
    const [quantity, setQuantity] = useState(item.quantity || 1)

    
    return(
       
            <Modal show={true} onHide={handleClose} size="lg"  >
            
                <Modal.Header closeButton>
                    <Modal.Title>Customize {item.menuitem.title} </Modal.Title>
                </Modal.Header>

                <Modal.Body >
                    <CustomizeTemperature temperature={temperature} setTemperature={setTemperature} />
                    <CustomizeSize sizeId={sizeId} setSizeId={setSizeId} />
                    <CustomizeMilk milkId={milkId} setMilkId={setMilkId} />
                    <CustomizeSugar sugar={sugar} setSugar={setSugar} />
                </Modal.Body>

                <Modal.Footer>
                    <Quantity quantity={quantity} setQuantity={setQuantity} />
                    { item.cartId ? 
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
                        :
                        <AddCartButton 
                            handleClose={handleClose} 
                            item = {{
                                menuitem: item.menuitem,
                                temperature: temperature,
                                sizeId: sizeId,
                                milkId: milkId,
                                sugar: sugar,
                                quantity: quantity
                            }} />
                        }
                            
            
                </Modal.Footer> 
            </Modal>
        )
    }
export default CustomizeItemModal