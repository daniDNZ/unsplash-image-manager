import { configureStore } from '@reduxjs/toolkit'
import favsFilterTermReducer from '../features/favsFilterTerm/favsFilterTermSlice'
import favsOrderTermReducer from '../features/favsOrderTerm/favsOrderTermSlice'
import foundImagesReducer from '../features/foundImages/foundImagesSlice'
import searchTermReducer from '../features/searchTerm/searchTermSlice'

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    favsOrderTerm: favsOrderTermReducer,
    favsFilterTerm: favsFilterTermReducer,
    foundImages: foundImagesReducer
  }
})
