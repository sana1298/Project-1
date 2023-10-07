import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PasswordInput from "../FieldMessage/PasswordField";
import EmailField from "../FieldMessage/EmailField";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const nameRegex = /^[A-Za-z\s]+$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const passwordRegex =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const alertMsg = {
  error: {
    msg: "Please Register!",
    severity:"error",
    key:'error'
  },
  empty: {
    msg: "Please Enter Details!",
    severity:"error",
    key:"empty"
  },
  success: {
    msg: "Logged in successfully!",
    severity:"success",
    key:"success"
  },
};

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [error, setError] = useState({
    pwd: false,
    mail: false,
    name: "Enter Your Name",
  });
  // const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  // const [errors, setErrors] = useState(false)
  const [errorType,setErrorType]= useState("");


  const handleClick = (e) => {
    e.preventDefault();
    if(email==='' && pswd==='' && userName==='') {
      // setErrors(true)
      setErrorType(alertMsg.empty.key)
      // setErrorType("error")
    }
    if (
      !nameRegex.test(userName) ||
      !emailRegex.test(email) ||
      !passwordRegex.test(pswd)
    ) 
    {
      // setErrorType("error")
      // setErrorType(alertMsg.empty.key)

      setError(true);
    } 
    else {
      const userDetails = {
        userName: userName,
        email: email,
        password: pswd,
      };
      const existingData = JSON.parse(localStorage.getItem("data")) || [];
      existingData.push(userDetails);
      localStorage.setItem("data", JSON.stringify(existingData));
      // setSuccess(true);
      setErrorType(alertMsg.success.key);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      setUserName("");
      setEmail("");
      setPswd("");
      setError({ pwd: false, mail: false, name: error.name });
    }
  };
  // setEmail("");
  // setPswd("");
  // setUserName("");
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    // setSuccess(false);
    // setErrors(false)
    setErrorType("")
  };
  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 400,
          backgroundColor: "#b7c6e8",
          mt: 10,
          mx: 60,
          p: 2,
        }}
      >
        <Typography variant="h5">Register</Typography>
        <TextField
          sx={{ my: 1 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onBlur={(e, error) =>
            setError((state) => ({ ...state, name: 'Enter Your Name' }))
          }
        />
        <EmailField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e, error) =>
            setError((state) => ({ ...state, mail: error }))
          }
        ></EmailField>
        <PasswordInput
          value={pswd}
          onChange={(e) => setPswd(e.target.value)}
          onBlur={(e, error) => setError((state) => ({ ...state, pwd: error }))}
        />
        <Button sx={{ my: 1 }} variant="contained" onClick={handleClick}>
          Register
        </Button>
        <MyAlert
          open={errorType}
          onClose={handleClose}
          msg={alertMsg[errorType]?.msg}
          severity={alertMsg[errorType]?.severity}
        />
        {/* <Snackbar open={success} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Registered!
          </Alert>
        </Snackbar>
        <Snackbar open={errors} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
           Register Failed!
          </Alert>
        </Snackbar> */}
        <Typography variant="h6">
          Already have an account?<Link to="/">Login</Link>
        </Typography>
      </Box>
    </>
  );
};

export default RegisterForm;


function MyAlert({ msg, onClose, open, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
