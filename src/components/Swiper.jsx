
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import { useDispatch, useSelector } from 'react-redux';
import { makeRequest } from '../store/ApiSlices';

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


  return (
    <>
    
    <Swiper
      modules={[Navigation, Pagination, Autoplay]} // Register modules
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 3000, // Adjust autoplay delay as needed
        disableOnInteraction: false, // Keep autoplay running after interaction
      }}
      pagination={{ clickable: true }}
      navigation
      className='w-[100%]    h-[45vh]'
    >
      {upcoming.map((e, index) => (
        <SwiperSlide key={index}  >
          <img
            src={`https://image.tmdb.org/t/p/w1280/${e.backdrop_path}`}
            alt={e.alt}
            width={'100%'}
            className='object-cover'
          />
          <div style={{
            position: 'absolute',
            display: 'flex',
            width: 'max-content',
            backgroundColor:'black',
            justifyContent: 'center',
            alignItems: 'center',
            top: 0
          }}>
            <h1 className='text-5xl'>{e.title}</h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    {/* <MyComponent/> */}
    </>
  );
};

export default ImageSlider;