import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import React, { useEffect, useState } from 'react'
import { useFetch } from "../helpful/MakeRequest"; 
import { Link } from "react-router-dom";

function ModelPreview({ isopen,type, isclose, modeldata }) {
  const [cast, setCast] = useState([])

  function topcrew(res) {
    const filteredArray = res.filter(item =>
      item.known_for_department === "Directing" ||
      item.known_for_department === "Sound" ||
      item.known_for_department === "Acting"
    );
    const top3Entries = filteredArray.slice(0, 3);

    const remainingEntries = res.filter(item =>
      !top3Entries.includes(item) && item.known_for_department === "Directing"
    ).slice(0, 2);

    const totalEntries = [...remainingEntries, ...top3Entries];
    setCast(totalEntries); 
  }

  const { data, loading, error } = useFetch(
    modeldata?.id ? `https://api.themoviedb.org/3/${type!='series'?'movie':'tv'}/${modeldata.id}/credits?language=en-US` : null
  );
  console.log(data);
  
useEffect(() => {
    if (data) {
      topcrew(data.cast);
    }
  }, [data]);

  return (
    <Dialog open={isopen} onOpenChange={isclose}>
      <DialogContent className="overflow-hidden bg-no-repeat bg-cover p-8 text-background rounded-lg  min-h-[60vh] min-w-[50%]"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.75) 55%, rgba(0,0,0,1) 85%),url(${`https://image.tmdb.org/t/p/w300/${modeldata?.backdrop_path}`})` }}>

        <div className="flex items-center w-full gap-8">
          <div className='w-[30%]'>
            <img src={modeldata?.poster_path && `https://image.tmdb.org/t/p/w300/${modeldata?.poster_path}`} alt="" className="w-full rounded-md" />
          </div>
          <div className="w-[70%] flex-1 flex flex-col  h-full justify-center gap-5">
            <>
              <DialogTitle className='text-3xl'>{type!='series'? modeldata?.original_title : modeldata?.name}</DialogTitle>
              <DialogDescription className='text-gray-300'>
                {modeldata?.overview}
              </DialogDescription>
            </>

            
            <div className="w-full flex gap-5">
              {cast.map((celb, index) => (
              <div key={index}>
            <Avatar className='h-20 w-20'  >
              <AvatarImage src={`https://image.tmdb.org/t/p/w400/${celb.profile_path}`} className='object-cover'/>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
              
            {/* <div key={index}>{celb.name} - {celb.known_for_department}</div> */}
              </div>
              
              ))}
            </div>
            <Link to={`/watch/${type!='series'?'movie':'series'}/${modeldata?.id}`} >
            <Button variant="secondary" className='w-full m-5  self-center'>{`Watch ${type!='series'?'Movie':'Series'}`}</Button>
            </Link>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}

export default ModelPreview;
