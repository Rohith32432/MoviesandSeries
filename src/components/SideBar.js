import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome } from "react-icons/fa";
import { MdMovie } from "react-icons/md";
import { RiMovie2Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';
function Sidebar() {
  return (
    <>
      <Navbar expand="lg" className="bg-dark navbar-dark" style={{ height: '100vh', width: 'max-content' }}>
        <Container className='h-100 d-flex flex-column justify-content-start align-items-center'>
          <Navbar.Brand href="#home" className='m-3' ><RiMovie2Fill  size={50}/></Navbar.Brand>
          <Nav className="flex-column my-5">
            <Link to="/home " className='nav-link m-2'><FaHome size={35} /></Link>
            <Link to="/series" className=' nav-link m-2'><MdMovie size={35}/></Link>
          </Nav>

        </Container>
      </Navbar>
    </>
  );
}

export default Sidebar;
