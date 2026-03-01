import { useState, useEffect } from "react"
import { Container, Card, Row, Col, Button, Spinner, Alert } from "react-bootstrap"
import { useMenu } from "./context/MenuContext";
import { PlusCircleFill } from "react-bootstrap-icons"
import CustomizeItemModal  from './customizeItem/CustomizeItemModal'

function MenuItem() {
  const { menuitems } = useMenu();
  const [selectedItem, setSelectedItem] = useState(null)

  const handleClick = (menuitem) =>{
    
    setSelectedItem({
      menuitemId: menuitem._id,
      sizeId: "",
      ingredientDetails: menuitem.ingredientIds.map(
                            ingredientId=> ({ingredientId, qty: 1})),
      quantity: 1
    })
  }
  const handleClose = () =>{
    setSelectedItem(null)
  }
  return (
    <>
    <CustomizeItemModal handleClose={handleClose} item={selectedItem} />
    <Container className="mt-5">
      <h1>Menu Items</h1>
      <Row>
        {menuitems.map((menuitem) => (
          <Col md={6} key={menuitem._id} className="mb-3">
            <Card onClick={() => handleClick(menuitem)}>
              <Card.Body style={{'padding': 0, cursor: 'pointer'}}>
                <Row>
                  <Col md={8}>
                    <Card.Title className='text-start'>{menuitem.title}</Card.Title>
                    <Card.Text className='text-start'>{menuitem.description} </Card.Text>
                  </Col>
                  <Col md={4} className="text-end" style={{ 'paddingLeft': 0}}>
                    <div style={{ position: "relative", width: "100%"}}>
                      <Card.Img 
                        // src={item.imageUrl} 
                        src={`https://github.com/villysiu/pizza-react/blob/main/src/assets/${menuitem.imageUrl}?raw=true`}
                        alt={menuitem.title}
                        style={{ 
                          width: "100%", 
                          aspectRatio: "1/1",
                          objectFit: "cover"}}
                      />
         
                        <PlusCircleFill style={{
                          position: 'absolute',
                          bottom: '6px',
                          right: '6px',
                          cursor: 'pointer'
                          }} />
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </>
  )
}

export default MenuItem
