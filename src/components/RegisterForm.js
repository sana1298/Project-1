import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });
  // const [userName, setUserName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  const [success, setSuccess] = useState(false)
  // const [warning, setWarning] = useState(false)
  const navigate = useNavigate()

  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  const handleClick = (e) => {
    e.preventDefault();
    if (!nameRegex.test(formData.userName)) {
      alert('Please enter a valid name');
    } else if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email');
    } else if (!passwordRegex.test(formData.password)) {
      alert('Please enter a strong password - Atleast one capital and small letter,one number,one special character... ');
    } else{
      const userDetails = {
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
      };
    const existingData = JSON.parse(localStorage.getItem("data")) || [];
    existingData.push(userDetails);
    localStorage.setItem("data", JSON.stringify(existingData));
    // alert('successfully Registered')
    setSuccess(true);
    setTimeout(()=>{
      navigate('/')
    },2000)
    // setUserName("");
    // setEmail("");
    // setPassword("");
    setFormData({
      userName: '',
      email: '',
      password: '',
    });
  }
};

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
          mt:10,
          mx:60,
          p:2
        }}
      >
        <Typography variant='h5'>Register</Typography>
        <TextField sx={{my:1}} id="outlined-basic" label="Name" variant="outlined" name="userName"  value={formData.userName}  onChange={(e)=>setFormData({...formData,name:e.target.value})} />
        <TextField sx={{my:1}} id="outlined-basic" label="Email" variant="outlined" name="email" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} />
        <TextField
        sx={{my:1}}
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          name="password"
          value={formData.password}
          onChange={(e)=>setFormData({...formData,password:e.target.value})}
        />
        <Button sx={{my:1}} variant="contained" onClick={handleClick}>Register</Button>
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

export default RegisterForm