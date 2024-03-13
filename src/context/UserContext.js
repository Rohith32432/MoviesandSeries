import React, { useContext, useState } from 'react'
import { createContext } from 'react'

const Maincontext =createContext()
function UserContext({children}) {
    const[watchlist,setwatchlist]=useState([])
    const data={

    }
  return (
    <Maincontext.Provider value={{watchlist,setwatchlist}}>
        {children}
    </Maincontext.Provider>
  )
}

export const UserGlobal=()=>{
    return useContext(Maincontext)
}

export default UserContext