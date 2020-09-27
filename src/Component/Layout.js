import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext'
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import MovieIcon from '@material-ui/icons/Movie';
import GamesIcon from '@material-ui/icons/Games';
import { Link, useHistory } from 'react-router-dom';
import logo from '../img/logo.png';
import ChangePassword from '../Pages/ChangePassword'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  styleLinkNavbar: {
    color: "inherit",
    textDecoration: "none"
  },
  icon: {
    paddingLeft: 8
  }
}));

export default function MiniDrawer({ children }) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory()

  const [user, setUser] = useContext(UserContext)

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("user")
    history.push("/login")
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Sanbercode - Final Project
          </Typography>
          <div style={{ marginLeft: "auto" }}>
            {user ? (
              <React.Fragment>
                <span style={{ marginRight: 16 }}>
                  Hi, {user.name}
                </span>
                <span>
                <Link to="/change_password" style={{ color: "inherit" }}>
                  <Button color="inherit">
                    Change Password
                </Button>
                </Link>
                </span>
                <Button onClick={handleLogout} color="inherit">
                  Logout
                </Button>
              </React.Fragment>) :
              (<React.Fragment>
                <Link to="/login" style={{ color: "inherit" }}>
                  <Button color="inherit">
                    Login
                </Button>
                </Link>
                <Link to="/register" style={{ color: "inherit" }}>
                  <Button color="inherit">
                    Register
                  </Button>
                </Link>
              </React.Fragment>)
            }
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <img src={logo} style={{ width: 170 }}></img>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            {
              user === null && (
                <>
                  <Link to="/">
                    <ListItem button>
                      <ListItemIcon className={classes.icon}><HomeIcon /></ListItemIcon>
                      <ListItemText>Home</ListItemText>
                    </ListItem>
                  </Link>
                  <Link to="/about">
                    <ListItem button>
                      <ListItemIcon className={classes.icon}><AccountBoxIcon /></ListItemIcon>
                      <ListItemText>About</ListItemText>
                    </ListItem>
                  </Link>
                </>
              )
            }
            {
              user !== null && (
                <>
                  <Link to="/">
                    <ListItem button>
                      <ListItemIcon className={classes.icon}><HomeIcon /></ListItemIcon>
                      <ListItemText>Home</ListItemText>
                    </ListItem>
                  </Link>

                  <Link to="/about">
                    <ListItem button>
                      <ListItemIcon className={classes.icon}><AccountBoxIcon /></ListItemIcon>
                      <ListItemText>About</ListItemText>
                    </ListItem>
                  </Link>

                  <Link to="/movies">
                    <ListItem button>
                      <ListItemIcon className={classes.icon}><MovieIcon /></ListItemIcon>
                      <ListItemText>Movies</ListItemText>
                    </ListItem>
                  </Link>

                  <Link to="/games">
                    <ListItem button>
                      <ListItemIcon className={classes.icon}><GamesIcon /></ListItemIcon>
                      <ListItemText>Games</ListItemText>
                    </ListItem>
                  </Link>
                </>
              )
            }
          </div>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}
