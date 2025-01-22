import React from 'react'

import Movies from "./Movies" 
import Swiper from "./Swiper"
import PaginationX from './Pagination'

function Home() {
  return (
    <>
    
      <div className="flex-1 flex  flex-col overflow-hidden ">
      {/* <h1 >slider</h1> */}
      <div className="w -full">
      <Swiper/>
      </div>
      <div className=' flex gap-2 items-start  '>
        <Movies/>
        {/* pagination */}
        {/* <div className='h-full  '>

        <PaginationX />
        </div> */}
        
      </div>
    </div>

    </>
  )
}

export default Home