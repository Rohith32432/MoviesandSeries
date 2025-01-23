import { Calendar,MenuIcon, Home, Inbox, Search, Settings, PersonStanding } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarHeader,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar"
import SideDrawer from "./SideDrawer"
import { Link } from "react-router-dom"
import MovieSvg from "../assets/MovieSvg"
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Series",
    url: "/series",
    icon: Inbox,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: Settings,
  },
]

export function AppSidebar() {
  const {isMobile,setOpenMobile} = useSidebar()

  function hanleres(){
    setOpenMobile(true)
  }

  return (
    <>
    <div className="z-50 fixed rounded-lg p-1 m-2 bg-background ">
      {
        isMobile&& <button onClick={hanleres}><MenuIcon className="text-foreground" size={50}/></button>
      }
    </div>
      <Sidebar
        side="left"
        variant="floating"
        collapsible="icon"
        className={`${ "w-auto"}`}
       
      >
        <SidebarHeader className='p-5 text-2xl'><MovieSvg size={35} className='ml-2 fill-foreground'/>  </SidebarHeader>
        <SidebarContent className='bg-black overflow-hidden  p-4 justify-start  ' >
          <SidebarGroup >
            {/* <SidebarGroupLabel></SidebarGroupLabel> */}
            <SidebarGroupContent >
              <SidebarMenu className='gap-5 text-2xl my-10' >

                {items.map((item) => (
                  <SidebarMenuItem className='' key={item.title}>
                    <div className='  cursor-pointer  w-max p-3 transition ease-in-out delay-1 rounded-full hover:bg-slate-900'>
                      {
                        item.title != 'Search' ?

                          <Link to={item.url} >
                            <item.icon size={30} />
                            {/* <span>{item.title}</span> */}
                          </Link>
                          :

                          <span className="tex-xl ">
                            <SideDrawer type={'side'} />
                          </span>

                      }
                    </div>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

    </>
  )
}
