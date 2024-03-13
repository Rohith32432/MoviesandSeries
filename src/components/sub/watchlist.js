import React, { useState, useEffect } from 'react';
import { UserGlobal } from '../../context/UserContext';

function Watchlist() {
    const { watchlist } = UserGlobal();
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const arr = JSON.parse(localStorage.getItem('watchlist'));
            if (arr) {
                try {
                    const movieDetails = await Promise.all(
                        arr.map(async id => {
                            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}`);
                            const data = await response.json();
                            return { name: data.title, pic: data.poster_path };
                        })
                    );
                    setMovies(movieDetails);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            }
        }

       
            fetchMovies();
    }, [watchlist]);

    return (
        <div>
            {(
                movies.map((movie, i) => (
                 <div key={i}>
                     <h1 >{movie.name}</h1>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.pic}`} height={150} alt="" />
                 </div>
                ))
            )}
        </div>
    );
}

export default Watchlist;
