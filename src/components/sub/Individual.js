import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

function Individual() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null); 

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=images,videos`);
      const result = await response.json();
      setPoster(result);
      if (result.videos && result.videos.results) {
        let trailers = result.videos.results.filter(video => video.name.includes("Official Trailer"));
     setPoster(prevState => ({ ...prevState, videos: trailers[trailers.length-1] }));
      }
    }
    fetchData();
}, [id]);


  return (
    <div>
      {poster ? ( 
        <div className="top">
          <h1>{poster.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`} height={550} alt="" />
          <h3>{poster.release_date}</h3>
          <h3>{poster.vote_average}</h3>
          <a href={`https://www.youtube.com/watch?v=${poster.videos.key}`} target='_blank'><Button>click</Button></a>
        </div>

      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}

export default Individual;
