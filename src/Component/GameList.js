import React, { useContext } from 'react';
import axios from 'axios'
import { GameContext } from '../Context/GameContext';
import { UserContext } from '../Context/UserContext';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


const GameList = () => {
    const classes = useStyles()
    const [user] = useContext(UserContext)
    const [dataGame, setDataGame, inputDataGame, setInputDataGame, formValues, setFormValues] = useContext(GameContext);

    const editGame = (id) => {
        let idDataGame = id
        let idataGame = dataGame.find(x => x.id === idDataGame)
        setFormValues({
            name: idataGame.name || "",
            genre: (idataGame.genre && {
                label: idataGame.genre,
                value: idataGame.genre
            }) || "",
            platform: (idataGame.platform && {
                label: idataGame.platform,
                value: idataGame.platform
            }) || "",
            singlePlayer: (idataGame.singlePlayer && {
                label: idataGame.singlePlayer,
                value: idataGame.singlePlayer
            }) || "",
            multiplayer: (idataGame.multiplayer && {
                label: idataGame.multiplayer,
                value: idataGame.multiplayer
            }) || "",
            release: (idataGame.release && {
                label: idataGame.release,
                value: idataGame.release
            }) || "",
            image_url: idataGame.image_url || ""
        })
    }

    React.useEffect(() => {
        console.log("dataGame ====", dataGame)
    }, [dataGame])

    const deleteGame = (id) => {
        let idDataGame = id
        let newDataGame = dataGame.filter(el => el.id !== idDataGame)

        axios.delete(`https://backendexample.sanbersy.com/api/data-game/${idDataGame}`, {headers: {"Authorization" : `Bearer ${user.token}`}}     )
            .then(res => {
                console.log(res)
            })
        setDataGame([...newDataGame])
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Game Title</StyledTableCell>
                            <StyledTableCell align="right">Genre</StyledTableCell>
                            <StyledTableCell align="right">Platform</StyledTableCell>
                            <StyledTableCell align="right">Single Player</StyledTableCell>
                            <StyledTableCell align="right">Multiplayer</StyledTableCell>
                            <StyledTableCell align="right">Release</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            dataGame !== null && dataGame.map((el, idx) => {
                                return (
                                    <StyledTableRow key={el.title}>
                                        <StyledTableCell component="th" scope="row">
                                            {el.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{el.genre}</StyledTableCell>
                                        <StyledTableCell align="right">{el.platform}</StyledTableCell>
                                        <StyledTableCell align="right">{el.singlePlayer}</StyledTableCell>
                                        <StyledTableCell align="right">{el.multiplayer}</StyledTableCell>
                                        <StyledTableCell align="right">{el.release}</StyledTableCell>
                                        <StyledTableCell align="right">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={classes.button}
                                            startIcon={<SaveIcon />}
                                            onClick={() => editGame(el.id)}
                                        >
                                            Edit
                                        </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => deleteGame(el.id)}
                                            >
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default GameList