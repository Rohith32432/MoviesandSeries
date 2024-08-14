import React, { useEffect, useState } from 'react';
import Model from './model';
import Pagination from 'react-bootstrap/Pagination';
import { MdMovieCreation } from "react-icons/md";
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
function Movies() {
    const [movies, setMovies] = useState([]);
    const [count, setcount] = useState(1)
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${count}&sort_by=popularity.desc&api_key=${process.env.REACT_APP_APIKEY}`);
                const result = await response.json();
                setMovies(result.results);
              
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        }
        fetchData();
    }, [count]);

    const [show, setShow] = useState(false);
    const [modeldata, setmodeldata] = useState({})
    const handlemodel = (id) => {
        setShow(true)
        setmodeldata(movies[id])
    }
    const tooltip =(name)=>{
        return (
            <Tooltip id="button-tooltip "  >
      <div className='p-1'>{name}</div>
    </Tooltip>
        )
    }
    return (
        <>
            <Model show={show} setShow={setShow} data={modeldata} />

            <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between m-2 mx-5">

            <h1>Movies List  <MdMovieCreation  style={{marginBottom:4}}/></h1>
            <div >

            <Pagination className='m-0 ' >
                <Pagination.First  linkClassName='bg-dark text-white' onClick={() => { setcount(1) }} />
                <Pagination.Prev  linkClassName='bg-dark text-white' onClick={() => { setcount( 1) }} />
                {
                    Array(5).fill().map((e, i) => (
                        <Pagination.Item linkClassName='bg-dark text-white' onClick={() => { setcount(i + 1) }} key={i}  >{i + 1}</Pagination.Item>
                    ))
                }
                <Pagination.Ellipsis linkClassName='bg-dark text-white' />
                <Pagination.Next linkClassName='bg-dark text-white ' onClick={() => { setcount(count + 1) }} />
                <Pagination.Last linkClassName='bg-dark text-white' onClick={()=>{setcount(10)}} />
            </Pagination>
            </div>

            </div>
            <div className="d-flex m-2 justify-content-center " style={{ flexWrap: 'wrap' }}>
            {movies ?
    movies.map((movie, i) => (
        <div key={i} className=" m-2" id='cardx' onClick={() => handlemodel(i)}>
            {movie.backdrop_path ? (
                <OverlayTrigger placement="bottom" overlay={tooltip(movie.title) }>
                    {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} height={300} />}
                </OverlayTrigger>
            ) : (
                movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} height={300} />
            )}
        </div>
    ))
    :
    <Spinner/>
}

</div>


           
        </>
    );
}

export default Movies;
