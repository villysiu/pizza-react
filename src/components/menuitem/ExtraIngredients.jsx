import { Container, Row, Col } from 'react-bootstrap'

const ExtraIngredients = ({extraIngredients}) => {


    
    return (
        <Container>
            <Row>
        <Col> <b>Vegetables: </b></Col>
        
        {

            extraIngredients.filter(ingr=>ingr.category === 'VEGETABLES')
                            .map(ingr=><Col key={ingr._id} xs={12} md={6}>{ingr.title}</Col>)
   
        }
        </Row>
        <Row>
        <b>Meats: </b>
        {
            extraIngredients.filter(ingr=>ingr.category === 'MEATS')
                            .map(ingr=><Col key={ingr._id} xs={12} md={6}>{ingr.title}</Col>)
   
        }
        {/* <b>Others: </b>
        {
            extraIngredients.filter(ingr=>ingr.category === 'OTHERS')
                            .map(ingr=><div key={ingr._id}>{ingr.title}</div>)
   
        }*/}
        </Row>
        </Container> 
    )
}
export default ExtraIngredients