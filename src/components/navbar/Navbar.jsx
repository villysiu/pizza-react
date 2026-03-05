import { Navbar, Nav, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import UserIcon from '../user/UserIcon'
import CartIcon from '../cart/CartIcon'
import {useAuth} from '../context/AuthContext'

const NavigationBar = () => {
  const { user, loading } = useAuth();
  return (
    <Navbar bg="light" variant="light">
      <Container>
       
        <Navbar.Brand as={Link} to="/">Pizza</Navbar.Brand>
        <Nav className="me-auto">
          {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
          <Nav.Link as={Link} to="/menu">Menu</Nav.Link>
        
        </Nav>
       
        <Nav>
          <UserIcon />
          { user && <CartIcon />}
          
          
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
