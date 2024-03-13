import React, { useState } from 'react';

import Movies from './Movies';
import SeriesList from './sub/seriesList';
function Home() {
    const [details,setdetails]=useState({})
  
  return (
    <div className="d-flex overflow-hidden justify-content-end"  >
      <div className="d-flex flex-column " style={{width:'93%'}}>

      <div className=' my-2 position-relative w-100' style={{ height:350, overflow: "hidden" ,backgroundImage:`url(https://image.tmdb.org/t/p/w1280/${details.backdrop_path})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
          <div className='position-absolute top-0 '>
            <h1>{details.original_name}</h1>
          </div>
        </div>
      
        <SeriesList data={setdetails} />

      </div>
    </div>
  );
}

export default Home;
