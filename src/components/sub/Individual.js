import React, { useEffect, useState } from 'react';
import { Button, Image, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Search from './search';
import { UserGlobal } from '../../context/UserContext';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Individual() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [cast, setCast] = useState([]);
  const [celbname, setcelbsname] = useState('')
  const [show, setShow] = useState(false);
  const { watchlist, setwatchlist } = UserGlobal()

  async function getcelebs(id) {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`);
    const res = await data.json();
    const firstTenCast = res.cast.slice(0, 10);
    const crew = filterAndSortCrew(res);
    const combinedCast = [
      ...(firstTenCast || []),
      ...(crew.Directing || []),
      ...(crew.Sound || []),
      ...(crew.Visual_Effects || []),
      ...(crew.Editing || []),
      ...(crew.Art || [])
    ];
    setCast(combinedCast);
  }



  function filterAndSortCrew(res) {
    const x = res.crew.filter((e) => {
      return (
        e.known_for_department === 'Directing' ||
        e.known_for_department === 'Sound' ||
        e.known_for_department === 'Visual Effects' ||
        e.known_for_department === 'Editing' ||
        e.known_for_department === 'Art'
      );
    });
    const xy = x.filter((e, i, arr) => {
      if (e.known_for_department === 'Directing') {
        return arr.findIndex(item => item.name === e.name) === i;
      }
      return false;
    });

    console.log(xy);
    const yz = x.filter((e) => {
      return e.known_for_department === 'Sound';
    }).sort((a, b) => {
      return b.popularity - a.popularity;
    });

    const zx = x.filter((e) => {
      return e.known_for_department === 'Visual Effects';
    }).sort((a, b) => {
      return b.popularity - a.popularity;
    });

    const xnx = x.filter((e) => {
      return e.known_for_department === 'Editing';
    }).sort((a, b) => {
      return b.popularity - a.popularity;
    });

    const xyz = x.filter((e) => {
      return e.known_for_department === 'Art';
    }).sort((a, b) => {
      return b.popularity - a.popularity;
    });

    const filteredAndSorted = {
      Directing: xy.length > 0 && xy.length > 2 ? xy.slice(0, 3) : xy,
      Sound: yz.length > 0 && yz.length > 2 ? yz.slice(0, 3) : yz,
      Visual_Effects: zx.length > 0 && zx.length > 2 ? zx.slice(0, 3) : zx,
      Editing: xnx.length > 0 && xnx.length > 2 ? xnx.slice(0, 3) : xnx,
      Art: xyz.length > 0 && xyz.length > 2 ? xyz.slice(0, 3) : xyz,
    };

    return filteredAndSorted;
  }


  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_APIKEY}&append_to_response=images,videos`);
      const result = await response.json();
      setPoster(result);
      if (result.videos && result.videos.results) {
        let trailers = result.videos.results.filter(video => video.name.includes("Official Trailer"));
        let logo = result.images.logos.filter(itm =>
          itm.iso_639_1 === "en"
        );

        setPoster(prevState => ({ ...prevState, videos: trailers[trailers.length - 1], images: { logos: logo } }));
      }
    }

    fetchData();
    getcelebs(id);

  }, [id]);

  const handlecast = (e) => {

    setShow(true)
    setcelbsname(e.name)
  }
  const [arr, setarr] = useState([]);


  useEffect(() => {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      setarr(JSON.parse(storedWatchlist));
    }
  }, [ ]);

  function addwatchlist() {
    setwatchlist([...watchlist, poster])
    setarr(prevArr => {
      if (prevArr.includes(poster.id)) {
        return prevArr;
      } else {
        const updatedArr = [...prevArr, poster.id];
        localStorage.setItem('watchlist', JSON.stringify(updatedArr));
        return updatedArr;
      }
    });
    toast.success('Added to watch-List', {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme:'dark',
      transition: Bounce,
      });
  }


  console.log(poster);
  return (
    <div>
      {poster ? (
        <div className='d-flex  justify-content-end w-100' >
          <div className="top position-relative " style={{ width: '90%' }} >
            <div className="hero-section d-flex  flex-lg-row flex-sm-column justify-content-lg-around justify-content-sm-center m-5 align-items-lg-center">

             <div className="details d-flex flex-column align-items-start p-5 w-50  gap-1">

                {
                  poster.images.logos[0] ?
                    <img src={`https://image.tmdb.org/t/p/w500/${poster.images.logos[0].file_path}`}  style={{ marginBottom: 50}} alt="" /> :
                    <h1>{poster.title}</h1>
                }
                <p style={{ textAlign: 'start' }}>{poster.overview}</p>
                <h3 >Rating : {poster.vote_average}/10</h3>
                <h5>Relase Date : {poster.release_date}</h5>
                <div className='d-flex w-100 gap-5 my-3'>
                  <a href={poster.videos ? `https://www.youtube.com/watch?v=${poster.videos.key}` : "#"}  className='flex-grow-1'>
                    <Button variant='danger' className='w-100 p-2'>Watch Trailer</Button>
                  </a>
                  <Button variant='danger' onClick={addwatchlist} style={{ width: 'auto' }}>Add to Watchlist</Button> 
                </div>
                <ToastContainer />

              </div>

              <img src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`}   style={{ borderRadius: 10}}  height={650} alt="" />


            </div>

            <div className='d-flex flex-wrap gap-2' >
              {cast.map((e, i) => (
                <div style={{width:150,cursor:'pointer'}} key={i} onClick={() => { handlecast(e) }}>

                  <Image src={e.profile_path ? `https://image.tmdb.org/t/p/w400/${e.profile_path}` : "../default.png"} height={120} width={120} style={{ borderRadius:10, objectFit: 'cover' }} />
                  <li>{e.name}</li>
                  <li>{e.known_for_department}</li>

                </div>
              ))}
            </div>

          </div>
        </div>
      ) : (
        <Spinner animation="border" />
      )}
      <Search show={show} setShow={setShow} name={celbname} />
    </div>
  );
}

export default Individual;
