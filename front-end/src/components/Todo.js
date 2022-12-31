import {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {createTodo,fetchTodo,deleteTodo} from '../reducers/todoReducers'
import {logout} from '../reducers/authReducer'
export default function Todo() {
  const [mytodo,setTodo] = useState("")
  const dispatch = useDispatch()
  const todos =  useSelector(state=> state.todos)
  const addTodo = ()=>{
   dispatch(createTodo({todo:mytodo}))
  }
  
  useEffect(()=>{
   dispatch(fetchTodo())
  },[])
  return (
      <div className='todoform signin_main'>
          <input
           placeholder="write todo here"
           value={mytodo}
           onChange={(e)=>setTodo(e.target.value)}
          />
          <div className="todobuttons">
            <button className="formbtns" onClick={()=>addTodo() }>Add todo</button>
            <button className="formbtns" onClick={()=>dispatch(logout()) }>Logout</button>
          </div>
          <ul className="collection">
            
            
            
              {
                  todos.map(item=>{
                      return  <div key={item._id}><li className="collection-item" 
                      
                      >{item.todo} <button onClick={()=>dispatch(deleteTodo(item._id))}>delete</button></li>
                      
                      </div>
          
                  })
              }
             
             
           </ul>
      </div>
  )
}