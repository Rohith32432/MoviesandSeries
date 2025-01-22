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
    return (
        <HoverCard data-side='top'	>
            <HoverCardTrigger > 
                <h1>{data?.title}</h1>
            </HoverCardTrigger>
            <HoverCardContent className="p-2 bg-foreground w-max h-52">
                <div className=" overflow-hidden h-full bg-black  ">
                    <a href={`/watch/movie/${data?.id}`}>
                    <Avatar className='rounded-none h-full w-full'>
                        <img
                            src={data?.poster_path ? `https://image.tmdb.org/t/p/w500/${data.poster_path}` : ` https://github.com/vercel.png`} />
                    </Avatar>
                    
                    </a>

                </div>
            </HoverCardContent>
        </HoverCard>
    )
}
