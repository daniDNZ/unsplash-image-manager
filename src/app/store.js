import { configureStore } from '@reduxjs/toolkit'
import favImagesReducer from '../features/favImages/favImagesSlice'
import favsFilterTermReducer from '../features/favsFilterTerm/favsFilterTermSlice'
import favsOrderTermReducer from '../features/favsOrderTerm/favsOrderTermSlice'
import foundImagesReducer from '../features/foundImages/foundImagesSlice'
import imageModalReducer from '../features/imageModal/imageModalSlice'
import searchTermReducer from '../features/searchTerm/searchTermSlice'

export const store = configureStore({
  reducer: {
    searchTerm: searchTermReducer,
    favsOrderTerm: favsOrderTermReducer,
    favsFilterTerm: favsFilterTermReducer,
    foundImages: foundImagesReducer,
    favImages: favImagesReducer,
    imageModal: imageModalReducer
  }
})
