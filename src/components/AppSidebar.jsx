import { Calendar, Home, Inbox, Search, Settings, PersonStanding } from "lucide-react"

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
} from "@/components/ui/sidebar"
import SideDrawer from "./SideDrawer"
import { Link } from "react-router-dom"

// Menu items.
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
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {

  return (
    <>
      <Sidebar side='left' >
        <SidebarHeader className='p-5 text-2xl'>S</SidebarHeader>
        <SidebarContent className='bg-black overflow-hidden p-2 justify-start  ' >
          <SidebarGroup >
            <SidebarGroupLabel></SidebarGroupLabel>
            <SidebarGroupContent >
              <SidebarMenu className='gap-5 text-2xl my-10' >
                
                {items.map((item) => (
                  <SidebarMenuItem className='' key={item.title}>
                    <div   className='  cursor-pointer  w-max p-3 transition ease-in-out delay-1 rounded-full hover:bg-slate-900'>
                      {
                        item.title !='Search'?
                        
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
