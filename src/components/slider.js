
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

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
      style={{
        width: '100%',
        height: '45vh',
      }}
    >
      {upcoming.map((e, index) => (
        <SwiperSlide key={index} style={{ width: '100%', height: '100%' }}>
          <img
            src={`https://image.tmdb.org/t/p/w1280/${e.backdrop_path}`}
            alt={e.alt}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
            }}
          />
          <div style={{
            position: 'absolute',
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',

            top: 0
          }}>
            <h1>{e.title}</h1>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
