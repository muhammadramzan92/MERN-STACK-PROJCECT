import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/authReducer'
import todoReducer from '../reducers/todoReducers'

export const store = configureStore({
  reducer: {
   user:authReducer,
   todos:todoReducer 
  },
});
















// import { configureStore } from '@reduxjs/toolkit';
// import authreducer from '../reducers/authReducer';

// export const store = configureStore({
//   reducer: {
//     user:authreducer
//   },
// });
