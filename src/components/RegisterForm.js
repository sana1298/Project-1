import React, { useState } from 'react'
import { Box, TextField, Button, Typography,
  // FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton 
} from '@mui/material';
// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
// import { useUser } from '../context/UserContext';
import PasswordInput from '../FieldMessage/PasswordField';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const RegisterForm = () => {

  // const { userData, updateUser } = useUser();
  // const [formData, setFormData] = useState(userData);
  const [userData, setUserData] = useState({
    userName: '',
    email: '',
    password: '',
  });


  // const [errors, setErrors] = useState({
  //   userName: '',
  //   email: '',
  //   password: '',
  // });
  const [pswd, setPswd] = useState()
  const [error, setError] = useState({
    pwd:false,
    // mail:false,
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  // const [showPassword, setShowPassword] =useState(false);

  // const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  const handleClick = (e) => {
    e.preventDefault();
    // let newErrors = { userName: '', email: '', password: '' };

    // if (!nameRegex.test(formData.userName)) {
    //   newErrors.userName = 'Please enter a valid name';
    // }
    // if (!formData.userName) {
    //   newErrors.userName = 'Please enter your name';
    // }
    // if (!emailRegex.test(formData.email)) {
    //   newErrors.email = 'Please enter a valid email';
    // }
    // if (!passwordRegex.test(formData.password)) {
    //   newErrors.password =
    //     'Please enter a strong password ';
    // }
    if ((!passwordRegex.test(userData.password))&&(!nameRegex.test(userData.userName))&&(!emailRegex.test(userData.email))) {
      setError(true);
    }

    if (userData.userName || userData.email || userData.password) {
      // setError(true);
      const userDetails = {
        userName: userData.userName,
        email: userData.email,
        password: userData.password,
      };
    //  const updateUser=(
    //     userDetails.userName,
    //     userDetails.email,
    //     userDetails.password
    //   );
      const existingData = JSON.parse(localStorage.getItem("data")) || [];
      existingData.push(userDetails);
      localStorage.setItem("data", JSON.stringify(existingData));
      setSuccess(true);
      setTimeout(() => {
        navigate('/')
      }, 2000)
      userData({
        userName: '',
        email: '',
        password: '',
      });
      setError({ userName: '', email: '', password: '' });
    }
    else {
    //   const userDetails = {
    //     userName: formData.userName,
    //     email: formData.email,
    //     password: formData.password,
    //   };
    //   updateUser(
    //     userDetails.userName,
    //     userDetails.email,
    //     userDetails.password
    //   );
    //   const existingData = JSON.parse(localStorage.getItem("data")) || [];
    //   existingData.push(userDetails);
    //   localStorage.setItem("data", JSON.stringify(existingData));
    //   setSuccess(true);
    //   setTimeout(() => {
    //     navigate('/')
    //   }, 2000)
    //   setFormData({
    //     userName: '',
    //     email: '',
    //     password: '',
    //   });
    //   setError({ userName: '', email: '', password: '' });
     setError(true);


  };
  }
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
  };
  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 400,
          backgroundColor: '#b7c6e8',
          mt: 10,
          mx: 60,
          p: 2
        }}>
        <Typography variant='h5'>Register</Typography>
        <TextField 
        sx={{ my: 1 }} 
        id="outlined-basic" 
        label="Name" 
        variant="outlined" 
        name="userName" 
        value={userData.userName} 
        onChange={(e) => setUserData({ ...userData, userName: e.target.value })} 
        // error={!!errors.userName}
        // helperText={errors.userName} 
        />
        <TextField 
        sx={{ my: 1 }} 
        id="outlined-basic" 
        label="Email" 
        variant="outlined" 
        name="email" 
        value={userData.email} 
        onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
        // error={!!errors.email}
        // helperText={errors.email} 
         />
          <PasswordInput 
        value={pswd}
         onChange={(e)=>setPswd(e.target.value)} 
        onBlur={(e, error) =>
          setError((state) => ({ ...state, pwd: error }))}
        />
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
        <Button sx={{ my: 1 }} variant="contained" onClick={handleClick}>Register</Button>
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully Registered!
          </Alert>
        </Snackbar>
        <Typography variant='h6' >Already have an account?<Link to='/'>Login</Link></Typography>
      </Box>
    </>
  )
}

export default RegisterForm;
