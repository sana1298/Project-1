import { FormControl, FormHelperText, TextField } from '@mui/material'
import React, { useState } from 'react'

let errMsgs = {
    emptyField: "Please fill Email",
    wrongEmail:
      "Enter Validate Email",
  };
const emailValidation = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

const EmailField = (props) => {
  const[mail,setMail]=useState('')
  const [error, setError] = useState(false);

  function handleBlur(e) {
    const { value } = e.target;
    setMail(value);
    const emailRegex = new RegExp(emailValidation);
    setError(!emailRegex.test(value));

    if (props.onBlur) {
      props?.onBlur?.(e, !emailRegex.test(value));
    }
  }

  return (
    <>
    <FormControl 
    variant="outlined" 
    error={error}>
        
    <TextField sx={{ my: 1,width:260  }} id="outlined-basic" label='Email' variant="outlined" name="logEmail"
       error={error}
          {...props}
        onBlur={handleBlur}
        />
         {error && (
        <FormHelperText id="component-error-text">
          {mail ? errMsgs.wrongEmail : errMsgs.emptyField}
        </FormHelperText>
      )}
      </FormControl>
        </>
  )
}

export default EmailField