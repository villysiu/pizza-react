import { useMenu } from '../context/MenuContext';
import { useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
const CustomizeToppings = ({ingredientId, toppings, setToppings}) => {
    
    const { ingredients } = useMenu();
    const ingredient = ingredients.find(ingr => ingr._id === ingredientId )
     console.log(ingredient)

    const currentTopping = toppings.find(t=> t.ingredientId === ingredientId)
    const qty = currentTopping.qty


    const handleExtra = () => {
        // setFrontText('Extra');

        setToppings(prevToppings =>
            prevToppings.map(topping =>
                topping.ingredientId === ingredientId ? { ...topping, qty: topping.qty+1 } : topping
            )
        )
    }
    const handleNone = () => {
        // setFrontText('No');
        setToppings(prevToppings =>
            prevToppings.map(topping =>
                topping.ingredientId === ingredientId ? { ...topping, qty: topping.qty-1 } : topping
            )
        )
    }
    // useEffect(()=>{
    //     setToppingCount(ingredientData.length)
    // }, [ingredientData])
    
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