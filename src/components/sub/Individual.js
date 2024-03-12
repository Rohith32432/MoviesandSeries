import React, { useEffect, useState } from 'react';
import { Button, Image, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Search from './search';

function Individual() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null); 
  const [cast, setCast] = useState([]); 
  const [celbname,setcelbsname]=useState('')
  const [show, setShow] = useState(false);
  async function getcelebs(id) {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US&api_key=${process.env.REACT_APP_APIKEY}`);
    const res = await data.json();
    const firstTenCast = res.cast.slice(0, 10);
    const crew = filterAndSortCrew(res); 
    const combinedCast = [
      ...(crew.Directing || []),
      ...(crew.Sound || []),
      ...(crew.Visual_Effects || []),
      ...(crew.Editing || []),
      ...(crew.Art || []),
      ...(firstTenCast || []) 
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

    const xy = x.filter((e) => {
      return e.known_for_department === 'Directing' ;
    }).sort((a, b) => {
      return b.popularity - a.popularity;
    });

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
      return e.known_for_department === 'Editing' ;
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
        let logo=result.images.logos.filter(itm=>
          itm.iso_639_1==="en"
        );

        setPoster(prevState => ({ ...prevState, videos: trailers[trailers.length-1],images:{logos:logo}}));
      }
    }

    fetchData();
    getcelebs(id);
  }, [id]);
  console.log(poster);
const handlecast=(e)=>{
  console.log(e);
  setShow(true)
  setcelbsname(e.name)
}
  return (
    <div>
      {poster ? ( 
        <div className="top">
          <h1>{poster.title}</h1>
          <img src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`} height={550} alt="" />
          <h3>{poster.release_date}</h3>
          <h3>{poster.vote_average}</h3>
        
          <img src={poster.images.logos[0]?`https://image.tmdb.org/t/p/w500/${ poster.images.logos[0].file_path}`:"" }  alt="" />

          <a href={poster.videos ?`https://www.youtube.com/watch?v=${poster.videos.key}`:"#"} target='_blank'><Button>click</Button></a>
        
          <div className='d-flex flex-wrap gap-3' >
        {cast.map((e,i)=>(
          <div key={i} onClick={()=>{handlecast(e)}}>

            <Image src={e.profile_path?`https://image.tmdb.org/t/p/w400/${e.profile_path}`:"https://wordsinspiration.com/wp-content/uploads/2022/04/kakashi-feeling-embarassed-kakashi-hatake-quote.jpg"} height={120} width={120} style={{ objectFit: 'cover' }}  />,
            <li>{e.name}</li>
            <li>{e.known_for_department}</li>

          </div>
        ))}
        </div>
        
        </div>
      ) : (
        <Spinner animation="border" />
      )}
       <Search show={show} setShow={setShow}  name={celbname} />
    </div>
  );
}

export default Individual;
