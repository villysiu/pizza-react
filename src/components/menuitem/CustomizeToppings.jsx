import { useMenu } from '../context/MenuContext';
import { useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
const CustomizeToppings = ({ingrDetail,  setIngredientDetails}) => {
    
    const { ingredients } = useMenu();
    const {ingredientId, qty} = ingrDetail;
    const ingredient = ingredients.find(ingr => ingr._id === ingredientId )



    const handleExtra = () => {
        // setFrontText('Extra');

        setIngredientDetails(details =>
            details.map(detail =>
                detail.ingredientId === ingredientId ? { ...detail, qty: detail.qty+1 } : detail
            )
        )
    }
    const handleNone = () => {
        // setFrontText('No');
        setIngredientDetails(details =>
            details.map(detail =>
                detail.ingredientId === ingredientId ? { ...detail, qty: detail.qty-1 } : detail
            )
        )
    }
    
    return (
        
            <Col xs={10} md={5}
                className="border px-0 me-2 d-flex align-items-center justify-content-between" > 
                <Button className='' disabled={qty===0}  onClick={handleNone}> - </Button>
                {qty === 2 && "Extra " || qty === 0 && "No "}{ingredient.title} 
                <Button className='' disabled={qty===2} onClick={handleExtra}> + </Button>
            </Col>
            
    )
}
export default CustomizeToppings