import React, { useEffect, useRef, useState } from 'react';
import { Form, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Search({ show, setShow, name }) {
    const handleClose = () => setShow(false);
    const [movies, setMovies] = useState([]);
    const [celebs, setCelebs] = useState([]);
    const fcs=useRef([])
    console.log(fcs);
// if(fcs.current) fcs.current.focus()
    async function searchMovies(e) {
        try {
            let qry = e.target.value;
            const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${qry}&include_adult=false&language=en-US&page=1&api_key=${process.env.REACT_APP_APIKEY}`);
            const response = await data.json();
            setMovies(response.results);
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }
    
    async function searchCelebs(qry) {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/search/person?query=${qry}&include_adult=true&language=en-US&page=1&api_key=${process.env.REACT_APP_APIKEY}`);
            const response = await data.json();
            if (Array.isArray(response.results) && response.results.length > 0) {
                setCelebs(response.results[0]);
            } else {
                setCelebs([]); // If no results, set celebs to an empty array or handle accordingly
            }
        } catch (error) {
            console.error('Error searching celebrities:', error);
        }
    }
    
    useEffect(() => {
        if (name != null) {
            searchCelebs(name);
        }
    }, [name]);

    useEffect(()=>{
        if(fcs[0])
            fcs.current.focus()
    })
    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement='end' className='bg-dark text-light'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Search Movies</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {name == null ?
                        <>
                    
                            
                            <Form.Control  
                                className='bg-dark text-light'
                                onChange={(e) => { searchMovies(e) }}
                                ref={(input) => { fcs.current = input; }}
                              
                            />
                            <div className="d-flex flex-wrap p-2 my-2">
                                {movies.map((movie, index) => (
                                    <div className="m-1" key={index}>
                                        <Link to={`/watch/${movie.id}`}>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} height={210} alt="" />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </> :
                      <>
                      {celebs.name && (
                          <div className="col align-items-start">
                              <div className="col">
                                  <h3>{celebs.name}</h3>
                                  <img src={`https://image.tmdb.org/t/p/w500/${celebs.profile_path}`} className="img-fluid img-thumbnail" alt={celebs.name} style={{ maxWidth: '200px' }} />
                              </div>
                              <div className="col my-3">
                                  <h5>Known For:</h5>
                                  <ul className="list-unstyled">
                                      {celebs.known_for.map((movie, subIndex) => (
                                          <li key={subIndex}>{movie.title}</li>
                                      ))}
                                  </ul>
                              </div>
                          </div>
                      )}
                      {celebs.name === undefined && <p>No celebrities found.</p>}
                  </>
                  
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}

export default Search;
