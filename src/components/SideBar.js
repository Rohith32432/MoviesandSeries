import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import Search from './sub/search';
import { FaUser} from "react-icons/fa";
function Sidebar() {
  const [show, setShow] = useState(false);
  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark" style={{ height: '100vh', width: 'max-content',position:'fixed',zIndex:99 }}>
        <Container className='h-100 d-flex flex-column justify-content-start align-items-center'>
      
           <Navbar.Brand href="/" className='m-3'  > <RiMovie2Fill  size={50}/></Navbar.Brand>
         
          <Nav className="flex-column my-5">
            <Link to="/ " className='nav-link m-2'><FaHome size={35} /></Link>
            <Link to="/series" className=' nav-link m-2'><MdMovie size={35}/></Link>
            <div className='nav-link m-2' onClick={()=>{setShow(true)}}><IoSearch size={35}/></div>
            <Link to={'/watchlist'} className='nav-link m-2'  ><FaUser size={35}/></Link>
          </Nav>

        </Container>
      </Navbar>
      <Search show={show} setShow={setShow} name={null} />
    </>
  );
}

export default Sidebar;
