import React, { useState } from 'react'
import { Box, 
  TextField, 
  Button, 
  Typography,
  // FormControl,
  // InputLabel,
  // OutlinedInput,
  // InputAdornment,
  // IconButton 
} from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PasswordInput from '../FieldMessage/PasswordField';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LoginForm = () => {
  const [formData, setFormData] = useState({
    logEmail: '',
    // logPassword: '',
  });
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [pswd, setPswd] = useState()
  const [error, setError] = useState({pwd:false})
  // const [showPassword, setShowPassword] =useState(false);
  const [errors, setErrors] = useState(false); 

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleLogin = () => {
    const { logEmail, logPassword } = formData;
    if (!logEmail || !pswd) {
      setErrors(true);
      // setErrors({ email: 'Please provide email and password' });
      // alert('Please provide')
      return;
    }
    else{
      setErrors(false);
      // alert('Please')
    }
    //  else {
    //   setErrors({}); 
    // }

    const data = JSON.parse(localStorage.getItem('data')) || [];
    console.log(data,"rtyuiop")
    console.log(logEmail,pswd,"emai,password")
    const logindetails = data.find((user) => {
      return user.email === logEmail && user.password === pswd;
    });

    console.log()
    console.log("wsedrftgyhuj")
   console.log(logindetails,"login da")
    if (logindetails) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
      localStorage.setItem('LoggedIn', true);
    // }
    } else {
      setError(true);
      // alert("not same")
      // setErrors({ email: 'Invalid email or password' });
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
    setErrors(false);
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
          // error={!!errors.email}
          // helperText={errors.email || ''}
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
        {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
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
        </FormControl> */}
        <PasswordInput 
        // value={formData.logPassword} 
        value={pswd}
         onChange={(e)=>setPswd(e.target.value)} 
        onBlur={(e, error) =>
          setError((state) => ({ ...state, pwd: error }))}
        
        />
        <Button sx={{ my: 1 }} variant="contained" onClick={handleLogin}>Login</Button>
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully LoggedIn!
          </Alert>
        </Snackbar>
        <Snackbar open={errors} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            Please Fill The Field!
          </Alert> 
        </Snackbar>
        <Typography variant='h6'>Don't have an account?<Link to='/register'>Register</Link></Typography>
      </Box>
    </>
  )
}

export default LoginForm