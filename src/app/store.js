import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counterExample/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})
