import React, { useContext } from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { MovieContext } from '../Context/MovieContext'
import { UserContext } from '../Context/UserContext'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from "axios";

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    form: {
        width: '70%',
        margin: '0 auto',
        background: '#fff',
        border: '2px solid #eee',
        borderRadius: 5,
        marginTop: 40,
        padding: 20
    },
});

const year = [
    { value: '2000', label: '2000', },
    { value: '2001', label: '2001', },
    { value: '2002', label: '2002', },
    { value: '2003', label: '2003', },
    { value: '2004', label: '2004', },
    { value: '2005', label: '2005', },
    { value: '2006', label: '2006', },
    { value: '2007', label: '2007', },
    { value: '2008', label: '2008', },
    { value: '2009', label: '2009', },
    { value: '2010', label: '2010', },
    { value: '2011', label: '2011', },
    { value: '2012', label: '2012', },
    { value: '2013', label: '2013', },
    { value: '2014', label: '2014', },
    { value: '2015', label: '2015', },
    { value: '2016', label: '2016', },
    { value: '2017', label: '2017', },
    { value: '2018', label: '2018', },
    { value: '2019', label: '2019', },
    { value: '2020', label: '2020', },
];

const rate = [
    { value: '1', label: '1', },
    { value: '2', label: '2', },
    { value: '3', label: '3', },
    { value: '4', label: '4', },
    { value: '5', label: '5', },
    { value: '6', label: '6', },
    { value: '7', label: '7', },
    { value: '8', label: '8', },
    { value: '9', label: '9', },
    { value: '10', label: '10', }
]

const genre = [
    { value: 'Action', label: 'Action', },
    { value: 'Adventure', label: 'Adventure', },
    { value: 'Comedy', label: 'Comedy', },
    { value: 'Crime', label: 'Crime', },
    { value: 'Drama', label: 'Drama', }
]


const MovieForm = () => {
    const classes = useStyles();
    const [dataMovie, setDataMovie, inputDataMovie, setInputDataMovie, formValues, setFormValues] = useContext(MovieContext);
    const [years, setYears] = React.useState('2001');
    const [user] = useContext(UserContext)

    const submitHandler = (e) => {
        e.preventDefault()
        const { title, description, year, duration, genre, rating, image_url } = formValues;
            axios.post("https://backendexample.sanbersy.com/api/data-movie", {
            title,
            description,
            year: parseInt(year.value),
            duration: parseInt(duration),
            genre: genre.value,
            rating: parseInt(rating.value),
            image_url
        }, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user")).token}` 
            }
        })
        
        
        // console.log("outpuit====", {
        //     title,
        //     description,
        //     year: parseInt(year.value),
        //     duration: parseInt(duration),
        //     genre: genre.value,
        //     rating: parseInt(rating.value),
        //     image_url
        // })
        // console.log("formValues", formValues)
    }

    React.useEffect(() => {
        console.log("formValues===", formValues)
    }, [formValues])
    
    return (
        <>
            <form onSubmit={submitHandler}>
                <div className={classes.form}>
                    <Typography variant='h3'>Form Movies</Typography>
                    <TextField
                        id="standard-full-width"
                        label="Title"
                        style={{ margin: 8 }}
                        placeholder="Title Here"
                        fullWidth
                        margin="normal"
                        value={formValues.title}
                        onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        id="standard-full-width"
                        label="Description"
                        style={{ margin: 8 }}
                        placeholder="Description Here"
                        fullWidth
                        multiline
                        rows={5}
                        margin="normal"
                        value={formValues.description}
                        onChange={(event) => {
                            console.log("e====", event)
                            setFormValues({ ...formValues, description: event.target.value })
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        style={{ marginLeft: 20, marginTop: 24, width: 160 }}
                        id="standard-select-years"
                        select
                        label="Year"
                        value={formValues.year.value}
                        onChange={(e) => setFormValues({
                            ...formValues, year: {
                                value: e.target.value,
                                label: e.target.value
                            }
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {year.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        style={{ marginLeft: 20, marginTop: 24, width: 160 }}
                        id="standard-select-rate"
                        select
                        label="Rating"
                        value={formValues.rating.value}
                        onChange={(e) => setFormValues({
                            ...formValues, rating: {
                                value: e.target.value,
                                label: e.target.value
                            }
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {rate.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        style={{ marginLeft: 20, marginTop: 24, width: 160 }}
                        id="standard-number"
                        label="Duration (in mins)"
                        type="number"
                        value={formValues.duration}
                        onChange={(e) => setFormValues({
                            ...formValues, duration: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <TextField
                        style={{ marginLeft: 20, marginTop: 24, width: 160 }}
                        id="standard-select-genre"
                        select
                        label="Genre"
                        value={formValues.genre.value}
                        onChange={(e) => setFormValues({
                            ...formValues, genre: {
                                value: e.target.value,
                                label: e.target.value
                            }
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        {genre.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="standard-full-width"
                        label="Image URL"
                        style={{ margin: 8, marginTop: 24 }}
                        placeholder="Place image url here"
                        fullWidth
                        value={formValues.image_url}
                        margin="normal"
                        onChange={(e) => setFormValues({
                            ...formValues, image_url: e.target.value
                        })}
                        InputLabelProps={{
                            shrink: true,
                        }} />
                    <Button
                        style={{ marginTop: 24 }}
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<SaveIcon />}
                    >
                        Save
                </Button>
                </div>
            </form>
        </>
    )
}

export default MovieForm;