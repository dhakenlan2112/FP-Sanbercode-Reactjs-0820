import React, {useContext} from 'react';
import {MovieContext} from '../Context/MovieContext'
import {GameContext} from '../Context/GameContext'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles({
    root: {
        width: 500,
        marginRight: 20,
        marginTop: 20,
    },
    media: {
        height: 700,
    },
    card: {
        marginRight: 20
    },
});


export default function Home() {
    const classes = useStyles();
    const [dataMovie, setDataMovie] = useContext(MovieContext)
    const [dataGame, setDataGame] = useContext(GameContext)
    return (
        <>
            <Typography variant="h3">Movie List</Typography>
            <Box display="flex" flexDirection="row" justifyContent="flex-start" flexWrap="wrap">
            {
            dataMovie !== null && dataMovie.map((el, idx) => {
                return (
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={el.image_url}
                                title={el.title}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {el.title}
                                </Typography>
                                <Divider />
                                <br />
                                <span><b>Year: </b>{el.year}</span><br />
                                <span><b>Rating: </b>{el.rating}</span><br />
                                <span><b>Duration: </b>{el.duration}</span><br />
                                <span><b>Genre: </b>{el.genre}</span><br /><br />
                                <Typography variant="body2" color="textSecondary" component="p">
                                   {el.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    )
                })}
                </Box>
                <Divider style={{marginTop: 40}}/>
                <Typography style={{marginTop: 40}} variant="h3">Games List</Typography>
            <Box display="flex" flexDirection="row" justifyContent="flex-start" flexWrap="wrap">
            {
            dataGame !== null && dataGame.map((el, idx) => {
                return (
                    <Card className={classes.root}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={el.image_url}
                                name={el.name}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {el.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   Genre: {el.genre}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   Platform: {el.platform}
                                </Typography><Typography variant="body2" color="textSecondary" component="p">
                                   Single Player: {el.singlePlayer}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   Multiplayer: {el.multiplayer}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                   Release: {el.release}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    )
                })}
                </Box>
        </>
    );
}