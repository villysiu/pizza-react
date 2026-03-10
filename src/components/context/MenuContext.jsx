import React, { createContext, useContext, useEffect, useState } from "react";
import {useAlert} from './AlertContext'
const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const BACKEND_API = import.meta.env.VITE_BACKEND_API;
    const [menuitems, setMenuitems] = useState([]);
    const [searchDetails, setSearchDetails] = useState({
                results: [],
                query: ''
            });
    const [sizes, setSizes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(false);


    const {showAlert} = useAlert();
    const fetchHelper = async (apiUrl) => {
        const response = await fetch(apiUrl)

        const data = await response.json();

        if(!response.ok){
            throw new Error(`Error ${response.status}: ${data.message}`)
        }
        return data;
    }
    const fetchMenuitemData = async () => {
        setLoading(true);
        try {
            const [menuitemData, ingredientData, sizeData] = await Promise.all([
                fetchHelper(`${BACKEND_API}/api/v1/menuitems`),
                fetchHelper(`${BACKEND_API}/api/v1/ingredients`),
                fetchHelper(`${BACKEND_API}/api/v1/sizes`),
            ]);

            setMenuitems(menuitemData.menuitems)
            setIngredients(ingredientData.ingredients);
            setSizes(sizeData.sizes)
           

        } catch (error) {
            console.error("Error fetching menu data:", error);
            showAlert(error.message)
        } finally {
            setLoading(false);
        }
    };

    const searchMenuitem = async (query) => {
       

        setLoading(true)

        try {
            const response = await fetch(`${BACKEND_API}/api/v1/menuitems/search?q=${query}`, {
                'method': "GET",
                'headers': {
                    'accept': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
            })
            const data = await response.json()
            if(!response.ok) {
                
                throw new Error(data.message || "Failed to search menuitem");
            }
            setSearchDetails({
                results: data.menuitems,
                query
            })

            
            console.log(data)
            
        
        } catch (error) {
            console.error(error);
            showAlert(error.message, 'danger')
        }
        finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        
        fetchMenuitemData();
    }, []);

    return (
        <MenuContext.Provider
            value={{
                menuitems,
                ingredients,
                sizes,
                loading,
                searchMenuitem,
                searchDetails,
                setSearchDetails
        }}

        >
            {children}
        </MenuContext.Provider>
    );

}
export const useMenu = () => useContext(MenuContext);
