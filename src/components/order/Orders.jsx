import { useOrder } from '../context/OrderContext'
import { Container } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import Order from './Order'

import { Dash, Plus } from 'react-bootstrap-icons'

const Orders = () => {

    const { orders, getOrders, loading } = useOrder();

    console.log(orders)
    
    useEffect(()=>{
        console.log('jjj')
        if(orders.length === 0)
            getOrders();

    }, [])

    if(orders.length === 0){
        return(
            <div> No Previous Order. </div>
        )}
    return (
        <>
            <Container>
                { orders.map((order) => <Order order={order} />) }
            </Container>
        </>
        
    )
}
export default Orders