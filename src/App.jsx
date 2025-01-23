
import { Button } from "@/components/ui/button"

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CardDemo } from "./card"
import { Sidebar } from "lucide-react"
import { Tooltip } from "@radix-ui/react-tooltip"
import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./components/Home"
import { Route, Routes } from "react-router-dom"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

import { AppSidebar } from "./components/AppSidebar"
import Individual from "./components/Individual"
import Series from "./components/Series"
function App() { 
  return (
   <>
   {/* <Provider store={store}> */}
  <div className="flex ">
   <SidebarProvider>
    <AppSidebar/>
   </SidebarProvider>

  <Routes>
    <Route path="/" element={<Home/>} />
    <Route element={<Individual/>} path="/watch/movie/:id"/>
    <Route path="/series" element={<Series/>} />
    <Route element={<Individual/>} path="/watch/series/:id"/>
  </Routes>
  </div>
   {/* </Provider>z */}
   
   </>
  )
}

export default App
