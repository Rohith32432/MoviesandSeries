
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Separator } from "@/components/ui/separator"

import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../store/ApiSlices';
import { Star, StarIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// const MyComponent = () => {
//   const dispatch = useDispatch();

//   // Get data, loading, and error from Redux state
//   const { data, loading, error } = useSelector((state) => state.apis);
// console.log(data,error,loading);

//   // Effect hook to dispatch the action when the component mounts
//   useEffect(() => {
//     dispatch(makeRequest({ method: 'GET', url: 'https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&append_to_response=images' }));
//     // Dispatch the makeRequest thunk to fetch data
//   }, []);

//   return (
//     <div>
//       {loading && <p>Loading...</p>}
//       {error && <p>Error: {error}</p>}
//       {data && <div>Data: {JSON.stringify(data)}</div>}
//     </div>
//   );
// };




const ImageSlider = () => {
  const [upcoming, setUpcoming] = useState([]);


  const getUpcoming = async () => {
    const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=ff7c0340a9933baee3f46968474a001c&append_to_response=images");
    const res = await data.json();

    setUpcoming(res.results.slice(0, 9));
  }

  useEffect(() => {
    getUpcoming();
  }, []);

console.log(upcoming);

  return (
    <>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]} // Register modules
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000, 
          disableOnInteraction: true, // Keep autoplay running after interaction
        }}
        pagination={{ clickable: true }}
        navigation
        className='w-[100%]    h-[45vh]'
      >
        {upcoming.map((e, index) => (
         <SwiperSlide key={index}>
         <img
           src={`https://image.tmdb.org/t/p/w1280/${e.backdrop_path}`}
           alt={e.alt}
           width={'100%'}
           className='object-cover '
         />
         

         <div className="absolute bottom-5 h-full inset-0 left-5 w-[100%]  bg-black bg-opacity-45 text-white p-4 rounded-lg shadow-lg">
          <div className='w-[50%] mx-16 flex items-start bg-neutral-950 rounded-xl bg-opacity-35 px-6  justify-center h-full flex-col'>
          <div className='my-2 w-full flex items-center '>
            <Link to={`/watch/movie/${e?.id}`}>
            
           <h1 className="text-2xl font-bold text-shadow-md underline">{e.title}</h1>
            </Link>
             <h3 className='text-xl ml-10'>{e?.vote_average.toFixed(1)} </h3><StarIcon className='inline ml-2' size={20}/>           
          </div>
           <p className="text-lg line-clamp-3">{e.overview || "No description available."}</p>
          </div>
         </div>
         
       </SwiperSlide>
       
        ))}
      </Swiper>
      {/* <MyComponent/> */}
    </>
  );
};

export default ImageSlider;