import React, { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateTodo,createTodo } from "../reducers/todoReducers";

export const Modal = ({updatedata}) => {
    //
    //
  const [data, setData] = useState({
    discription: "",
    ActivityType: "",
    duration: "",
    date: "",
  });
  //   const addTodo = ()=>{
  //     dispatch(createTodo({todo:data}))
  //    }

  useEffect(()=>{
    console.log("data from Modal:",updatedata);
    setData(updatedata)
  },[updatedata])

  const { loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();

//   const handleChange = (event) => {
//     setData({ ...data, [event.target.name]: event.target.value });
//   };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("data=> from frontend", data);

    // dispatch(createTodo({todo:data}));
    dispatch(updateTodo({data}));
    // setData({ discription: "", ActivityType: "", duration: "", date: "" });
  };

  return (
    <>
      <div className="signin_main ">
        {loading && (
          <div className="progress">
            h1
            <div className="indeterminate"></div>
          </div>
        )}

        {error && <h5>{error}</h5>}

        
          <form
            action=""
            id="form"
            onSubmit={handleSubmit}
            name="form"
            className="form"
          >
            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="my-form-control">
                      <label>Description</label>
                      <textarea
                        name="discription"
                        id="aboutActivty"
                        cols="30"
                        rows="10"
                        value={setData.discription}
                        // onChange={handleChange}
                        onChange={(e)=>setData({...updatedata,description:e.target.value})}
                        // onChange={(e)=>setData({...setData,handleChange})}
                        placeholder="Please enter activity Description"
                      ></textarea>
                      <small>Error massage</small>
                    </div>
                    <div className="my-form-control">
                      <label htmlFor="ActivityType">Select Activity Type</label>
                      <select
                        name="ActivityType"
                        value={setData.ActivityType}
                        // onChange={handleChange}
                        onChange={(e)=>setData({...updatedata,ActivityType:e.target.value})}
                        // onChange={(e)=>setData({...setData,handleChange})}
                        id="ActivityType"
                        form="form"
                      >
                        <option value="bicycle ride" selected>bicycle ride</option>
                        <option value="cycling">cycling</option>
                        <option value="Swimming">Swimming</option>
                        <option value="Hiking">Hiking</option>
                        <option value="Running">Running</option>
                      </select>
                    </div>
                    <div className="my-form-control">
                      <label htmlFor="duration">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={setData.durationduration}
                        // onChange={handleChange}
                        onChange={(e)=>setData({...updatedata,duration:e.target.value})}
                        // onChange={(e)=>setData({...setData,handleChange})}
                        id="duration"
                        placeholder="Enter Time In Minutes"
                      />
                    </div>
                    <div className="my-form-control">
                      <label htmlFor="date">Date</label>
                      <input
                        type="text"
                        name="date"
                        value={setData.date}
                        // onChange={handleChange}
                        onChange={(e)=>setData({...updatedata,date:e.target.value})}
                        // onChange={(e)=>setData({...setData,handleChange})}
                        className="date"
                        placeholder="dd/mm/yyyy"
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
      </div>
    </>
  );
};
