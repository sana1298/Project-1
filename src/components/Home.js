import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  // Grid,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  Card,
  CardMedia,
  IconButton,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [searchValues, setSearchValues] = useState("");
  // const navigate = useNavigate()
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

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  const handleLogout = () => {
    localStorage.setItem("LoggedIn", false);
    setLoggedIn(false);
  };

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
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  value={searchValues}
                  onChange={(e) => setSearchValues(e.target.value)}
                />
              </Search>
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
        <Box sx={{display:'flex'}} >
          <Card>
            {/* <Grid
            // container spacing={1}
            > */}
              {filteredItem.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 240,
                    display: 'flex',
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
                  <CardMedia
                    component="img"
                    height="100"
                    image={item.images.jpg.image_url}
                    alt="anime"
                  />
                  <Typography>Title:{item.title}</Typography>
                  <Typography>Episodes:{item.episodes}</Typography>
                  <Typography>Rating:{item.score}</Typography>
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
                  <Box sx={{
                    width: 240,
                    display: 'flex',
                  }} >
                    <CardMedia
                      component="img"
                      height="100"
                      image={item.images.jpg.image_url}
                      alt="anime"
                    />
                    <Typography>Title:{item.title}</Typography>
                    <Typography>Episodes:{item.episodes}</Typography>
                    <Typography>Rating:{item.score}</Typography>
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
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
