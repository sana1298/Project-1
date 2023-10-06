import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const Error = () => {
  const navigate=useNavigate()
  const handleClick = () => {
    navigate('/home')
  }
  return (
    <>
      <Box>
        <Typography variant='h4'>Something Went Wrong.... </Typography>
        <Button sx={{ my: 1 }} variant="contained" onClick={handleClick}>
          GoBack
        </Button>
      </Box>
    </>
  )
}

export default Error