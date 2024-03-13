import React, { useEffect, useState } from 'react';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';

function Slider() {
    const [upcoming, setUpcoming] = useState([]);

    const AutoplaySlider = withAutoplay(AwesomeSlider);

    const getUpcoming = async () => {
        const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=ff7c0340a9933baee3f46968474a001c&append_to_response=images");
        const res = await data.json();
        setUpcoming(res.results);
    }

    useEffect(() => {
        getUpcoming();
    }, []);

    return (
        <div>
            <AutoplaySlider
                bullets={false}
                mobileTouch={true}
                style={{ height: '100vh' }}
                play={true}
               
                cancelOnInteraction={false} // should stop playing on user interaction
                interval={3000}
            >
                {upcoming.map((e, i) => (
                    <div key={i} data-src={`https://image.tmdb.org/t/p/w500/${e.backdrop_path}`} style={{ display: 'block' }}>
                        <div style={{
                            position: 'absolute',
                            display: 'flex'
                        }}>
                            <h1>{e.title}</h1>
                        </div>
                    </div>
                ))}
            </AutoplaySlider>
        </div>
    );
}

export default Slider;
