import React, { createContext, useContext, useEffect, useState } from "react";
import {useAlert} from './AlertContext'
const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const backendApi = 'http://localhost:3000'
    const [menuitems, setMenuitems] = useState([])
    const [sizes, setSizes] = useState([])
    const [ingredients, setIngredients] = useState([])
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
        try {
            const [menuitemData, ingredientData, sizeData] = await Promise.all([
                fetchHelper(`${backendApi}/api/v1/menuitems`),
                fetchHelper(`${backendApi}/api/v1/ingredients`),
                fetchHelper(`${backendApi}/api/v1/sizes`),
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
        }}
        >
            {children}
        </MenuContext.Provider>
    );
    };

    export const useMenu = () => useContext(MenuContext);
