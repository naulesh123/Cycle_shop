import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  deleted_index:0,
  deleted_number:-1,
  updated_array:[],
  name_of_seller:'',

//////////////
user_name:'',
user_title:'',
user_phone_no:'',
user_id:''

//////////////

}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },



    index_of_delete:(state,action)=>{
    state.deleted_index=action.payload
    },
    number_of_delete:(state,action)=>{
        state.deleted_number=action.payload
    },
    updating_array:(state,action)=>{
        state.updated_array=action.payload    
    },
    updating_sellername:(state,action)=>{
      state.name_of_seller=action.payload
    },
    updating_user_name:(state,action)=>{
     state.user_name=action.payload
    },
    updating_user_title:(state,action)=>{
     state.user_title=action.payload
    },
    updating_user_phone_no:(state,action)=>{
     state.user_phone_no=action.payload
    },
    updating_user_id:(state,action)=>{
      state.user_id=action.payload
    }






  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount ,index_of_delete,number_of_delete,updating_array,updating_sellername,updating_user_name,updating_user_title,updating_user_phone_no
  ,updating_user_id
} = counterSlice.actions

export default counterSlice.reducer