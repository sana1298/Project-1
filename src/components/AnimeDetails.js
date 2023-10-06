import { Box, Card, CardMedia, CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AnimeDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const[error,setError] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((response) => {
        setData(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      // .catch((error) => console.error("Error fetching products:", error));
      .catch((error) => setError(error.message));
  }, [id]);
  return (
  <>
  {loading ?(
                  <Box
                  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
                   >
                <CircularProgress />
              </Box>):('')}
    <Typography variant="h3" sx={{
        color: '#de0e07'
    }}>AnimeDetails</Typography>
            <Typography variant="h6">{error}</Typography>
    <Box sx={{ 
        backgroundColor: "#c1dbd3",
        padding:'20px',
         }}>
      
      <Box>
        
        <Box sx={{ display: "flex" }}>
          <Box sx={{ 
            
            width:'500px'
             }}>
                <Typography variant="h6"><strong style={{color:'darkblue'}}>Title:</strong>{data.title}</Typography>
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
            <Typography><strong style={{color:'darkblue'}}>Episodes:</strong>{data.episodes?data.episodes:''}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Score:</strong>{data.score?data.score:''}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Type:</strong>{data.type?data.type:''}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Year:</strong>{data.year?data.year:''}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Duration:</strong>{data.duration?data.duration:''}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Source:</strong>{data.source?data.source:''}</Typography>
            <Typography><strong style={{color:'darkblue'}}>Description:</strong>{data.synopsis?data.synopsis:''}</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
};

export default AnimeDetails;
