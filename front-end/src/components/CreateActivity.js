import React, { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {createTodo} from '../reducers/todoReducers';

function CreateActivity() {
  const [data, setData] = useState({
    discription: "",
    ActivityType: "",
    duration: "",
    date: "",
  });
//   const addTodo = ()=>{
//     dispatch(createTodo({todo:data}))
//    }
   
  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
//  
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data=> from frontend",data);
   
    // dispatch(createTodo({todo:data}));
    dispatch(createTodo({data}));
    setData({ discription: "", ActivityType: "", duration: "", date: "" });
   
  };

  return (
    <div className="signin_main ">
      {loading && (
        <div className="progress">
          h1
          <div className="indeterminate"></div>
        </div>
      )}
      <h1 className="main_heading ">Create An Activity</h1>
      {error && <h5>{error}</h5>}

      <div className="my-container">
       
        <form
          action=""
          id="form"
          onSubmit={handleSubmit}
          name="form"
          className="form"
        >
          <div className="my-form-control">
            <label>Description</label>
            <textarea
              name="discription"
              id="aboutActivty"
              cols="30"
              rows="10"
              value={data.discription} 
              onChange={handleChange}
              placeholder="Please enter activity Description"
            ></textarea>
            <small>Error massage</small>
          </div>
          
          <div className="my-form-control">
          <label htmlFor="ActivityType">Select Activity Type</label>
            <select name="ActivityType"value={data.ActivityType} 
              onChange={handleChange} id="ActivityType" form="form">
              <option value="bicycle ride">bicycle ride</option>
              <option value="cycling">cycling</option>
              <option value="Swimming">Swimming</option>
              <option value="Hiking">Hiking</option>
              <option value="Running">Running</option>
            </select>
          </div>
          <div className="my-form-control">
            <label htmlFor="duration">Duration</label>
            <input type="text" name="duration"
            value={data.duration} 
              onChange={handleChange}
               id="duration" placeholder="Enter Time In Minutes" />
          </div>
          <div className="my-form-control">
            <label htmlFor="date">Date</label>
            <input type="text" name="date"
            value={data.data} 
              onChange={handleChange} 
              className="date" placeholder="dd/mm/yyyy" />
          </div>
          <button type="submit">Submit Activity</button>
        </form>
      </div>
    </div>
  );
}

export default CreateActivity;
