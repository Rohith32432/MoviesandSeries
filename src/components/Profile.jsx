import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Card, CardHeader, CardContent, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Link } from "react-router-dom";

function Profile() {
    const { items, remove } = useLocalStorage();
    const [Xdata, setdata] = useState([]);
    const [loading, setLoading] = useState(false);

    async function fetchcard(type, id) {
        try {
            const data = await fetch(
                `https://api.themoviedb.org/3/${type !== "series" ? "movie" : "tv"}/${id}?api_key=${import.meta.env.VITE_APP_APIKEY}`
            );
            const response = await data.json();
            setdata((prev) => [...prev, response]);
        } catch (error) {
            console.error("Error fetching movie data:", error);
        }
    }

    function handleremove(id) {
        remove(id); 
        setdata((prevData) => prevData.filter((movie) => movie.id !== id)); // Remove from Xdata
    }

    useEffect(() => {
        if (items.length) {
            setdata([]);
            setLoading(true);
            Promise.all(items.map((e) => fetchcard(e.type, e.id))).finally(() => setLoading(false));
        }
    }, [items]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {loading && (
                <Skeleton className="w-full h-[300px]" />
            )}
            {!loading &&
                Xdata?.map((movie,i) => (
                    
                    
                    <Card key={movie.id} className="bg-background text-foreground h-max  max-h-[500px] overflow-hidden shadow-md rounded-md">
                        <Link to={`/watch/${items[i]?.type !='series' ?'movie':'series'}/${movie?.id}`}>
                        <CardHeader>
                            <h3 className="text-lg font-bold ">{movie?.title || movie?.name}</h3>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                                alt={movie?.title || movie?.name}
                                className="w-full h-64 object-cover rounded-md"
                            />
                        </CardContent>
                            </Link>
                        <CardFooter className="flex justify-between items-center">
                            <Button
                                variant="destructive"
                                onClick={() => handleremove(movie.id)}
                                className="bg-red-500 hover:bg-red-600 text-white"
                            >
                                Remove
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
        </div>
    );
}

export default Profile;
