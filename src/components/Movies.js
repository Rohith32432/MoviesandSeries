import React, { useEffect, useState } from 'react';

function Movies({ data }) {
    const [movies, setMovies] = useState([]);

    function handleHover(id) {
        if (movies[id]) {
            data(movies[id]);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${1}&sort_by=popularity.desc&api_key=${process.env.REACT_APP_APIKEY}`);
                const result = await response.json();
                setMovies(result.results);
                if (result.results.length > 0) {
                    data(result.results[0]);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            <h1>Movies List</h1>
            <div className="d-flex m-2" style={{ overflowX: 'scroll' }}>
                {movies &&
                    movies.map((movie, i) => (
                        <div key={i} className="component mx-2" onMouseOver={() => handleHover(i)}>
                            {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w400/${movie.backdrop_path}`} alt={movie.original_title} />}
                            <h3>{movie.original_title}</h3>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Movies;
