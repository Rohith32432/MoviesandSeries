import React, { useEffect, useState } from 'react';
import Model from '../model';
import Pagination from 'react-bootstrap/Pagination';
function SeriesList({ data }) {
    const [SeriesList, setSeriesList] = useState([]);
    const [count, setcount] = useState(1)
    function handleHover(id) {
        if (SeriesList[id]) {
            data(SeriesList[id]);
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(`
                https://api.themoviedb.org/3/tv/popular?page=${count}&adult=false&sort_by=popularity.desc&api_key=${process.env.REACT_APP_APIKEY}`);
                const result = await response.json();
                setSeriesList(result.results);
                console.log(SeriesList);
                if (result.results.length > 0) {
                    data(result.results[0]);
                }
            } catch (error) {
                console.error('Error fetching SeriesList:', error);
            }
        }
        fetchData();
    }, [count]);
    
    const [show, setShow] = useState(false);
    const [modeldata, setmodeldata] = useState({})
    const handlemodel = (id) => {
        setShow(true)
        setmodeldata(SeriesList[id])
    }
    return (
        <>
            <Model show={show} setShow={setShow} data={modeldata} />
            <h1>SeriesList List</h1>
            <div className="d-flex m-2 " style={{ flexWrap: 'wrap'}}>
                {SeriesList &&
                    SeriesList.map((movie, i) => (
                        <div key={i} className="component m-2" onMouseOver={() => handleHover(i)} onClick={() => handlemodel(i)}>
                            {movie.backdrop_path && <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.original_title} height={300} />}
                            {/* <h4>{movie.original_title}</h4> */}
                        </div>
                    ))}
            </div>

            <Pagination className='pagination-dark'>
                <Pagination.First onClick={() => { setcount(1) }} />
                <Pagination.Prev onClick={() => { setcount(count - 1) }} />
                {
                    Array(5).fill().map((e, i) => (
                        <Pagination.Item onClick={() => { setcount(i + 1) }} key={i}  >{i + 1}</Pagination.Item>
                    ))
                }

                <Pagination.Ellipsis />


                <Pagination.Next onClick={() => { setcount(count + 1) }} />
                <Pagination.Last />
            </Pagination>
        </>
    );
}

export default SeriesList;
