import { useState } from 'react';
import {Button, Row, Col, Form} from 'react-bootstrap';
import {useAuth} from '../context/AuthContext';
import NameInput from '../auth/NameInput'
import PasswordInput from '../auth/PasswordInput'
const EditPassword = () =>{

    const { user, updateCredential } = useAuth();

    const [edit, showEdit] = useState(false);
    const [currPassword, setCurrPassword]= useState('');
    const [currPasswordError, setCurrPasswordError] = useState('')
    const [newPassword, setNewPassword]= useState('');
    const [newPasswordError, setNewPasswordError] = useState('')
    
    console.log(newPassword==="", newPasswordError!=="",
                                currPassword==="",  currPasswordError!=="")
    const handleClick = () => {
        showEdit(true)
    };

    const handleSave = (e) =>{
        e.preventDefault();
        console.log(currPassword, newPassword)
        updateCredential({'newPassword': newPassword, 'currPassword': currPassword});
        showEdit(false);
    }

    if(!edit) {
        return(
            <Row className="d-flex align-items-center py-3 border-bottom border-1">
                <Col xs={9} className='text-start'>
                    <div><b>Password</b></div>
                    <div>*******</div>
                </Col>
                <Col xs={3} className='text-end'>
                    <Button onClick={handleClick}>Edit</Button>
                </Col>
            </Row>
        )
         
    }
    return (
        <Form className="p-3 mb-3 text-start border-bottom border-1" >
            
            <Col xs={12} md={6}>
                <Form.Label ><b>Current Password</b></Form.Label>
                <PasswordInput  password={currPassword} 
                                setPassword={setCurrPassword} 
                                passwordError={currPasswordError} 
                                setPasswordError={setCurrPasswordError} 
                />

                <div className='my-3'></div>

                <Form.Label ><b>New Password</b></Form.Label>
                <PasswordInput  password={newPassword} 
                                setPassword={setNewPassword} 
                                passwordError={newPasswordError} 
                                setPasswordError={setNewPasswordError} 
                />

            
            <Button onClick={handleSave}
                    type="submit" 
                    disabled={ newPassword==="" || newPasswordError!=="" ||
                                currPassword==="" || currPasswordError!==""
                    }
            >
                Save
            </Button>
            <Button className='ms-3' onClick={()=>showEdit(false)}>Cancel</Button>
            </Col>
         </Form>
    )
    
}
export default EditPassword;