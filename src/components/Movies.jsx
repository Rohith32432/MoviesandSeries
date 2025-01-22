import React, { useEffect, useState } from 'react';
import { useFetch } from '../helpful/MakeRequest';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import ModelPreview from './ModelPreview';
import Card from './Card';
import PaginationX from './Pagination';
import { Loading } from './Loading';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modeldata, setmodeldata] = useState(null)
  const [pagno, setpageno] = useState(1)
  const { data, loading, error } = useFetch(
    `https://api.themoviedb.org/3/discover/movie?page=${pagno}&sort_by=popularity.desc`
  );

  console.log(pagno);

  useEffect(() => {

    if (data) {
      setMovies(data?.results);
    }
  }, [data]);

  const openModal = (movie) => {
    setIsModalOpen(true);
    movie && setmodeldata(movie)
    // console.log(movie);

  }

  const closeModal = () => {
    setmodeldata({})
    setIsModalOpen(false)
  };

  return (
    <>
      <ModelPreview isopen={isModalOpen} isclose={closeModal} modeldata={modeldata} />

      <div className=' flex flex-wrap justify-center items-center gap-5'>
        {
          loading ? Array(10).fill(' ').map((e, i) => (<Loading key={e + i} />))
            :
            movies?.map((movie, i) => (
              <Card data={movie} openModal={openModal} key={i} />
            ))
        }
      </div>
      {/* pagination */}
      <div className=' relative h-full w-[10%] justify-start flex items-start '>

        <div className='fixed  right-0  m-2'>
        <PaginationX pageno={pagno} newpage={setpageno} />
        </div>

      </div>
    </>
  );
}

export default Movies;
