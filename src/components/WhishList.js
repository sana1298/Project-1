import React from "react";
import { Box, CardMedia, Typography, Button } from "@mui/material";

const WishList = ({ watchList, removeFromWatchList }) => {
  return (
    <Box
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
              <Typography>Title: {item.title}</Typography>
            </Box>
            <Button onClick={() => removeFromWatchList(item)}>Remove</Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default WishList;
