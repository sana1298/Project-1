import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LoginForm = () => {
  const [formData, setFormData] = useState({
    logEmail: '',
    logPassword: '',
  });
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    const { logEmail, logPassword } = formData;
    if (!logEmail || !logPassword) {
      setError(true);
      return;
    }

    const data = JSON.parse(localStorage.getItem('data')) || [];

    const logindetails = data.find((user) => {
      return user.email === logEmail && user.password === logPassword;
    });

    if (logindetails) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
      localStorage.setItem('LoggedIn', true);
    } else {
      setError(true);
    }
    setFormData({
      logEmail: '',
      logPassword: '',
    });
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSuccess(false);
    setError(false);
  };
  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 320,
          backgroundColor: '#b7c6e8',
          mt: 20,
          mx: 60,
          p: 2
        }}
      >
        <Typography variant='h5'>Login</Typography>
        <TextField sx={{ my: 1 }} id="outlined-basic" label="Email" variant="outlined" name="logEmail"
          value={formData.logEmail}
          onChange={(e) => setFormData({ ...formData, logEmail: e.target.value })}
        />
        <TextField
          sx={{ my: 1 }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="logPassword"
          value={formData.logPassword}
          onChange={(e) => setFormData({ ...formData, logPassword: e.target.value })}
        />
        <Button sx={{ my: 1 }} variant="contained" onClick={handleLogin}>Login</Button>
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully LoggedIn!
          </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please LogIn correctly!
          </Alert>
        </Snackbar>
        <Typography variant='h6'>Don't have an account?<Link to='/register'>Register</Link></Typography>

      </Box>
    </>
  )
}

export default LoginForm