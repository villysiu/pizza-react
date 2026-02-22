import { useOrder } from '../context/OrderContext'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Order from './Order'

import { Dash, Plus } from 'react-bootstrap-icons'

const Orders = () => {

    const { orders, getOrders, loading } = useOrder();

    console.log(orders)
    
    useEffect(()=>{
        if(orders.length === 0)
            getOrders();

    }, [])


    if(!loading && orders.length === 0){
        return(
            <div> No Previous Order. </div>
        )}
    return (
        <>
            <Container>
                <Row key='all-order' className='text-start py-4'>
                    <Col xs={12} ><h3>Your Orders</h3></Col>
                </Row>
                { orders.map((order) => <Order key={order.id} order={order} />) }
            </Container>
        </>
        
    )
}
export default Orders