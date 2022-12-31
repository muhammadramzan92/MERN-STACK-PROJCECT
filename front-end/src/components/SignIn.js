import React from 'react'
import {useState} from 'react'
import {signinUser} from '../reducers/authReducer'
import {useDispatch,useSelector} from 'react-redux'
import { NavLink, useNavigate} from "react-router-dom";
export default function SignIn() {

   
    const {loading,error} = useSelector(state=>state.user)
 
    const [logUser, setlogUser] = useState({
        email: "",
        userpassword: ""
        });
        
        const dispatch = useDispatch()
       const navigateto= useNavigate(); 
      const handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        console.log(value);
        const new_value = (name === "email") ? value.toLowerCase() : value;
        setlogUser((prev) => {
          return {
            ...prev, [name]: new_value
    
          }
        })
      }
    
        const handleSubmit1 = (e) => {
          e.preventDefault()
       
         
          const {email,password}=logUser
          dispatch(signinUser({email,password}))
       
        }
     
  return (
    <div className='signin_main'>
            {loading &&
             <div className="progress">
                <div className="indeterminate"></div>
            </div>
               
            }
            <h1 className='main_heading'>Please SignIn!</h1>
            {error && 
            <h5>{error}</h5>
            }

            <div className="container">
                    <form action="" id="form1" className="form" onSubmit={handleSubmit1} name='loginform'>
                        <div className="form-control">
                            <label>UserEmail</label>
                            <input type="email" id="username1" name='email' onChange={handleChange} placeholder="Enter Email" />
                            <small>Error massage</small>
                        </div>
                       
                        <div className="form-control">
                            <label>Password</label>
                            <input type="text" id="password1" name='password' onChange={handleChange} placeholder="Enter Password" />
                            <small>Error massage</small>
                        </div>
                        <button type='submit'>Login</button>
                    </form>

                    <div className="goto_singup"><NavLink to="signup"><button>got to Sign-Up</button></NavLink>  </div>
                </div>


            {/* <label htmlFor="Email">Email</label>
            <input 
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <label htmlFor="Password">password</label>
            <input 
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
           
            <button className="btn #ff4081 pink accent-2" onClick={()=>authenticate()}>Signin</button>
            <div className="goto_singup"><NavLink to="signup"><button>got to Sign-Up</button></NavLink>  </div> */}
        </div>
    )
  
}

