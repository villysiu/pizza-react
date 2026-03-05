import { useState, useEffect } from 'react'
import { Row, Col, Image, Spinner, Form } from 'react-bootstrap'
import CartEditIcon from './CartEditIcon'
import CartDeleteIcon from './CartDeleteIcon'
import EditQuantityInput from './EditQuantityInput'
import { useMenu } from '../context/MenuContext'

const CartItem = ({ cart }) => {
           // {
        //    _id: 584837
    //     createdBy: 699fadf60405b0677accc775,
    //     menuitemId: '69a06e258ff4d60635ebe77f',
    //     sizeId: '699fb3f706698c69cddd8dae',
    //     ingredientDetails: [
    //         { ingredientId: '699fb6b05e5b866b91ad778f', qty: 2 },
    //         { ingredientId: '699fb25906698c69cddd8da4', qty: 2 }
    //     ],
    //     quantity: 1,
    //     unitPrice: 46
    // }

    const {menuitems, sizes, ingredients } = useMenu();
    const menuitem = menuitems.find(m=>m._id === cart.menuitemId);
    const size = sizes.find(s=>s._id === cart.sizeId);
    const { ingredientDetails, quantity, unitPrice } = cart;

    const IngredientHelper =( {ingredientDetail}) => {
        const {ingredientId, qty} = ingredientDetail

        const ingredient = ingredients.find(ingr => ingr._id === ingredientId)

        return(
            <div>
            {qty===2 && "Extra " || qty===0 && "No "} {ingredient.title}
            </div>
        )
    }

    return (
        <Row key={cart._id} className='px-2 py-3' style={{ borderBottom: '1px solid black' }}>
            <Col xs={2} className='p-0'>
                <Image 
                    // src={menuitem.imageUrl} 
                    src='https://github.com/villysiu/nodeJs-tea-frontend/blob/main/public/Chamomile-Tea.webp?raw=true'
                    alt={menuitem.title}
                    style={{ 
                    width: "100%", 
                    aspectRatio: "1/1",
                    objectFit: "cover",
                    
                }}
                />
            </Col>

            <Col>
                <b>{menuitem.title}</b>
                <div style={{fontSize: '12px'}}>
                    {size.title} 
                    { ingredientDetails.map( ingredientDetail => {
                        return <IngredientHelper key={ingredientDetail.ingredientId} ingredientDetail={ingredientDetail} />
                    } )}
                </div>
                
            </Col>
            <Col xs={3} className="d-flex flex-column align-items-end px-0">
                <div className="d-flex  text-nowrap">@ ${unitPrice.toFixed(2)}</div>
                <div>qty: {quantity}</div>
                <div className="d-flex gap-2">
                    <CartEditIcon cart={cart} />
                    <CartDeleteIcon cartId={cart._id} />
                </div>
                
            </Col>
        </Row>
    )
}

export default CartItem