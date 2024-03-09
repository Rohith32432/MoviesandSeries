import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

function Slider() {
    const [upcming,setupcming]=useState([])

    // https://api.themoviedb.org/3/movie/157336?api_key=ff7c0340a9933baee3f46968474a001c&append_to_response=images
    const getupcoming=async()=>{
        const data=await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=ff7c0340a9933baee3f46968474a001c&append_to_response=images")
        const res=await data.json()
        setupcming(res.results)
    }
    console.log(upcming);
    useEffect(()=>{
        getupcoming()
    },[])
const mystyle={

}
    return (
        <div >
            <AwesomeSlider
                bullets={false}
                mobileTouch={true}
                style={{ height: '100vh' }}
            >
                {
                    upcming.map((e,i)=>(

                <div key={i} data-src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`}  style={{display:'block'}}>
                    <div style={{
                    position:'absolute',
                    display:'flex'
                    
                    }}>
                    <h1>{e.title}</h1>
                    </div>
                </div>
                    ))
                }


            </AwesomeSlider>
        </div>
    );
}

export default Slider;
