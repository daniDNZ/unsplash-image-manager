import { createSlice } from '@reduxjs/toolkit'

export const favsFilterTermSlice = createSlice({
  name: 'favsFilterTerm',
  initialState: {
    value: ''
  },
  reducers: {
    setFavsFilterTerm: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setFavsFilterTerm } = favsFilterTermSlice.actions

export const selectFavsFilterTerm = (state) => state.favsFilterTerm.value

export default favsFilterTermSlice.reducer
