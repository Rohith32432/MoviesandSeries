import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useFetch } from '../helpful/MakeRequest';
import { Button } from "@/components/ui/button"
import SideDrawer from './SideDrawer';

function Individual() {
  const { id } = useParams();
  const [poster, setPoster] = useState(null);
  const [cast, setCast] = useState([]);
  const [celbname, setCelbname] = useState('');
  const [show, setShow] = useState(false);

  const { data: movieData, loading, error } = useFetch(`https://api.themoviedb.org/3/movie/${id}?append_to_response=images,videos`);

  // Fetch cast and crew data using useFetch custom hook
  const { data: castData } = useFetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`);

  // Filter and sort crew members by department
  const filterAndSortCrew = (res) => {
    const crew = res.crew.filter((e) => ['Directing', 'Sound', 'Visual Effects', 'Editing', 'Art'].includes(e.known_for_department));
    
    const grouped = crew.reduce((acc, member) => {
      acc[member.known_for_department] = acc[member.known_for_department] || [];
      acc[member.known_for_department].push(member);
      return acc;
    }, {});
    
    return {
      Directing: grouped['Directing']?.slice(0, 3),
      Sound: grouped['Sound']?.slice(0, 3),
      Visual_Effects: grouped['Visual Effects']?.slice(0, 3),
      Editing: grouped['Editing']?.slice(0, 3),
      Art: grouped['Art']?.slice(0, 3),
    };
  };

  function handlecast(e){
    setShow(!show)
    setCelbname(e)
    
  }

  // Function to extract trailers and logos
  function Getmovie() {
    let trailers, logo;
    if (movieData) {
      if (movieData.videos && movieData.videos.results) {
        trailers = movieData.videos.results.filter((url) => url?.name.includes('Trailer') || url?.name.includes('Official')).filter((e) => e.type.toLowerCase() === 'trailer');
        trailers = trailers[0];
      }
      logo = movieData?.images?.logos.filter((itm) => itm.iso_639_1 === "en");
    }
    return { trailers, logo };
  }

  useEffect(() => {
    if (movieData && !loading) {
      setPoster(movieData);
      const { trailers, logo } = Getmovie();
      setPoster((prev) => ({ ...prev, videos: trailers, images: { logos: logo } }));
      
      if (castData) {
        const firstTenCast = castData.cast.slice(0, 10);
        const crew = filterAndSortCrew(castData);
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
    }
  }, [movieData, castData, loading, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
 
  const closeModal = () => {
  
     setShow(false)};
 
  return (
    <div>
    {poster ? (
      <div className='flex justify-end w-full'>
        <div className="top relative w-9/10">
          <div className="hero-section flex flex-col lg:flex-row justify-around m-5 items-center">
            {/* Details Section */}
            <div className="details flex flex-col items-start p-5 gap-1 overflow-hidden" id='setwidth'>
              {
                poster.images.logos[0] ?
                  <img src={`https://image.tmdb.org/t/p/w500/${poster.images.logos[0].file_path}`} alt="" className="mb-12 w-9/10" /> :
                  <h1>{poster.title}</h1>
              }
              <p className="text-left">{poster.overview}</p>
              <h3>Rating : {poster.vote_average}/10</h3>
              <h5>Release Date : {poster.release_date}</h5>
              
              {/* Button Section */}
              <div className='flex w-full gap-5 my-3'>
                <a href={poster.videos ? `https://www.youtube.com/watch?v=${poster.videos.key}` : "#"} className='flex-grow'>
                  <Button variant='danger' className='w-full p-2'>Watch Trailer</Button>
                </a>
                <Button variant='danger' onClick={()=>{}} className="w-auto">Add to Watchlist</Button>
              </div>

            </div>

            <img src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`} className="rounded-lg" height={650} alt="" />
          </div>

        <SideDrawer data={celbname} type={'actors'}  isopen={show} isclose={closeModal}/>
          <div className='flex flex-wrap gap-2'>
            {cast.map((e, i) => (
              <div key={i} style={{ width: 150, cursor: 'pointer' }} onClick={() => { handlecast(e) }}>
                <img src={e.profile_path ? `https://image.tmdb.org/t/p/w400/${e.profile_path}` : "../default.png"} height={120} width={120} className="rounded-lg object-cover" />
                <li>{e.name}</li>
                <li>{e.known_for_department}</li>
              </div>
            ))}
          </div>
        </div>
      </div>
    ) : (
    //   <Spinner animation="border" />
    <></>
    )}
    {/* <Search show={show} setShow={setShow} name={celbname} /> */}
  </div>
  );
}

export default Individual;
