import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTodo,fetchTodo, deleteTodo } from "../reducers/todoReducers";
import { Card } from 'react-bootstrap';
import { Modal } from "./Modal";
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
export default function Showactivity() {
  //
  const [updatedata,setupdatedata] = useState("")
  //
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);
  // const [todoList,settodoList] = useState([{},{},{}])
  // const { discription, ActivityType, duration, date}=todos

let handleDelete = (e)=>{
console.log(e)
}

  useEffect(()=>{
    console.log("todo useffect",todos);
  },[todos])
  
  useEffect(() => {
    dispatch(fetchTodo());
  }, []);

  let handleUpdate = (e)=>{
    console.log("updated data",e);
    setupdatedata(e)
  }

  return (
<>
  <Modal updatedata={updatedata} />
<h2>"data is coming"</h2>
{todos.map(e=><div class="card" style={{width: "18rem"}}>
  <div class="card-body">
  <label htmlFor="dis">Discription</label>
  <li className="list-group-item"> {e.discription}</li>
  <label htmlFor="">Activity type</label>
          <li className="list-group-item">{e.ActivityType}</li>
          <label htmlFor="dur">Duraction</label>
          <li className="list-group-item">{e.duration}</li>
          <label htmlFor="">Date</label>
          <li className="list-group-item">{e.date}</li>
          <li className="list-group-item"> <button onClick={() => dispatch(deleteTodo(e._id))}>delete</button></li>
          <li className="list-group-item"> <button data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleUpdate(e)}>Update</button></li>
    {/* <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
    <a href="#" class="card-link">Another link</a> */}
  </div>

</div>)}
</>
  );
}
