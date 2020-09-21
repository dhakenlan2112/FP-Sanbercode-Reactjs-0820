import React, { useContext } from 'react';
import GameList from '../Component/GameList'
import GameForm from '../Component/GameForm'
import { GameProvider } from '../Context/GameContext';

const Games = () => {
   
    return (
        <>
        <GameProvider>
            <GameList />
            <GameForm />
        </GameProvider>
        </>
    )
}

export default Games;