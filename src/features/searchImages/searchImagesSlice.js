import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const searchImages = createAsyncThunk(
  'searchImages/fetchImages',
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

export const searchImagesSlice = createSlice({
  name: 'searchImages',
  initialState: {
    results: [],
    status: null,
    term: ''
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchImages.pending, state => {
        state.status = 'loading'
      })
      .addCase(searchImages.fulfilled, (state, action) => {
        state.status = null
        state.results = action.payload
      })
      .addCase(searchImages.rejected, state => {
        state.status = 'error'
      })
  }
})

export const { setSearchTerm } = searchImagesSlice.actions

export const selectSearchImages = (state) => state.searchImages.results
export const selectStatusSearchImages = (state) => state.searchImages.status
export const selectSearchTerm = (state) => state.searchImages.term

export default searchImagesSlice.reducer
