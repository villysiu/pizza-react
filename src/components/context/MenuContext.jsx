import React, { createContext, useContext, useEffect, useState } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const backendApi = 'http://localhost:3000'
    const [menuitems, setMenuitems] = useState([])
    const [milks, setMilks] = useState([])
    const [sizes, setSizes] = useState([])
    const [temperatures, setTemperatures] = useState([])
    const [sugars, setSugars] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchHelper = async (apiUrl) => {
        const response = await fetch(apiUrl)

        if(!response.ok){
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText}`)
        }
        return response.json()
    }
    const fetchMenuitemData = async () => {
        try {
            const [menuitemData, milkData, sizeData, temperatureData, sugarData] = await Promise.all([
                fetchHelper(`${backendApi}/api/v1/menuitems`),
                fetchHelper(`${backendApi}/api/v1/milks`),
                fetchHelper(`${backendApi}/api/v1/sizes`),
                fetchHelper(`${backendApi}/api/v1/temperatures`),
                fetchHelper(`${backendApi}/api/v1/sugars`),
            ]);

            setMenuitems(menuitemData.menuitems)
            setMilks(milkData.milks);
            setSizes(sizeData.sizes)
            setTemperatures(temperatureData);
            setSugars(sugarData)

        } catch (error) {
            console.error("Error fetching menu data:", error);
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
                milks,
                sizes,
                temperatures,
                sugars,
                loading,
        }}
        >
        {children}
        </MenuContext.Provider>
    );
    };

    export const useMenu = () => useContext(MenuContext);
