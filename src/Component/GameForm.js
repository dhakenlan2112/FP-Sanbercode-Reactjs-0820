import React, {useContext} from 'react'
import axios from 'axios'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {GameContext} from '../Context/GameContext'
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
    form: {
        width: '75%',
        margin: '0 auto',
        background: '#fff',
        border: '2px solid #eee',
        borderRadius: 5,
        marginTop: 40,
        padding: 20
    },
});

const release = [
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

const platform = [
    { value: 'PC', label: 'PC', },
    { value: 'Playstation', label: 'Playstation', },
    { value: 'X-Box', label: 'X-Box', },
]

const singlePlayer = [
    { value: '1', label: '1', },
    { value: '0', label: '0', },
]

const multiplayer = [
    { value: '1', label: '1', },
    { value: '0', label: '0', },
]

const genre = [
    { value: 'Action', label: 'Action', },
    { value: 'Adventure', label: 'Adventure', },
    { value: 'Comedy', label: 'Comedy', },
    { value: 'Crime', label: 'Crime', },
    { value: 'Drama', label: 'Drama', }
]


const GameForm = () => {
    const classes = useStyles();
    const [dataGame, setDataGame, inputDataGame, setInputDataGame, formValues, setFormValues] = useContext(GameContext);
    const [releases, setRelease] = React.useState('2001');

    const submitHandler = (e) => {
        e.preventDefault()
        const { name, genre, platform, singlePlayer, multiplayer, release, image_url } = formValues;
        axios.post("https://backendexample.sanbersy.com/api/data-game", {
            name,
            genre: genre.value,
            platform: platform.value, 
            singlePlayer: parseInt(singlePlayer.value),
            multiplayer: parseInt(multiplayer.value),
            release: parseInt(release.value),
            image_url
        }, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user")).token}` 
            }
        })
    }

    return (
        <>
        <form onSubmit={submitHandler}>
            <div className={classes.form}>
                <Typography variant='h3'>Form Games</Typography>
                <TextField
                    id="standard-full-width"
                    label="Name"
                    style={{ margin: 8 }}
                    placeholder="Name Here"
                    fullWidth
                    margin="normal"
                    value={formValues.name}
                    onChange={(e) => setFormValues({...formValues, name: e.target.value})}
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <TextField
                    style={{ marginLeft: 20, marginTop: 24, width: 160}}
                    id="standard-select-genre"
                    select
                    label="Genre"
                    value={formValues.genre.value}
                    onChange={(e) => setFormValues({...formValues, genre: {
                        value: e.target.value,
                        label: e.target.value
                    }})}
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
                    style={{ marginLeft: 20, marginTop: 24, width: 160 }}
                    id="standard-select-platform"
                    select
                    label="Platform"
                    value={formValues.platform.value}
                    onChange={(e) => setFormValues({...formValues, platform: {
                        value: e.target.value,
                        label: e.target.value
                    }})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                    {platform.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    style={{ marginLeft: 20, marginTop: 24, width: 160}}
                    id="standard-select-singlePlayer"
                    select
                    label="Single Player"
                    value={formValues.singlePlayer.value}
                    onChange={(e) => setFormValues({...formValues, singlePlayer: {
                        value: e.target.value,
                        label: e.target.value
                    }})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                    {singlePlayer.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    style={{ marginLeft: 20, marginTop: 24, width: 160}}
                    id="standard-select-multiplayer"
                    select
                    label="Multiplayer"
                    value={formValues.multiplayer.value}
                    onChange={(e) => setFormValues({...formValues, multiplayer: {
                        value: e.target.value,
                        label: e.target.value
                    }})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                    {multiplayer.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    style={{ marginLeft: 20, marginTop: 24, width: 160 }}
                    id="standard-select-release"
                    select
                    label="Release"
                    value={formValues.release.value}
                    onChange={(e) => setFormValues({...formValues, release: {
                        value: e.target.value,
                        label: e.target.value
                    }})}
                    InputLabelProps={{
                        shrink: true,
                    }}
                >
                    {release.map((option) => (
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
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }} />
                <Button
                    style={{ marginTop: 24 }}
                    variant="contained"
                    color="primary"
                    size="small"
                    type="submit"
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </div>
        </form>
        </>
    )
}

export default GameForm;