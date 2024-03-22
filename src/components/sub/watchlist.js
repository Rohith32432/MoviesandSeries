import React, { useState, useEffect } from 'react';
import { UserGlobal } from '../../context/UserContext';
import { Link } from 'react-router-dom';

function Watchlist() {
    const { watchlist } = UserGlobal();
    const [movies, setMovies] = useState([]);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        async function fetchMovies() {
            const storedArr = JSON.parse(localStorage.getItem('watchlist'));
            setArr(storedArr); 
            if (storedArr && storedArr.length > 0) {
                try {
                    const movieDetails = await Promise.all(
                        storedArr.map(async id => {
                            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}`);
                            const data = await response.json();
                            return {id:data.id, name: data.title, pic: data.poster_path };
                        })
                    );
                    setMovies(movieDetails);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            } else {
                setMovies([]);
            }
        }

        fetchMovies();
    }, [watchlist]);

    function handleRemoveMovie(id) {
        setMovies(movies.filter((e, index) => index !== id))
        const updatedArr = arr.filter((e, index) => index !== id);
        setArr(updatedArr);
        localStorage.setItem('watchlist', JSON.stringify(updatedArr)); 
    }

    return (
        <div className='d-flex justify-content-end align-items-center' style={{ height: '100vh' }}>
            <div className="watchlist d-flex gap-2 flex-wrap " style={{ width: '80%' }}>
               
                {
                    movies.length===0?
                    <h1>NOTHING THERE</h1>
                    :
                movies.map((movie, i) => (
                    <div className="movie-item card position-relative bg-dark text-light p-2" key={i}>
                        <button type="button" className="btn-close position-absolute top-0 end-0 mt-2 me-2 p-2 bg-light" aria-label="Close" onClick={() => handleRemoveMovie(i)}></button>
                       
                       <Link to={`/watch/${movie.id}`}> 
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.pic}`} alt={movie.name} height={300} className="card-img-top" />
                        </Link>
                        <div className="card-body">
                            <h5 className="card-title ">{movie.name}</h5>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Watchlist;
