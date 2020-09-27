import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ChangePassword = (props) => {

  // const [form] = Form.useForm()
  const [successMessage, setSuccessMessage] = useState([])
  const [errMessage, setErrMessage] = useState([])
  const classes = useStyles();
  const [input, setInput] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: ""
  })

  let history = useHistory();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // do change password
    try {
    //   setErrMessage([])
    //   setSuccessMessage([])
      console.log("values ====== ", input.current_password)
      await axios.post('https://backendexample.sanbersy.com/api/change-password', {
        current_password: input.current_password,
        new_password: input.new_password,
        new_confirm_password: input.new_confirm_password,
      }, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem("user")).token}` 
        }
    })
      // setSuccessMessage(["Password changed!"])
      history.push("/")
      alert('Password Changed')
    } catch (err) {
      console.log(err.response.data)
      alert(err.response.data)
      // let resJson = {}
      // if (typeof err.response.data === 'string') {
      //   resJson = JSON.parse(err.response.data)
      // } else {
      //   resJson = err.response.data
      // }
      // const msgs = []
      // for (const key of Object.keys(resJson)) {
      //   msgs.push(resJson[key])
      // }
      // setErrMessage(msgs)
    }
    // form.resetFields()
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="current_password"
            label="Current Password"
            name="Current Password"
            autoComplete="current_password"
            autoFocus
            onChange={(e) => setInput({...input, current_password: e.target.value})}
            value={input.current_password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="new_password"
            label="New Password"
            name="new_password"
            autoComplete="new_password"
            autoFocus
            onChange={(e) => setInput({...input, new_password: e.target.value})}
            value={input.new_password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="new_confirm_password"
            label="Confirm New Password"
            type="new_confirm_password"
            id="new_confirm_password"
            autoComplete="new_confirm_password"
            onChange={(e) => setInput({...input, new_confirm_password: e.target.value})}
            value={input.new_confirm_password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Change Password
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ChangePassword;
