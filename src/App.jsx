
import { Toaster } from "@/components/ui/toaster"

import './App.css'

import { Provider } from "react-redux"
import store from "./store/store"
import Home from "./components/Home"
import { Route, Routes } from "react-router-dom"

import { SidebarProvider } from "@/components/ui/sidebar"

import { AppSidebar } from "./components/AppSidebar"
import Individual from "./components/Individual"
import Series from "./components/Series"
import MovieSvg from "./assets/MovieSvg"
import Profile from "./components/Profile"
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
    <Route element={<Profile/>} path="/profile"/>
    <Route path="/*" element={<h1>Not Found <MovieSvg/></h1>}></Route>
  </Routes>
  <Toaster />

  </div>
   {/* </Provider>z */}
   
   </>
  )
}

export default App
