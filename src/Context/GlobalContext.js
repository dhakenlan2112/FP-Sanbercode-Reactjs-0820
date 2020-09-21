import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const GlobalContext = createContext();

export const GlobalProvider = props => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    return(
        <GlobalContext.Provider value={{
            isAuthenticated,
            setIsAuthenticated
        }}>
            {props.children}
        </GlobalContext.Provider>
    )

}