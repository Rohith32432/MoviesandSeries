import { Button } from "@/components/ui/button"

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CardDemo } from "./card"

function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <h1 className='text-5xl font-bold '>Staritng</h1>
   <Button >click me</Button>
   <CardDemo/>
   </>
  )
}

export default App
