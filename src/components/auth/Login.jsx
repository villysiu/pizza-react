import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useAlert } from "../context/AlertContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Button, Spinner, Modal } from "react-bootstrap";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";


const Login = () => {

    const { login, show, setShow } = useAuth();


    console.log(show)
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")



    const handleSubmit = async(e) =>{
        e.preventDefault();
        const success = await login({'email': email, 'password': password})
        console.log(success)
        if(success ){
            setEmail('');
            setPassword('')
            
       
        }
        
    }


    return(
        <>
            <Modal.Header closeButton>
                <Modal.Title>Sign in to your account</Modal.Title>
            </Modal.Header>

            <Modal.Body >
                <Form style={{ width: '100%'}}>

                    <EmailInput email={email} setEmail={setEmail} emailError={emailError} setEmailError={setEmailError} />
                    <PasswordInput password={password} setPassword={setPassword} passwordError={passwordError} setPasswordError={setPasswordError} />
                    

                </Form>
                {/* <div>Forgot your password?</div> */}
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
                
                <Link onClick={()=>setShow('signup')} >
                    Create an account

                </Link>
                <Button type="submit" onClick={handleSubmit}  disabled={ emailError!=="" || passwordError!=="" || email==="" || password==="" }>
                        Sign In
                    </Button>
            
            </Modal.Footer>

        </>


    )
}
export default Login


