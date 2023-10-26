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
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

const alertMsg = {
  error: {
    msg: "Please Register!",
    severity: "error",
    key: "error",
  },
  empty: {
    msg: "Please Enter Details!",
    severity: "error",
    key: "empty",
  },
  success: {
    msg: "Registered successfully!",
    severity: "success",
    key: "success",
  },
};

const RegisterForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pswd, setPswd] = useState("");
  const [nameError, setNameError] = useState(false);
  const [error, setError] = useState({
    pwd: false,
    mail: false,
    name:false,
  });
  const navigate = useNavigate();
  const [errorType, setErrorType] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    if (email === "" && pswd === "" && userName === "") {
      setErrorType(alertMsg.empty.key);
    }
    if (
      !nameRegex.test(userName) ||
      !emailRegex.test(email) ||
      !passwordRegex.test(pswd)
    ) {
      setNameError(true);
      setError(true);
    } else {
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
      setNameError(false);
      setError({ pwd: false, mail: false });
    }
  };
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorType("");
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
          sx={{ my: 1, width: 260 }}
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onBlur={() => setNameError((state)=> ({ ...state, name:nameError}))}
          helperText={nameError ? "Please enter a valid name" : ""}
          error={nameError}
        />
        <EmailField
          sx={{ my: 1, width: 260 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={(e, error) =>
            setError((state) => ({ ...state, mail: error }))
          }
        ></EmailField>
        <PasswordInput
          sx={{ my: 1 }}
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
