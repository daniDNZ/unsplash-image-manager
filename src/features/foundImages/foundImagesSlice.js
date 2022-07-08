import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// REVISAR
export const searchImages = createAsyncThunk(
  'foundImages/fetchImages',
  async (searchTerm) => {
    console.log(searchTerm)
    const options = {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
      }
    }
    const data = await fetch(`${process.env.REACT_APP_API_URI}/search/photos?query=${searchTerm}`, options)
    const json = await data.json()

    return json
  }
)

export const foundImagesSlice = createSlice({
  name: 'foundImages',
  initialState: {
    images: undefined,
    isLoadingFoundImages: false,
    hasError: false
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchImages.pending, state => {
        state.isLoadingFoundImages = true
        state.hasError = false
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.isLoadingFoundImages = false
        state.hasError = false
        state.images = action.payload
      })
      .addCase(searchImages.rejected, state => {
        state.isLoadingFoundImages = false
        state.hasError = true
        state.images = []
      })
  }
})

export const selectFoundImages = (state) => state.foundImages.images
export const isLoadingFoundImages = (state) => state.foundImages.isLoadingFoundImages
export const hasErrorFoundImages = (state) => state.foundImages.hasError

export default foundImagesSlice.reducer
