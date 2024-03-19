import React, { useState } from 'react';
import Sidebar from './SideBar';
import Movies from './Movies';
import Slider from './slider';
import './style.css'

function Home() {
    const [details,setdetails]=useState({})
  
  return (
    <div className="d-flex overflow-hidden justify-content-end"  >
      <div className="d-flex flex-column " id='res-movies' >

        <Slider/>
        <Movies data={setdetails} />

      </div>
    </div>
  );
}

export default Home;
      // <div className=' my-2 position-relative w-100' style={{ height:350, overflow: "hidden" ,backgroundImage:`url(https://image.tmdb.org/t/p/w500/${details.backdrop_path})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
      //     {/* <img src={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`} style={{objectFit:'cover'}} width={'100%'} alt="" /> */}
      //     <div className='position-absolute top-0 '>
      //       <h1>{details.original_title}</h1>
      //     </div>
      //   </div>
