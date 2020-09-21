import React, { useContext } from 'react';
import { MovieProvider } from '../Context/MovieContext'
import MovieList from '../Component/MovieList'
import MovieForm from '../Component/MovieForm'

const Movies = () => {
   
    return (
        <>
        <MovieProvider>
            <MovieList />
            <MovieForm />
        </MovieProvider>
        </>
    )
}

export default Movies