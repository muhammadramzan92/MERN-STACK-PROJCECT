
import {useEffect} from 'react';
import './App.css';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Todo from './components/Todo';
import {addToken} from './reducers/authReducer'
import {useSelector,useDispatch} from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
         <Router>
         <Routes>
              
             <Route exact path='/signup' element={<SignUp />}></Route>
             <Route path='/' element={token ? <Todo /> :<SignIn />}></Route>
              <Route path='/Todo' element={<Todo />}></Route>
            {/* <Route path='*' element={<Errorpage />}></Route> */}
           </Routes>
         </Router> 
     </>
    
  );
}

export default App;



