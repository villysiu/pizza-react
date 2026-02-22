import { useAuth } from "../context/AuthContext";
import { Modal } from 'react-bootstrap';
import Login from './Login'
import Signup from './Signup'
const AuthModal = () => {
    const { show, setShow } = useAuth();
    return(
        <Modal show={show!==''} onHide={()=>setShow('')} size="md"  >
             {show==='login' ? <Login /> : <Signup />}

        </Modal>
    )
}
export default AuthModal