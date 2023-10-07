import React, { useEffect, useReducer, useState } from "react";
import {
  Box,
  // Grid,
  AppBar,
  Toolbar,
  Typography,
  // InputBase,
  Button,
  // Card,
  CardMedia,
  IconButton,
  TextField,
  Autocomplete,
  CircularProgress,
  Stack,
  Pagination,
  Skeleton,
} from "@mui/material";
import {
  Link,
  Navigate,
  //  useNavigate
} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

const Home = () => {
  const [datas, setDatas] = useState([]);
  const [searchValues, setSearchValues] = useState("");
  const [values, setValues] = useState([]);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(true);
  const [load, setLoad] = useState(true);
  const [pageSearch, setPageSearch] = useState(1);
  const [searchCount, setSearchCount] = useState("");

  // const navigate = useNavigate();
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
    // dispatchWatchList({ type: "ADD_TO_WATCH_LIST", payload: item });
    e.preventDefault();
    if (isInWatchList(item)) {
      dispatchWatchList({ type: "REMOVE_FROM_WATCH_LIST", payload: item });
    } else {
      dispatchWatchList({ type: "ADD_TO_WATCH_LIST", payload: item });
    }
  };

  const handleChange = (e, value) => {
    setSearchValues(e.target.value);
    console.log(value);
  };
  const handlePageChange = (e, item) => {
    console.log(item.page);
    setPageSearch(item);
  };

  useEffect(() => {
    let timer = setTimeout(() => {
      axios
        .get(`https://api.jikan.moe/v4/anime?q=${searchValues}`)
        .then((response) => {
          setValues(response.data.data);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValues]);

  useEffect(() => {
    if (loggedIn) {
      axios
        .get(`https://api.jikan.moe/v4/anime?page=${pageSearch}`)
        .then((response) => {
          setDatas(response.data.data);
          // setPageSearch(response.data.pagination)
          setSearchCount(response.data.pagination);
          console.log(response.data.data);
          setLoading(false);
          setLoad(false);
        })
        // .catch((error) => console.error("Error fetching products:", error.message));
        .catch((error) => setError(error.message));
    }
  }, [loggedIn, pageSearch]);

  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  // const handleCardClick = (e, item) => {
  //   navigate(`anime/${item.mal_id}`);
  // };
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
                ANIMATION
              </Typography>

              <Autocomplete
                sx={{
                  width: 250,
                  border: "1px solid blue",
                }}
                freeSolo
                id="free-solo-2-demo"
                // key={id}
                disableClearable
                options={values}
                // options={searchFilter}
                getOptionLabel={(option) => option.title}
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
        {load ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          ""
        )}
        <Box sx={{ display: "flex" }}>
          <Box>
            <Typography variant="h6">Movie List</Typography>
            <Typography variant="h6">{error}</Typography>
            <Box>
              {loading ? (
                <Box
                  sx={{
                    width: 450,
                    // display: "flex",
                    border: "1px solid black",
                    borderRadius: "5px",
                    height: 500,
                    mt: 5,
                    ml: 5,
                  }}
                >
                  <MyLoad />
                  <MyLoad sx={{ marginTop: 5 }} />
                  <MyLoad />
                  {/* <Stack spacing={1}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 450,
                        display: "flex",
                        border: "1px solid black",
                        borderRadius: "5px", 
                        height: 100,
                        mt: 5,
                        ml: 5,
                      }}
                      animation="wave"
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 450,
                        display: "flex",
                        border: "1px solid black",
                        borderRadius: "5px",
                        height: 100,
                        mt: 5,
                        ml: 5,
                      }}
                      animation="wave"
                    />
                  </Stack>
                  <Stack spacing={1}>
                    <Skeleton
                      variant="rectangular"
                      sx={{
                        width: 450,
                        display: "flex",
                        border: "1px solid black",
                        borderRadius: "5px",
                        height: 100,
                        mt: 5,
                        ml: 5,
                      }}
                      animation="wave"
                    />
                  </Stack> */}
                </Box>
              ) : (
                <Box
                  sx={{
                    height: 500,
                    overflowY: "scroll",
                  }}
                >
                  {filteredItem.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        width: 450,
                        // backgroundColor: "blue",
                        display: "flex",
                        border: "1px solid black",
                        borderRadius: "5px",
                        mt: 5,
                        ml: 5,
                      }}
                      // onClick={(e) => handleCardClick(e, item)}
                      onDoubleClick={(e) => handleDoubleClick(e, item)}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData(
                          "application/json",
                          JSON.stringify(item)
                        );
                      }}
                    >
                      {/* {loading ? (
                <Box
                  sx={{
                    width: 450,
                    // display: "flex",
                    border: "1px solid black",
                    borderRadius: "5px",
                    height: 500,
                    mt: 5,
                    ml: 5,
                  }}
                ><MyLoad /> */}
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
                        <Box>
                          {isInWatchList(item) ? (
                            <StarIcon sx={{ cursor: "pointer" }}></StarIcon>
                          ) : (
                            <StarBorderIcon
                              sx={{ cursor: "pointer" }}
                              onDoubleClick={(e) => handleDoubleClick(e, item)}
                            ></StarBorderIcon>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}

              <Stack spacing={2}>
                <Typography>Page: {pageSearch}</Typography>
                <Pagination
                  count={searchCount.last_visible_page}
                  page={pageSearch}
                  onChange={handlePageChange}
                />
              </Stack>
            </Box>
          </Box>

          <Box
            sx={{
              width: "600px",
              height: "500px",
              marginLeft: "60px",
            }}
          >
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
              sx={{
                border: "1px solid #ccc",
                padding: "10px",
                minHeight: "100px",
                marginTop: "10px",
              }}
            >
              {watchList.map((item, index) => (
                <Box
                  key={index}
                  sx={{
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
    </>
  );
};

export default Home;

function MyLoad() {
  return (
    <>
      <Stack spacing={1}>
        <Skeleton
          variant="rectangular"
          sx={{
            width: 450,
            display: "flex",
            border: "1px solid black",
            borderRadius: "5px",
            height: 100,
            // mt: 5,
            // ml: 5,
          }}
          animation="wave"
        />
      </Stack>
    </>
  );
}
