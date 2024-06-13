import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter/counterSlice'


export const Store = configureStore({
  reducer: {counter:counterReducer},
})