import { Navbar, Nav, Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import UserIcon from '../user/UserIcon'
import CartIcon from '../cart/CartIcon'
import { useAuth } from '../context/AuthContext'
import { useMenu } from '../context/MenuContext'
import SearchInput from './SearchInput'

const NavigationBar = () => {
  const { user, loading } = useAuth();

  const { setSearchDetails } = useMenu();

  const clearSearch = () => setSearchDetails({
                              results: [],
                              query: ""
                          })
  return (
    <Navbar bg="light" variant="light">
      <Container>
       
        <Navbar.Brand as={Link} 
                      to="/"
                      onClick={clearSearch}
        >
          Pizza
        </Navbar.Brand>

        <Nav className="me-auto">
          {/* <Nav.Link as={Link} to="/">Home</Nav.Link> */}
          <Nav.Link as={Link} 
                    to="/menu"
                    onClick={clearSearch}
          >
            Menu
          </Nav.Link>
        
        </Nav>
        <div className="mx-auto" style={{ width: "300px" }} >
          <SearchInput />
        </div>

        <Nav className="ms-auto">
          <div onClick={clearSearch}>
            <UserIcon />
          </div>
          
          { 
            user && 
            <div onClick={clearSearch}>
              <CartIcon />
            </div>
          }

          
          
        </Nav>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
