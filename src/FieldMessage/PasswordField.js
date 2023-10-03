import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";

let errMsgs = {
  emptyField: "Please fill password",
  wrongPwd:
    "Must contain 6 charc, 1 special char, 1 number, 1 small and capital letter",
};
let passwordValidation =/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
function PasswordInput(props) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  function handleBlur(e) {
    const { value } = e.target;
    setValue(value);
    const passwordRegex = new RegExp(passwordValidation);
    setError(!passwordRegex.test(value));

    if (props.onBlur) {
      props?.onBlur?.(e, !passwordRegex.test(value));
    }
  }

  return (
    <FormControl variant="outlined" error={error}>
      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        type={showPassword ? "text" : "password"}
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
        {...props}
        onBlur={handleBlur}
      />
      {error && (
        <FormHelperText id="component-error-text">
          {value ? errMsgs.wrongPwd : errMsgs.emptyField}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default PasswordInput;