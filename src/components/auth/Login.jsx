import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";


const Login = () => {
    const { login, show, setShow } = useAuth();

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")



    const handleSubmit = async(e) =>{
        e.preventDefault();
        const success = await login({'email': email, 'password': password})
        // console.log(success)
        if(success ){
            setEmail('');
            setPassword('')
        }
    }

    return(
        <Form style={{ width: '100%'}}>
            <Modal.Header closeButton>
                <Modal.Title>Sign in to your account</Modal.Title>
            </Modal.Header>

            <Modal.Body >
                <Form.Label><b>Email</b></Form.Label>
                <EmailInput email={email} setEmail={setEmail} emailError={emailError} setEmailError={setEmailError} />
                <div className='my-3'></div>
                <Form.Label><b>Password</b></Form.Label>
                <PasswordInput password={password} setPassword={setPassword} passwordError={passwordError} setPasswordError={setPasswordError} />
   
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
                <Link onClick={()=>setShow('signup')} >
                    Create an account
                </Link>
                <Button type="submit" onClick={handleSubmit}  disabled={ emailError!=="" || passwordError!=="" || email==="" || password==="" }>
                    Sign In
                </Button>
            
            </Modal.Footer>

        </Form>


    )
}
export default Login


