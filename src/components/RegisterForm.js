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
import EmailField from '../FieldMessage/EmailField';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const RegisterForm = () => {
const[userName,setUserName]=useState('')
  const[email,setEmail]=useState('')
  const [pswd, setPswd] = useState()
  const [error, setError] = useState({
    pwd:false,
    mail:false,
  })
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault();
    if ((!nameRegex.test(userName))&&(!emailRegex.test(email))&&(!passwordRegex.test(pswd))) {
      setError(true);
    }

    if (userData) {
      const userDetails = {
        userName: userData.userName,
        email: userData.email,
        password: pswd
      };
      const existingData = JSON.parse(localStorage.getItem("data")) || [];
      existingData.push(userDetails);
      localStorage.setItem("data", JSON.stringify(existingData));
      setSuccess(true);
      setTimeout(() => {
        navigate('/')
      }, 2000)
      setUserData({
        userName: '',
        email: '',
        // password: '',
      });
      setError({ userName: '', email: '', password: '' });
    }
    else {
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
        value={userName} 
        onChange={(e) => setUserName({ ...userName, userName: e.target.value })} 
        />
        {/* <TextField 
        sx={{ my: 1 }} 
        id="outlined-basic" 
        label="Email" 
        variant="outlined" 
        name="email" 
        value={userData.email} 
        onChange={(e) => setUserData({ ...userData, email: e.target.value })} 
         /> */}
          <EmailField
           value={email}
           onChange={(e)=>setEmail(e.target.value)} 
          onBlur={(e, error) =>
            setError((state) => ({ ...state, mail: error }))}
        ></EmailField>
          <PasswordInput 
        value={pswd}
         onChange={(e)=>setPswd(e.target.value)} 
        onBlur={(e, error) =>
          setError((state) => ({ ...state, pwd: error }))}
        />
        
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
