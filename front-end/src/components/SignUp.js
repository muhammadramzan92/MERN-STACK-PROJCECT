import React from 'react'
import {useState} from 'react'
import {signupUser} from '../reducers/authReducer'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate} from "react-router-dom";


function Signup() {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        cpassword: ""
        
      });
      const {loading,error} = useSelector(state=>state.user)
      
      const dispatch = useDispatch()
      const navigate = useNavigate();
      const handleChange = (event) => {
        
        setData({ ...data, [event.target.name]: event.target.value });
       
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(setData)
        const {name,email,password,cpassword}=data
        
        console.log("Password Checking", data.password, data.cpassword);
        if(data.password===data.cpassword){
            console.log("Password Checking", password, cpassword);
            
            dispatch(signupUser({name,email,password}))
            navigate("/");
           
        }else{
            
           
            alert("both password not match")
            setData({ name: "", email: "" ,password: "",cpassword: ""});
        }
        
        
      }




    
    
    
  return (
    <div className='signin_main '>
    {loading &&
     <div className="progress">h1
        <div className="indeterminate"></div>
    </div>
       
    }
    <h1 className='main_heading '>Please SignUp!</h1>
    {error && 
    <h5>{error}</h5>
    }


    <div className="my-container">
    <h2> {}</h2>
         <form action="" id="form" onSubmit={handleSubmit}  name="form" className='form'>
           
            <div className="my-form-control">
                <label>UserName</label>
                <input type="text" id="username" name='name' value={data.name} onChange={handleChange} placeholder="Enter UserName"/>
                <small>Error massage</small>
            </div>
            <div className="my-form-control">
                <label>Email</label>
                <input type="text" id="email" name='email' value={data.email} onChange={handleChange} placeholder="Enter Email"/>
                <small>Error massage</small>
            </div>
            <div className="my-form-control">
                <label>Password</label>
                <input type="password" id="password" name='password' value={data.password} onChange={handleChange} placeholder="Enter Password"/>
                <small>Error massage</small>
            </div>
            <div className="my-form-control">
                <label>Conform Password</label>
                <input type="password" id="password2" name='cpassword' value={data.cpassword} onChange={handleChange} placeholder="Enter Password"/>
                <small>Error massage</small>
            </div>
            {/* <button>SignUp</button> */}
            {/* <NavLink to="/">
              </NavLink> */}
              <button type="submit">SignUp</button>
        
           
         </form>
        

        
    </div>






</div>
)
 
}

export default Signup