import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link } from "react-router-dom";

function Appbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="dark" className='app-bar'>
      <Container fluid>
        <Link to='/' className='linkk'><img className='applogo'  src='/images/logoimg.png'/> TODOS</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">  
          </Nav>
          
          <Nav>
            <Link to='/' className='linkk' >Home</Link>
            <Link to='/about' className='linkk' >About Us</Link>
            <Link to='/app-desc' className='linkk' >App Description</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Appbar;