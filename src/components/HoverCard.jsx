import { CalendarDays } from "lucide-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Link } from "react-router-dom"

export default function HoverCardDemo({ data }) {
    console.log(data?.title);
    
    return (
        <HoverCard data-side='top'	>
            <HoverCardTrigger > 
                {data?.title !='undefined' &&
                <h1 className="text-lg font-semibold "> •   {data?.title}</h1>
                }
            </HoverCardTrigger>
            <HoverCardContent className="p-2 bg-foreground w-max h-52">
                <div className=" overflow-hidden h-full bg-black  ">
                    <Link to={`/watch/movie/${data?.id}`}>
                    <Avatar className='rounded-none h-full w-full'>
                        <img
                            src={data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : ` https://github.com/vercel.png`} />
                    </Avatar>
                    
                    </Link>

                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
