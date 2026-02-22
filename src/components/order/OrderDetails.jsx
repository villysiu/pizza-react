import { useOrder } from '../context/OrderContext'
import { useMenu } from '../context/MenuContext'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const OrderDetails = ({detail}) => {

    const { menuitems, milks, sizes } = useMenu();

    const menuitem = menuitems.find(m=> m._id === detail.menuitemId)
    const milk = milks.find(m=> m._id === detail.milkId)
    const size = sizes.find(s=> s._id === detail.sizeId)
    return (
        <Row key={detail._id} className='border-bottom'>
            <Col xs={4} className='text-start'>{menuitem.title}</Col>
            <Col xs={4} className='text-start'>
                {size.title} 
                { milk.title !== 'NA' &&  <> | {milk.title}</>}
                { detail.sugar !== 'NA' &&  <> | {detail.sugar}</>}
                { detail.temperature !== 'NA' &&  <> | {detail.temperature}</>}
            </Col>
            <Col xs={2} className='text-end'>{detail.quantity}</Col>
            <Col xs={2} className='text-end'>${detail.unitPrice.toFixed(2)} </Col>
        </Row>
    )
}
export default OrderDetails