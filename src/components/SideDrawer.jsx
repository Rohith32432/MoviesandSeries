import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import React, { useEffect, useState } from 'react'
import { useFetch } from "../helpful/MakeRequest";
import { Link } from "react-router-dom";
import HoverCardDemo from "./HoverCard";
import { Search } from "lucide-react";

function SideDrawer({ type, isopen, isclose, data }) {
    const [movie, setmovies] = useState([])
    const [celebs, setCelebs] = useState([]);
    async function searchMovies(e) {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${e}&include_adult=false&language=en-US&page=1&api_key=${import.meta.env.VITE_APP_APIKEY}`);
            const response = await data.json();
            // console.log(response);
            setmovies(response?.results)
        } catch (error) {
            console.error('Error searching movies:', error);
        }
    }

    async function searchCelebs(qry) {
        try {
            const data = await fetch(`https://api.themoviedb.org/3/search/person?query=${qry}&include_adult=true&language=en-US&page=1&api_key=${import.meta.env.VITE_APP_APIKEY}`);
            const response = await data.json();
            console.log(response);

            if (Array.isArray(response.results) && response.results.length > 0) {
                setCelebs(response.results[0]);
            } else {
                setCelebs([]); 
            }
        } catch (error) {
            console.error('Error searching celebrities:', error);
        }
    }
    useEffect(() => {
        if (type == 'actors' || true) {
            searchCelebs(data?.name)
        }
    }, [data])

    return (
        <div className="w-full">
            <Drawer direction='right' open={isopen} onOpenChange={isclose}  >
                {/* Trigger the Drawer */}
                {
                    type=='side' &&
                <DrawerTrigger className='text-sm' asChild={isopen}><Search /></DrawerTrigger>
                }

                <DrawerContent
                    className='bg-foreground text-background h-full w-1/4'
                >
                    <DrawerHeader>
                        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    </DrawerHeader>
                    {
                        type != 'actors'  ?
                            <div className="w-full p-4 overflow-hidden">

                                <Input autoFocus={true} onChange={(e) => { searchMovies(e.target.value) }} />
                                <div className="flex h-full  flex-wrap  no-scrollbar overflow-y-scroll" >
                                    {/* <img src={`https://image.tmdb.org/t/p/w500//xeEw3eLeSFmJgXZzmF2Efww0q3s.jpg`} width={170 } alt="" /> */}

                                    {
                                        movie?.map((e, i) => (
                                            <div className="p-1 m-1" key={i}>
                                                <Link to={`/watch/movie/${e?.id}`} >
                                                    <img src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} width={150} className="rounded-lg" alt="" />
                                                </Link>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            :
                            <div>
                                <h1>{celebs?.name}</h1>
                                <img src={`https://image.tmdb.org/t/p/w500/${celebs?.profile_path}`} width={150} className="rounded-lg" alt="" />
                                <div>
                                    <span>{celebs?.known_for_department}</span>
                                </div>
                                <div>
                                    {
                                        celebs?.known_for?.map((e,i)=>(
                                            <div key={i}>
                                                <HoverCardDemo data={e}/>
                                            </div>
                                        ))
                                    }
                                </div>
                                </div>
                    }
                    {/* Drawer Footer */}

                    {/* <DrawerFooter>
                        <Button>Submit</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </div>
    )
}

export default SideDrawer
