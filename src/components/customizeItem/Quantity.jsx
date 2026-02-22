import {PlusCircleFill, DashCircleFill} from 'react-bootstrap-icons'
import { Form, Button} from 'react-bootstrap'

const Quantity =({quantity, setQuantity})=>{
    const handleClick = (sign) =>{
        if(sign==='-')
            setQuantity(q=>q-1)
        else
            setQuantity(q=>q+1)
    }
    return(
        <div>
            <div>Quantity</div>
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center'
            }}>
            
                <Button variant="link"
                        className="p-0 border-0" 
                        onClick={()=>handleClick('-')}  
                        disabled={quantity===1}> 
                    <DashCircleFill size={20}/> 
                </Button> 
                <Form.Control
                    type="text"
                    value={quantity}
                    readOnly
                    className="text-center mx-1"
                    style={{
    width: "3rem",
    // border: "1px solid #000",
    // borderRadius: "4px",
    // backgroundColor: "#fff"
  }}
                    />
                <Button variant="link"
                        className="p-0 border-0" 
                        onClick={()=>handleClick('+')}  
                        disabled={quantity===6}> 
                    <PlusCircleFill size={20}/> 
                </Button>
                
            </div>
        </div>
    )
}
export default Quantity