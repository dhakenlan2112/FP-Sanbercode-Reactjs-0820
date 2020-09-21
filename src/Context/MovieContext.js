import React, {useState, createContext, useEffect} from 'react'
import axios from 'axios'

export const MovieContext = createContext();

export const MovieProvider = props => {
    const [dataMovie, setDataMovie] = useState(null)
    
    useEffect(() => {
        if (dataMovie === null) {
            axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            .then(res => {
                setDataMovie(res.data)
            })
        }
    }, [dataMovie]);

    const [inputDataMovie, setInputDataMovie] = useState({
        title: "",
        description: "",
        year: 2020,
        duration: 0,
        genre: "",
        rating: 0,
        image_url: "",
        id: null
    })

    const [formValues, setFormValues] = React.useState({
        title: "",
        description: "",
        year: {
            value: "",
            label: ""
        },
        rating: {
            value: "",
            label: ""
        },
        duration: "",
        genre: {
            value: "",
            label: ""
        },
        image_url: ""
    })

    return(
        <MovieContext.Provider value={[dataMovie, setDataMovie, inputDataMovie, setInputDataMovie, formValues, setFormValues]}>
            {props.children}
        </MovieContext.Provider>
    )

}