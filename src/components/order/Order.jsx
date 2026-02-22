import { useOrder } from '../context/OrderContext'
import { Row, Col } from 'react-bootstrap'
import OrderDetails from './OrderDetails'

import { Dash, Plus } from 'react-bootstrap-icons'


const Order = ({order}) => {

    const { getOrderDetails, loading, show,  setShow } = useOrder();
    const date = new Date(order.createdAt)
    const formattedDate = date.toLocaleDateString('en-US')

    console.log(order)
    const handleClick = (orderId) => {
        if(orderId === show) return;

        if(order.orderDetails){
            console.log(order.orderDetails)
            // setOrderDetails(order.orderDetails )
            setShow(orderId)
        }
        else{
            getOrderDetails(orderId)
        }
    }
    return(
    
        <>
            <Row key={order._id} className='order-row py-3' onClick={()=>handleClick(order._id)}> 
                <Col className='text-start'>
                    Order Date: {formattedDate}
                </Col>
                <Col  className='text-end'>
                    Total:  ${order.total.toFixed(2)}
                </Col>
                <Col xs={1} className='text-end'>
                    { show === order._id ? 
                        <div onClick={()=>setShow(null)}><Dash size={20}/> </div>
                        : 
                        <Plus size={20}/>}
                </Col>
            </Row>
            { 
                show === order._id && 
                    <>
                    <Row key={`details-${order._id}`} className='border-bottom py-2'>
                        <Col xs={4} className='text-start'>Beverage</Col>
                        <Col xs={4} className='text-start'>Options</Col>
                        <Col xs={2} className='text-end'>Quantity</Col>
                        <Col xs={2} className='text-end'>Unit Price</Col>
                    </Row>
                    { order.orderDetails.map(detail => <OrderDetails detail={detail} />)  }
                </> 
            }

        </>
        )
}
export default Order