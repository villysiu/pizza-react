import { PersonCircle } from 'react-bootstrap-icons'
import { Nav, NavDropdown, Navbar, Spinner } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom"
import {useAuth} from '../context/AuthContext'
import AuthModal from '../auth/AuthModal'

const UserIcon = () => {
    const navigate = useNavigate();
    const { user, logout, loading, setShow, show } = useAuth();

    const handleLogout = (e) => {
        e.preventDefault();
        logout();
      
    };
    const handleClick = () => {
        console.log("clicked", show)
        setShow('login');
    }

    if(!user){
        return (
            <>
            <AuthModal />
            <Nav.Link onClick={handleClick}>
                <PersonCircle size={20} className="me-2" />
            </Nav.Link>
            </>
        )
    }
    return (
        <Nav className="ms-auto">
            <NavDropdown 
                as="div"
                title={<PersonCircle size={20} />}
                id="user-dropdown"
                align='end'
                
            >
                <NavDropdown.Item as={Link} to="/orders">
                    Orders
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/profile">
                    Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as="button" style={{cursor: 'pointer'}} onClick={handleLogout}>
                    Logout
                </NavDropdown.Item>
            </NavDropdown>
        </Nav>
    )
    
}
export default UserIcon