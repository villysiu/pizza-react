import { useMenu } from "../context/MenuContext";
import { Form } from 'react-bootstrap'

const CustomizeSize = ({sizeId, setSizeId, count}) => {
    const { sizes } = useMenu();
    console.log(sizes)

    return (
        <div>
            <b>Size</b>
            <div>Required - Choose 1. </div>
            
            {
                sizes.map(sz=>{
                    const priceText = sz.price + sz.perTopping * count
                    const labelText = `${sz.title} $${priceText.toFixed(2)}`
                    return(
                        
                        <Form.Check 
                            key={sz._id}
                            className='customize_item_choice'
                            onChange={()=>setSizeId(sz._id)}
                            inline
                            type="radio"
                            defaultChecked = {sizeId!==null && sz._id===sizeId}
                            name="size"
                            label={labelText}
                            id={`size-radio-${sz._id}`}
                        />
                        
                    )
                })
            }

            
        </div>
    )
}
export default CustomizeSize