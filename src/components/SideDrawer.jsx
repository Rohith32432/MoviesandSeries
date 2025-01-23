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


        <>
            <div className="w-full">
                <Drawer direction="right" open={isopen} onOpenChange={isclose}>
                    {/* Trigger the Drawer */}
                    {
                        type == 'side' &&
                        <DrawerTrigger className='text-sm' asChild={isopen}><Search /></DrawerTrigger>
                    }

                    <DrawerContent className="bg-foreground text-white h-full w-full md:w-1/3 lg:w-1/4 shadow-lg">
                        <DrawerHeader className="flex justify-between items-center p-4 border-b border-gray-700">
                            <DrawerTitle className="text-lg font-bold">
                                {type === "actors" ? "Actor Details" : "Movies"}
                            </DrawerTitle>
                        </DrawerHeader>
                        {

                            type != 'actors' ?
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
                                <div className="p-4 flex flex-col items-center">
                                    {/* Profile Picture */}
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500/${celebs?.profile_path}`}
                                        alt={celebs?.name}
                                        className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-gray-800"
                                    />

                                    {/* Actor Name */}
                                    <h1 className="mt-4 text-2xl font-bold text-white">{celebs?.name}</h1>

                                    {/* Known For Department */}
                                    <span className="mt-2 text-sm text-gray-400">
                                        {celebs?.known_for_department}
                                    </span>

                                    {/* Additional Details */}
                                    <div className="mt-4 w-full space-y-4">
                                        <div className=" p-4 rounded-md shadow-md">
                                            <h3 className="text-lg my-2 font-semibold text-white">Known For</h3>
                                            <div className="flex flex-col items-center h-max  ">
                                                {celebs?.known_for?.map((e, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-2 underline h-max 
                                            w-full
                                            m-1 bg-slate-900
                                            hover:bg-slate-800 rounded-md shadow-md "
                                                    >
                                                        <HoverCardDemo data={e} />

                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        }
                    </DrawerContent>
                </Drawer>
            </div>
        </>
    )
}

export default SideDrawer
