import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const GameContext = createContext();

export const GameProvider = props => {
    const [dataGame, setDataGame] = useState(null)
    const [defaultGame, setDefaultGame] = React.useState([])
    
    useEffect(() => {
        if (dataGame === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            .then(res => {
                setDataGame(res.data)
                setDefaultGame(res.data)
            })
        }
    }, [dataGame]);

    const [inputDataGame, setInputDataGame] = useState({
        name: "",
        genre: "",
        singlePlayer: 0,
        multiplayer: 0,
        platform: "",
        release: 0,
        image_url: "",
        id: null
    })

    const [formValues, setFormValues] = React.useState({
        name: "",
        genre: {
            value: "",
            label: ""
        },
        platform: {
            value: "",
            label: ""
        },
        singlePlayer: {
            value: "",
            label: ""
        },
        multiplayer: {
            value: "",
            label: ""
        },
        release: {
            value: "",
            label: ""
        },
        image_url: ""
    })

    return(
        <GameContext.Provider value={[dataGame, setDataGame, inputDataGame, setInputDataGame, formValues, setFormValues, defaultGame, setDefaultGame]}>
            {props.children}
        </GameContext.Provider>
    )

}