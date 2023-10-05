import React, { useState } from 'react'
import { Box,
  Button, 
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import PasswordInput from '../FieldMessage/PasswordField';
import EmailField from '../FieldMessage/EmailField';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const LoginForm = () => {
  const[email,setEmail]=useState('')
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const [pswd, setPswd] = useState()
  const [error, setError] = useState({
    pwd:false,
    // mail:false,
  })
  const [errors, setErrors] = useState(false)


  const handleLogin = () => {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    console.log(data,"rtyuiop")
    console.log(email,pswd,"emai,password")
    const logindetails = data.find((user) => {
      return user.email === email && user.password === pswd;
    });

   console.log(logindetails,"login")
    if (logindetails) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/home');
      }, 3000);
      localStorage.setItem('LoggedIn', true);
    } else {
      setError(true);

    }
    if(email==='' && pswd==='') {
      setErrors(true)
    }
    setEmail('')
    setPswd('')
  };

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    setErrors(false)
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
        <Button sx={{ my: 1 }} variant="contained" onClick={handleLogin}>Login</Button>
        <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Successfully LoggedIn!
          </Alert>
        </Snackbar>
        <Snackbar open={errors} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
           LoggedIn Failed!
          </Alert>
        </Snackbar>
        <Typography variant='h6'>Don't have an account?<Link to='/register'>Register</Link></Typography>
      </Box>
    </>
  )
}

export default LoginForm