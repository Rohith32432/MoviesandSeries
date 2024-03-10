import React, { useEffect, useState } from 'react';
import Model from './model';

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
    const [show, setShow] = useState(false);
    const[modeldata,setmodeldata]=useState({})
    const handlemodel=(id)=>{
        setShow(true)
        setmodeldata(movies[id])
    }
    return (
        <>
            <Model show={show } setShow={setShow} data={modeldata}/>
            <h1>Movies List</h1>
            <div className="d-flex m-2" style={{ overflowX: 'scroll' }}>
                {movies &&
                    movies.map((movie, i) => (
                        <div key={i} className="component mx-2" onMouseOver={() => handleHover(i)} onClick={()=>handlemodel(i)}>
                            {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} />}
                            <h4>{movie.original_title}</h4>
                        </div>
                    ))}
            </div>
        </>
    );
}

export default Movies;
