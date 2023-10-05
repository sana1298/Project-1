import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  // InputBase,
  Button,
  Card,
  CardMedia,
  IconButton,
  TextField,
  Autocomplete,
} from "@mui/material";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [searchValues, setSearchValues] = useState("");
  const [values, setValues] = useState([]);


  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("LoggedIn") === "true"
  );

  const watchListReducer = (state, action) => {
    switch (action.type) {
      case "ADD_TO_WATCH_LIST":
        if (!state.find((item) => item.title === action.payload.title)) {
          return [...state, action.payload];
        }
        return state;
      case "REMOVE_FROM_WATCH_LIST":
        return state.filter((item) => item !== action.payload);
      default:
        return state;
    }
  };

  const [watchList, dispatchWatchList] = useReducer(watchListReducer, []);

  const filteredItem = searchValues
    ? datas.filter((item) =>
        item.title.toLowerCase().includes(searchValues.toLowerCase())
      )
    : datas;

  const isInWatchList = (item) => {
    return watchList.some((watchedItem) => watchedItem.title === item.title);
  };

  const handleLogout = () => {
    localStorage.setItem("LoggedIn", false);
    setLoggedIn(false);
  };
  const handleDoubleClick = (e, item) => {
    dispatchWatchList({ type: "ADD_TO_WATCH_LIST", payload: item });
  };

  const handleChange = (e, value) => {
    setSearchValues(e.target.value);
    console.log(value);
  };

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime?s=${searchValues}`)
      .then((response) => {
        setValues(response.data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [searchValues]);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get("https://api.jikan.moe/v4/anime")
        .then((response) => {
          setDatas(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }
  
  const handleCardClick=(item) => {
    // console.log('ertyuiop')
    // <Navigate to={}/>
    navigate(`anime/${item.mal_id}`)
    
  }
  return (
    <>
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              >
                ANIMIENTATION
              </Typography>

              <Autocomplete
                sx={{
                  width: 250,
                  border: "1px solid blue",
                }}
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                // value={searchValues}
                // onChange={(e)=>setSearchValues(e.target.value)}

                options={values}
                // options={searchFilter}
                getOptionLabel={(option) => option.title}
                // key={option.mal_id}
                onInputChange={handleChange}
                renderOption={(props, option) => (
                  <Link
                    to={`anime/${option.mal_id}`}
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      <CardMedia
                        component="img"
                        sx={{ width: 50, height: 50 }}
                        image={option.images.jpg.small_image_url}
                        alt="anime"
                      />
                      {option.title}
                    </Box>
                  </Link>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search Here..."
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "new-password",
                    }}
                  />
                )}
              />
              <Button
                sx={{ marginleft: 5 }}
                variant="contained"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Card>
            {/* <Grid
            // container spacing={1}
            > */}
            <Typography variant="h6">Movie List</Typography>
            {filteredItem.map((item, index) => (
              <Box
                key={index}
                sx={{
                  width: 450,
                  display: "flex",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                my={5}
                mx={4}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData(
                    "application/json",
                    JSON.stringify(item)
                  );
                }}
              >
                <Box>
                  <CardMedia
                    component="img"
                    height="100"
                    image={item.images.jpg.image_url}
                    alt="anime"
                  />
                </Box>
                <Box
                  sx={{
                    marginLeft: 5,
                    marginTop: 5,
                  }}
                >
                  <Typography>Title:{item.title}</Typography>
                  {isInWatchList(item) ? (
                    <StarIcon></StarIcon>
                  ) : (
                    <StarBorderIcon
                      onDoubleClick={(e) => handleDoubleClick(e, item)}
                    ></StarBorderIcon>
                  )}
                </Box>
              </Box>
            ))}
            {/* </Grid> */}
          </Card>

          <Box>
            <Typography variant="h6">Watch List</Typography>
            <Box
              onDrop={(e) => {
                e.preventDefault();
                const item = JSON.parse(
                  e.dataTransfer.getData("application/json")
                );
                dispatchWatchList({ type: "ADD_TO_WATCH_LIST", payload: item });
              }}
              onDragOver={(e) => e.preventDefault()}
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                minHeight: "100px",
                marginTop: "10px",
              }}
            >
              {watchList.map((item, index) => (
                <Box
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "5px",
                  }}
                >
                  <Box
                    sx={{
                      width: 400,
                      display: "flex",
                    }}
                  >
                    <Box>
                      <CardMedia
                        component="img"
                        height="100"
                        image={item.images.jpg.image_url}
                        alt="anime"
                      />
                    </Box>
                    <Box>
                      <Typography>Title:{item.title}</Typography>
                    </Box>
                    <Button
                      onClick={() =>
                        dispatchWatchList({
                          type: "REMOVE_FROM_WATCH_LIST",
                          payload: item,
                        })
                      }
                    >
                      Remove
                    </Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Card>
        <Grid
        container spacing={3}
        >
          <Typography variant="h6">Movie List</Typography>
          {datas.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: 450,
                height: 400,
                display: "flex",
                border: "1px solid black",
                borderRadius: "5px",
              }}
              my={5}
              mx={4}
              onClick={()=>handleCardClick(item)}
            >
              <Box>
                <CardMedia
                  component="img"
                  height="100"
                  image={item.images.jpg.image_url}
                  alt="anime"
                />
                {/* <Link to={`anime/${item.mal_id}`}>Details</Link> */}
                  <Typography>Title:{item.title}</Typography>
              </Box>
            </Box>
          ))}
        </Grid>
      </Card>
      <Box></Box>
    </>
  );
};

export default Home;
