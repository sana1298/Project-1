import React, { useEffect, useState } from 'react';
import { Box, Grid, AppBar, Toolbar, Typography, InputBase, Button, Card,CardMedia } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { Navigate } from "react-router-dom";

// import { useNavigate } from 'react-router-dom';

// import MenuIcon from '@mui/icons-material/Menu';
// import SearchIcon from '@mui/icons-material/Search';

import axios from 'axios';



const Home = () => {
  const [datas, setDatas] = useState([])
  const [searchValues, setSearchValues] = useState('')
  // const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('LoggedIn') === 'true');

  const filteredItem = searchValues ? datas.filter(item =>
    item.title.toLowerCase().includes(searchValues.toLowerCase())
  ) : datas;

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));


  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const handleLogout = () => {
    localStorage.setItem("LoggedIn", false)
    setLoggedIn(false);

  }

  useEffect(() => {
    if (loggedIn) {
      axios.get('https://api.jikan.moe/v4/anime')
        .then(response => {
          setDatas(response.data.data);
          console.log(response.data.data);
        })
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              ANIMIENTATION
            </Typography>
            <Search>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={searchValues}
                onChange={(e) => setSearchValues(e.target.value)}
              />
            </Search>
            <Button sx={{marginleft:5}} variant="contained" onClick={handleLogout}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Card>
      <Grid container spacing={3}>
        {filteredItem.map((item, index) => (
          <Box key={index} 
          sx={{
            width: 240
          }}
            my={5}
            mx={4}>
            {/* <img src={item.images.jpg.image_url} alt='anime' /> */}
            <CardMedia
                component="img"
                height="400"
                image={item.images.jpg.image_url}
                alt="anime"
              />
            <Typography>Title:{item.title}</Typography>
            <Typography>Episodes:{item.episodes}</Typography>
            <Typography>Rating:{item.score}</Typography>
          </Box>
        ))}
      </Grid>
      </Card>
    </>
  )
}

export default Home