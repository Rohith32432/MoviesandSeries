import React, { useState } from 'react';
// import SeriesList from './SeriesLisSt';
import Movies from './Movies';

function Home() {
    const [data, setdetails] = useState({});

    return (
        <div className="flex-1 flex  flex-col overflow-hidden ">        
            <div className="flex flex-col" id="res-movies">
                <div
                    className="my-2 h-1/2 relative w-full"
                    style={{
                        height: 350,
                        overflow: 'hidden',
                        backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${data?.backdrop_path})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className="absolute top-0">
                        <h1 className="text-white text-xl md:text-3xl font-semibold">{data?.original_name}</h1>
                    </div>
                </div>

            </div>
            <div className=' flex gap-2 items-start  '>
                <Movies detals={setdetails} type={'series'}/>
      
      </div>
        </div>
    );
}

export default Home;
