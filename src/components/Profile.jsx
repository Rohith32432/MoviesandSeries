import React, { useEffect, useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useFetch } from '../helpful/MakeRequest'

function Profile() {
    const {items,remove}=useLocalStorage()
    const [Xdata,setdata]=useState([])
    async function fetchcard(type,id){


            try {
                const data = await fetch(`https://api.themoviedb.org/3/${type!='series'?'movie':'tv'}/${id}?api_key=${import.meta.env.VITE_APP_APIKEY}`);
                const response = await data.json();
                setdata([...Xdata,response])
                console.log(Xdata);
                
            } catch (error) {
                console.error('Error searching movies:', error);
            }
        
        // const { data, loading, error } = useFetch(`https://api.themoviedb.org/3/${type!='series'?'movie':'tv'}/${id}?append_to_response=images,videos`);
        
    }
    function handleremove(id){
        remove(id)
        setdata(prevdata=>{
           return  prevdata.filter((e,i)=> i!=id)
        }
        )
    }
    useEffect(()=>{
        
    },[])
useEffect(()=>{
 items?.map((e)=>(
    fetchcard(e?.type,e?.id)
 ))
},[items])
  return (
    <div>
        {
            Xdata?.map((e,i)=>(
                
                <div key={i}>
                    {e?.title}
               <img src={`https://image.tmdb.org/t/p/w500/${e?.poster_path}`} width={150} className="rounded-lg" alt="" />      
               <button onClick={()=>{handleremove(i)}} >remove</button>
                </div>

            ))
        }
       
    </div>
  )
}

export default Profile