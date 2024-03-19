import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import './style.css'
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
      <Navbar expand="lg" className="bg-dark navbar-dark " id='sidebar' >
        <Container className='h-100 d-flex flex-lg-column flex-sm-row  justify-content-lg-start justify-content-sm-center align-items-center' >
      
           <Navbar.Brand href="/" className='m-lg-3 m-sm-0 d-sm-none d-lg-block'  > <RiMovie2Fill  size={50}/></Navbar.Brand>
         
          <Nav className="flex-lg-column flex-sm-row  flex-xs-row my-lg-5 m-sm-0 gap-sm-4 gap-lg-0 " id='container'>
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
