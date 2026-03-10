import { useState, useEffect } from 'react';
import { Form, Row, Col, Button, InputGroup } from 'react-bootstrap'
import { Search } from 'react-bootstrap-icons'
import { useMenu } from '../context/MenuContext'
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
    const [word, setWord] = useState('')
    const { searchMenuitem, searchDetails } = useMenu();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setWord(e.target.value)
    }
    const handleClick = (e) => {
        e.preventDefault();
        if (!word.trim()) return;

        searchMenuitem(word);
        navigate("/menu");
        
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            console.log("enter press")
            handleClick(e);
        }
    };  
    useEffect(() => {
        setWord(searchDetails.query);
    }, [searchDetails.query]);

    return(

        <Form className="d-flex">
            <InputGroup>
                <Form.Control type="text" className=" mr-sm-2"
                            placeholder="Search menuitem..." 
                            value={word}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown} 
       
                />
                {/* <InputGroup.Text  onClick={handleClick}><Search szie={20} /></InputGroup.Text> */}
                <Button variant="outline-secondary" onClick={handleClick}>
            <Search size={20} />
            </Button>
            </InputGroup>
        </Form>
            
        
    )
}
export default SearchInput