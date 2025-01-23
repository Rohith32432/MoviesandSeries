import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useFetch } from '../helpful/MakeRequest';
import { Button } from "@/components/ui/button"
import SideDrawer from './SideDrawer';
import { Separator } from "@/components/ui/separator"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Loading } from './Loading'
import { useLocalStorage } from '../hooks/useLocalStorage';
function Individual() {
  const { id } = useParams();
  const {pathname}=useLocation()
  let type=pathname.split('/')[2]
  const [poster, setPoster] = useState(null);
  const [cast, setCast] = useState([]);
  const [celbname, setCelbname] = useState('');
  const [show, setShow] = useState(false);
const{save}=useLocalStorage()
  const { data: movieData, loading, error } = useFetch(`https://api.themoviedb.org/3/${type!='series'?'movie':'tv'}/${id}?append_to_response=images,videos`);

  // Fetch cast and crew data using useFetch custom hook
  const { data: castData } = useFetch(`https://api.themoviedb.org/3/${type!='series'?'movie':'tv'}/${id}/credits?language=en-US`);

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

  function handlecast(e) {
    setShow(!show)
    setCelbname(e)

  }

  // Function to extract trailers and logos
  function Getmovie() {
    let trailers, logo;
    if (movieData) {
      console.log(movieData);
      
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



  const closeModal = () => {

    setShow(false)
  };

  return (
    <div>
      {poster ? (
        <div className='relative   w-full'>
          <div className="flex flex-col justify-around   ">
            <div className=" flex  flex-wrap justify-center gap-5 items-center h-1/2 overflow-hidden m-5">
              {/* Details Section */}
              <div className=" grid grid-cols-3 grid-rows-[max-content_5fr] justify-items-center m-2 p-2 w-[50%] gap-3" id='setwidth'>
                <div className='row-span-2 col-span-3 h-max p-6 '>

                  {
                    poster.images.logos[0] ?
                      <img src={`https://image.tmdb.org/t/p/w500/${poster.images.logos[0].file_path}`} alt="" className="max-h-[200px]" /> :
                      <h1 className='text-7xl font-bold italic bg-gradient-to-r from-slate-100 to-slate-500 text-transparent bg-clip-text'>{type!='series'? poster.title:poster?.name}</h1>
                  }
                </div>

                <Separator className="my-2 col-span-3 " />
                <p className="text-left col-span-3 h-max p-2 ">{poster.overview}</p>
                <div className='col-span-3 flex w-full justify-center gap-2 p-1'>
                  <h3 className='text-xl'>Rating : {poster.vote_average}/10</h3>
                  <Separator orientation="vertical" />
                  <h5 className='text-xl'>Release Date : {poster.release_date}</h5>

                </div>

                {/* Button Section */}
                <div className='flex w-full gap-5 col-span-3 my-5 '>
                  <a href={poster.videos ? `https://www.youtube.com/watch?v=${poster.videos.key}` : "#"} className='flex-grow'>
                    <Button className='w-full p-2'>Watch Trailer</Button>
                  </a>
                  <Button onClick={() => {save('watchlist',{id:movieData?.id,type}) }} className="w-auto">Add to Watchlist</Button>
                </div>

              </div>

              <img src={`https://image.tmdb.org/t/p/w500/${poster.poster_path}`} className="rounded-lg w-[28%] min-h-[300px] m-5 " alt="" />
            </div>

            <SideDrawer data={celbname} type={'actors'} isopen={show} isclose={closeModal} />
            <h1 className='text-4xl mb-5 font-bold mx-14 bg-gradient-to-r from-slate-100 to-slate-800 text-transparent bg-clip-text'>{'Cast & Crew'}</h1>
            <div className='flex w-full items-center justify-center flex-wrap gap-2'>

              {cast.map((e, i) => (
                <div key={i} style={{ width: 150, cursor: 'pointer' }} onClick={() => { handlecast(e) }}>
                  <Avatar className='h-[100px] w-[100px] rounded-xl'>
                    <AvatarImage src={e.profile_path ? `https://image.tmdb.org/t/p/w400/${e.profile_path}` : "../default.png"} height={150} width={200} className="rounded-lg object-cover" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {/* <img src={e.profile_path ? `https://image.tmdb.org/t/p/w400/${e.profile_path}` : "../default.png"} height={120} width={120} className="rounded-lg object-cover" /> */}
                  {/* <>{e.name}</> */}
                  <h3 className='text-sm my-2'>
                  
                  {e?.name.length < 25 
                    ? e?.name
                    : e?.name.substring(0, 25) + '...'}
                  {/* <li>{e.known_for_department}</li> */}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        //   <Spinner animation="border" />
        <>
          <Loading className='w-[100vw] h-full flex justify-center items-center flex-col gap-5' />
        </>
      )
      }
    </div>
  );
}

export default Individual;
