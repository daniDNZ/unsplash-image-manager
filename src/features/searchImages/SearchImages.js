import Gallery from '../../components/Gallery'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectStatusSearchImages, selectSearchTerm, searchImages, selectSearchImages } from './searchImagesSlice'
import { useDebounce } from '../../utils/hooks'
import { Alert, CircularProgress } from '@mui/material'

const SearchImages = () => {
  const dispatch = useDispatch()

  const searchTerm = useSelector(selectSearchTerm)
  const images = useSelector(selectSearchImages)
  const status = useSelector(selectStatusSearchImages)
  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(searchImages({ searchTerm: debouncedSearchTerm }))
  }, [dispatch, debouncedSearchTerm])

  switch (status) {
    case 'fulfilled':
      return <Gallery imagesObj={images} />
    case 'error':
      return <Alert severity='error' sx={{ margin: '1rem 0' }}>No podemos conectar con el servidor. Inténtelo más tarde</Alert>
    case 'loading':
    default:
      return <CircularProgress sx={{ display: 'block', margin: '2rem auto' }} />
  }
}

export default SearchImages
