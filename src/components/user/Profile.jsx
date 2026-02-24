import { useState } from 'react';
import { useAuth } from '../context/AuthContext'
import { Container, Row, Col } from 'react-bootstrap'
import EditName from './EditName'
const Profile = () => {
    const { user } = useAuth();

    console.log(user)
    


    
    

    return ( 
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={9}>
                    <h4>Account Details</h4>
    
                    <Row>    
                        <Col xs={12} className='text-start p-3' style={ {borderBottom: '1px solid grey'} }>
                            <b>Email Address </b> 
                            <div>{user && user.email}</div>
                        </Col>
                    </Row>

                    <EditName />
                    
                    <Row>
                        {/* <Col xs={12} className='text-start'> */}
                        Change password 
                        {/* </Col> */}
                        
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
export default Profile