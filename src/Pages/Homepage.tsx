import React from 'react';
import { Navbar, Container, Offcanvas, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { NavLink,} from "react-router-dom";
import ReactSelect from '../components/ReactSelect';
import  {users} from '../utlitis/Users';




type Props = {
  setValues: (value: number) => void;
}

const Homepage = ({setValues}: Props) => {
  const uid = 4;
  //console.log(values)
  return (
   
    <>
   
    <Navbar bg="light m-4" expand="lg">
      <Container fluid>
        <Navbar.Brand href={`/${uid}/companies`} className='mt-3'><b className='font-weight-bold bg-dark text-light rounded-top p-2'>Arun Stock Exchange</b>
        <p className='bg-danger rounded-bottom text-white mt-2'><small>Traders</small></p> </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            
          >
            <Nav.Link className='mx-2' >
              <NavLink to={`/${uid}/companies`} style={{textDecoration:'none'}}>Companies</NavLink>
            </Nav.Link>
            <Nav.Link className='mx-2' >
              <NavLink to={`/${uid}/portfolio/`} style={{textDecoration:'none'}}>Portfolio</NavLink>
            </Nav.Link>
            <div className='mx-2'>

            <ReactSelect setValues={(value)=>setValues(value)}></ReactSelect>
            </div>
          
          </Nav>
          <Nav>
            <Nav.Link className='mx-2 my-3' >Logged-In: <b className='bg-success rounded p-1 text-white'>{users.find(x=>x.id===uid)?.name}</b></Nav.Link>
          </Nav>
         
           
         
        </Navbar.Collapse>
      </Container>
    </Navbar>
   
 </>
  )
}

export default Homepage