import { useOrder } from '../context/OrderContext'
import { useMenu } from '../context/MenuContext'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const OrderDetails = ({detail}) => {

    const { menuitems, sizes, ingredients } = useMenu();

    const menuitem = menuitems.find(m=> m._id === detail.menuitemId)
    const size = sizes.find(s=> s._id === detail.sizeId)
    const {ingredientDetails} = detail
    return (
        <Row className='border-bottom'>
            <Col xs={4} className='text-start'>{menuitem.title}</Col>
            <Col xs={4} className='text-start'>{size.title} 
            {
                ingredientDetails.map((ingredientDetail) => {
                    const {ingredientId, qty} = ingredientDetail
                    const ingredient = ingredients.find((ingr)=>ingr._id === ingredientId)
                    return  <div key={ingredientDetail._id} className="small">{(qty===0 && "No ") || (qty===2 && "Extra ")}{ingredient.title}</div>
                })
            }
            </Col>
            <Col xs={2} className='text-end'>{detail.quantity}</Col>
            <Col xs={2} className='text-end'>${detail.unitPrice.toFixed(2)} </Col>
        </Row>
    )
}
export default OrderDetails