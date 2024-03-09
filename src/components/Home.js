import React, { useState } from 'react';
import Sidebar from './SideBar';
import Movies from './Movies';


function Home() {
    const [details,setdetails]=useState({})
  
  return (
    <div className="d-flex overflow-hidden" >
      <Sidebar />
      <div className="d-flex flex-column w-100">
      <div className=' my-2 position-relative w-100' style={{ height:350, overflow: "hidden" }}>
          <img src={`https://image.tmdb.org/t/p/w500/${details.backdrop_path}`} style={{objectFit:'cover'}} width={'100%'} alt="" />
          <div className='position-absolute top-0 '>
            <h1>{details.original_title}</h1>
          </div>
        </div>


        <Movies data={setdetails} />
      </div>
    </div>
  );
}

export default Home;
