import React, { useContext, useState } from 'react';
import axios from 'axios'
import { MovieContext } from '../Context/MovieContext'
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

function compareAsc(a, b, key) {
    if (a[key] < b[key]) {
        return -1;
    }
    if (a[key] > b[key]) {
        return 1;
    }
    return 0;
}
function compareDesc(a, b, key) {
    if (a[key] > b[key]) {
        return -1;
    }
    if (a[key] < b[key]) {
        return 1;
    }
    return 0;
}

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


const MovieList = () => {
    const classes = useStyles()
    const [user] = useContext(UserContext)
    const [dataMovie, setDataMovie, inputDataMovie, setInputDataMovie, formValues, setFormValues, defaultMovie, setDefaultMovie] = useContext(MovieContext);
    const [searchTitle, setSearchTitle] = React.useState()
    const [filteredData, setFilteredData] = React.useState([])
    const [sortState, sort] = React.useState("default")

    const editMovie = (id) => {
        let idDataMovie = id
        let idataMovie = dataMovie.find(x => x.id === idDataMovie)
        console.log("dataMovie", dataMovie)

        setFormValues({
            title: idataMovie.title || "",
            description: idataMovie.description || "",
            year: (idataMovie.year && {
                label: idataMovie.year,
                value: idataMovie.year
            }) || "",
            duration: idataMovie.duration || "",
            genre: (idataMovie.genre && {
                label: idataMovie.genre,
                value: idataMovie.genre
            }) || "",
            rating: (idataMovie.rating && {
                label: idataMovie.rating,
                value: idataMovie.rating
            }) || "",
            image_url: idataMovie.image_url || "",
            id: idataMovie.id || ""
        })
    }

    React.useEffect(() => {
        if (dataMovie && searchTitle) {
            let filteredDataMovie = dataMovie.filter(movie => {
                return movie.title.toLowerCase().includes(searchTitle.toLowerCase()) ||
                    movie.description.toLowerCase().includes(searchTitle.toLowerCase()) ||
                    movie.genre.toLowerCase().includes(searchTitle.toLowerCase())
            })
            setFilteredData(filteredDataMovie)
        } else {
            setFilteredData([])
        }
    }, [searchTitle, dataMovie])

    React.useEffect(() => {
        console.log('sortState', sortState)
    }, [sortState])

    React.useEffect(() => {
        let sorted;
        switch (sortState) {
            case "default":
                setDataMovie([...defaultMovie]);
                break;
            case "asc":
                sorted = dataMovie.sort((a, b) => compareAsc(a, b, "title"));
                setDataMovie([...sorted])
                break;
            case "desc":
                sorted = dataMovie.sort((a, b) => compareDesc(a, b, "title"));
                setDataMovie([...sorted])
                break;
            default:
                console.error("only 'asc' and 'desc'")
                break;
        }
    }, [sortState, defaultMovie])

    const deleteMovie = (id) => {
        var idDataMovie = id
        axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${idDataMovie}`, { headers: { "Authorization": `Bearer ${user.token}` } })
            .then(res => {
                var newDataMovie = dataMovie.filter(x => x.id !== idDataMovie)
                console.log(res)
                setDataMovie(newDataMovie)
                setDefaultMovie(newDataMovie)
            })
    }

    return (
        <>
            <div>
                Search
            </div>
            <div>
                <TextField
                    label="Title | Description | Genre"
                    value={searchTitle}
                    fullWidth
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ marginBottom: 40 }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell style={{cursor: "pointer"}} onClick={() => {
                                if(sortState === "asc"){
                                    sort('desc')
                                } else if(sortState === "desc") {
                                    sort('default')
                                } else {
                                    sort('asc')
                                }
                            }}>Movies Title {sortState === "default" ? "" : `(${sortState})`}</StyledTableCell>
                            <StyledTableCell align="right">Description</StyledTableCell>
                            <StyledTableCell align="right">Year</StyledTableCell>
                            <StyledTableCell align="right">Rating</StyledTableCell>
                            <StyledTableCell align="right">Duration</StyledTableCell>
                            <StyledTableCell align="right">Genre</StyledTableCell>
                            <StyledTableCell align="right">Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (filteredData.length && filteredData.map((el, idx) => {
                                return (
                                    <StyledTableRow key={el.title}>
                                        <StyledTableCell component="th" scope="row">
                                            {el.title}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{el.description}</StyledTableCell>
                                        <StyledTableCell align="right">{el.year}</StyledTableCell>
                                        <StyledTableCell align="right">{el.rating}</StyledTableCell>
                                        <StyledTableCell align="right">{el.duration}</StyledTableCell>
                                        <StyledTableCell align="right">{el.genre}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                onClick={() => editMovie(el.id)}
                                            >
                                                Edit
                                        </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => deleteMovie(el.id)}
                                            >
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            })) ||
                            (dataMovie !== null && dataMovie.map((el, idx) => {
                                return (
                                    <StyledTableRow key={el.title}>
                                        <StyledTableCell component="th" scope="row">
                                            {el.title}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{el.description}</StyledTableCell>
                                        <StyledTableCell align="right">{el.year}</StyledTableCell>
                                        <StyledTableCell align="right">{el.rating}</StyledTableCell>
                                        <StyledTableCell align="right">{el.duration}</StyledTableCell>
                                        <StyledTableCell align="right">{el.genre}</StyledTableCell>
                                        <StyledTableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<SaveIcon />}
                                                onClick={() => editMovie(el.id)}
                                            >
                                                Edit
                                        </Button>
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                size="small"
                                                className={classes.button}
                                                startIcon={<DeleteIcon />}
                                                onClick={() => deleteMovie(el.id)}
                                            >
                                                Delete
                                            </Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                )
                            }))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default MovieList