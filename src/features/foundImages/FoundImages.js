import Gallery from '../../components/Gallery'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchTerm } from '../searchTerm/searchTermSlice'
import { useEffect } from 'react'
import { hasErrorFoundImages, isLoadingFoundImages, searchImages, selectFoundImages } from './foundImagesSlice'
import { useDebounce } from '../../utils/hooks'

const FoundImages = () => {
  const dispatch = useDispatch()

  const searchTerm = useSelector(selectSearchTerm)
  const images = useSelector(selectFoundImages)
  const imagesAreLoading = useSelector(isLoadingFoundImages)
  const imagesHasError = useSelector(hasErrorFoundImages)

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    dispatch(searchImages(debouncedSearchTerm))
  }, [dispatch, debouncedSearchTerm])

  if (imagesAreLoading) return <div>Loading Images</div>
  if (imagesHasError) {
    return <div>No podemos conectar con el servidor. Inténtelo más tarde</div>
  }
  return (
    <Gallery arrImages={images} />
  )
}

export default FoundImages
