import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const searchImages = createAsyncThunk(
  'foundImages/fetchImages',
  async (searchTerm) => {
    const options = {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_ACCESS_KEY}`
      }
    }
    let url
    searchTerm.length !== 0
      ? url = `${process.env.REACT_APP_API_URI}/search/photos?query=${searchTerm}&per_page=30`
      : url = `${process.env.REACT_APP_API_URI}/photos?per_page=30&order_by=popular`
    const data = await fetch(url, options)
    const json = await data.json()

    if (searchTerm.length !== 0) return json.results

    return json
  }
)

export const foundImagesSlice = createSlice({
  name: 'foundImages',
  initialState: {
    images: [],
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
