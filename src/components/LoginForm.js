import React, { useState } from 'react'
import { Box, TextField, Button, Typography,FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  // const [error, setError] = useState(false)
  const [showPassword, setShowPassword] =useState(false);
  const [errors, setErrors] = useState({}); 

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = () => {
    const { logEmail, logPassword } = formData;
    if (!logEmail || !logPassword) {
      // setError(true);
      setErrors({ email: 'Please provide both email and password' });
      return;
    } else {
      setErrors({}); 
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
      // setError(true);
      setErrors({ email: 'Invalid email or password' });
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
    // setError(false);
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
          error={!!errors.email}
          helperText={errors.email || ''}
        />
        {/* <TextField
          sx={{ my: 1 }}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="logPassword"
          value={formData.logPassword}
          onChange={(e) => setFormData({ ...formData, logPassword: e.target.value })}
        /> */}
        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            // label="Password" 
            autoComplete="current-password" 
            name="password" 
            value={formData.password} 
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
            error={!!errors.password}
            helperText={errors.password}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button sx={{ my: 1 }} variant="contained" onClick={handleLogin}>Login</Button>
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully LoggedIn!
          </Alert>
        </Snackbar>
        {/* <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please LogIn correctly!
          </Alert> 
        </Snackbar>*/}
        <Typography variant='h6'>Don't have an account?<Link to='/register'>Register</Link></Typography>
      </Box>
    </>
  )
}

export default LoginForm