import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {fetch2,fetch3,fetch4} from '../helpers/fetch2'
const initialState = ['empty'];

export const createTodo = createAsyncThunk(
    'user/createtodo',
    async (body,thunkAPI)=>{
        console.log("data from reducer:",body.data);
       const result =  await fetch2('/createtodo',body.data)
       console.log("api result:",result);
       return result  
    }
)
export const fetchTodo = createAsyncThunk(
    'fetchtodos',
    async ()=>{
       const result =  await fetch3('/gettodos',"get")
       return result  
    }
)

export const updateTodo = createAsyncThunk(
    // "Authorization":localStorage.getItem('token')
    'todo/updateTodo',
    async (data, thunkAPI)=>{
        console.log(data);
        const dataPass = {
            method:"post",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(data)
        }
       const result =  await fetch(`/update/${data._id}`,dataPass)
       return result.json();
    }
)
export const deleteTodo = createAsyncThunk(
    'deletetodo',
    async (id)=>{
       const result =  await fetch3(`/remove/${id}`,"delete")
       return result  
    }
)

const todoReducer = createSlice({
    name:"todo",
    initialState,
    reducers:{
    },
    extraReducers:{
        [createTodo.fulfilled]:(state,{payload:{message}})=>{
            if(message) state.push(message)
        },
        [fetchTodo.fulfilled]:(_state,{payload:{message}})=>{
            return message
        },
        [deleteTodo.fulfilled]:(state,{payload:{message}})=>{
           const removedTodo =  state.filter(item=>{
                return item._id !== message._id
            })
            return removedTodo
        },
        [updateTodo.fulfilled]:(state,action)=>{
            if(action.payload.result){
                state.push(action.payload.result)
            }
           
            // const updateTodo =  state.filter(item=>{
            //      return item._id !== message._id
            //  })
            //   return message
          //  return message
         }
        // [updateTodo.fulfilled]:(state,{payload:{message}})=>{
        //     const updatedTodo = message;
        //     const newState = state.map(todo => {
        //         if(todo._id === updatedTodo._id) {
        //             return {
        //                 ...todo,
        //                 ...updatedTodo
        //             }
        //         }
        //         return todo;
        //     });
        //     return newState;
        // }

    }

})

export default todoReducer.reducer