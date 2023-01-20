
import {useEffect} from 'react';
import React from 'react'
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import CreateActivity from './components/CreateActivity';
import Showactivity from './components/Showactivity';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Todo from './components/Todo';
import {addToken} from './reducers/authReducer'
import {useSelector,useDispatch} from 'react-redux'
import {logout} from './reducers/authReducer';
import {Link} from 'react-router-dom'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import {LinkContainer} from 'react-router-bootstrap'

function App() {
  const token = useSelector((state)=>state.user.token)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(addToken())
  },[])
  // {
  //   token ? <Todo /> :<SignIn />

  // }  
  console.log("token",token)
  return (
    <>
    
      <Navbar bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Excercise Tracker</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/Showactivity">Show Activity</Nav.Link>
<Nav.Link href="/CreateActivity">Create Activity</Nav.Link>
            {/* <Link to="/CreateActivity">Create Activity</Link> */}
            {/* <Link to="/Showactivity">Show Activity</Link> */}
{/* <LinkContainer to="/service">
<Nav.Link>Create Activity</Nav.Link>
</LinkContainer> */}
    
            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/signup">SignUp</NavDropdown.Item>
              <NavDropdown.Item href="/">
                signIn
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="" onClick={()=>dispatch(logout()) }>  
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
    

     
        
  
    {/* <CreateActivity/> */}
    <BrowserRouter>
         {/* <Router> */}
         <Routes>
             <Route exact path='/signup' element={<SignUp />}></Route>
             <Route path='/' element={token ? <Todo /> :<SignIn />}></Route>
              <Route path='/Todo' element={<Todo />}></Route>
              <Route path='/CreateActivity' element={<CreateActivity />}></Route>
              <Route path='/update/:id' element={<CreateActivity />}></Route>
              <Route path='/Showactivity' element={<Showactivity />}></Route>
            {/* <Route path='*' element={<Errorpage />}></Route> */}
           </Routes>
         {/* </Router>  */}
         </BrowserRouter>
     </>
    
  );
}

export default App;



