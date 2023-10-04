import { Box, Card, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AnimeDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [id]);
  return (
  <>
    <Typography variant="h4" sx={{
        color: '#cc600e'
    }}>AnimeDetails</Typography>
    <Box sx={{ 
        backgroundColor: "#c1dbd3",
        padding:'20px',
         }}>
      
      <Box>
        
        <Box sx={{ display: "flex" }}>
          <Box sx={{ 
            
            width:'500px'
             }}>
                <Typography variant="h5"><strong style={{color:'darkblue'}}>Title:</strong>{data.title}</Typography>
            <Card>
              {data.images && data.images.jpg && data.images.jpg.image_url ? (
                <CardMedia
                  component="img"
                  sx={{ width: 300, height: 350 }}
                  image={data.images.jpg.image_url}
                  alt={data.title}
                />
              ) : (
                <Typography>No Image Available</Typography>
              )}
            </Card>
          </Box>
          <Box sx={{
            textAlign:'left'
          }}
          ml={10}
          >
            <Typography><strong style={{color:'darkblue'}}>Episodes:</strong>{data.episodes}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Score:</strong>{data.score}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Type:</strong>{data.type}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Year:</strong>{data.year}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Duration:</strong>{data.duration}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Source:</strong>{data.source}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Description:</strong>{data.synopsis}</Typography>
          </Box>
        </Box>
        {/* <Typography>Day:{data.boardcast.day}</Typography> */}
        {/* <Typography>{data.genres[0].name}</Typography> */}
      </Box>
    </Box>
    </>
  );
};

export default AnimeDetails;
