import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import Search from './sub/search'

function Series() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button onClick={()=>setShow(true)}>click</Button>
      <Search show={show} setShow={setShow} />
    </div>
  )
}

export default Series