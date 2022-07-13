import Gallery from '../../components/Gallery'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { selectStatusSearchImages, selectSearchTerm, searchImages, selectSearchImages } from './searchImagesSlice'
import { useDebounce } from '../../utils/hooks'

const SearchImages = () => {
  const dispatch = useDispatch()

  const searchTerm = useSelector(selectSearchTerm)
  const images = useSelector(selectSearchImages)
  const status = useSelector(selectStatusSearchImages)

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(searchImages(debouncedSearchTerm))
  }, [dispatch, debouncedSearchTerm])

  switch (status) {
    case 'loading':
      return <div>Loading Images</div>
    case 'error':
      return <div>No podemos conectar con el servidor. Inténtelo más tarde</div>
    default:
      return <Gallery arrImages={images} />
  }
}

export default SearchImages
