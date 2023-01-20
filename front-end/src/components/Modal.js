import React, { useEffect } from "react";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import { updateTodo,createTodo } from "../reducers/todoReducers";

export const Modal = (props) => {
  const dispatch = useDispatch();
  const [typeList, setTypeList] = useState(['Run', 'Bicycle', 'Swim', 'Walk', 'Hike']);
  const { loading, error } = useSelector((state) => state.user);
  // const [preData, setPreData] = useState('empty');
  const [preData, setPreData] = useState({
    discription: "",
    ActivityType: "",
    duration: "",
    date: "",
  });

  useEffect((e) => {
    setPreData(props.passUpdatedata);
  },[props.passUpdatedata])

  const handleChange = (event) => {

    setPreData({ ...preData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('from modal',preData);
    dispatch(updateTodo(preData));
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
                        value={preData.discription}
                        onChange={handleChange}
                        placeholder="Please enter activity Description"
                      ></textarea>
                      <small>Error massage</small>
                    </div>
                    <div className="my-form-control">
                      <label htmlFor="ActivityType">Select Activity Type</label>
                      <select
                        name="ActivityType"
                        value={preData.ActivityType}
                        onChange={handleChange}
                        id="ActivityType"
                        form="form"
                      >
                        {
                          typeList.map((data) => {
                            if(data === preData.ActivityType){
                              return <option value={preData.ActivityType} selected>{preData.ActivityType}</option>
                            }else{
                              return <option value={data}>{data}</option>
                            }
                          })
                        }
                      </select>
                    </div>
                    <div className="my-form-control">
                      <label htmlFor="duration">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        value={preData.duration}
                        onChange={handleChange}
                        id="duration"
                        placeholder="Enter Time In Minutes"
                      />
                    </div>
                    <div className="my-form-control">
                      <label htmlFor="date">Date</label>
                      <input
                        type="text"
                        name="date"
                        value={preData.date}
                        onChange={handleChange}
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
