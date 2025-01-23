import React, { useEffect, useState } from 'react';
import { useFetch } from '../helpful/MakeRequest';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function CardX({data,openModal,handle}) {
    
    return (
        <div onMouseOver={()=>{handle(data)}}>
            <TooltipProvider >
                <Tooltip>
                    <TooltipTrigger>
                        <Card
                            className="w-max cursor-pointer"
                            onClick={() => { openModal(data) }}
                        >
                            <CardContent className="p-4">
                                <img
                                    src={`https://image.tmdb.org/t/p/w200/${data.poster_path}`}
                                    alt={data.title}
                                />
                            </CardContent>
                            <CardHeader className="p-4 text-center">
                                <CardTitle>
                                    {
                                    data?.title ?(
                                    data?.title.length < 25
                                        ? data?.title
                                        : data?.title.substring(0, 25) + '...')
                                    :(
                                         data?.name.length < 25
                                        ? data?.name
                                        : data?.name.substring(0, 25) + '...'
                                    )
                                    
                                    }
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add to library</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

export default CardX