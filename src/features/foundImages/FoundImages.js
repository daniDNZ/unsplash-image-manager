import Gallery from '../../components/Gallery'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchTerm } from '../searchTerm/searchTermSlice'
import { useEffect } from 'react'
import { hasErrorFoundImages, isLoadingFoundImages, searchImages, selectFoundImages } from './foundImagesSlice'

const FoundImages = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const images = useSelector(selectFoundImages).results
  const imagesAreLoading = useSelector(isLoadingFoundImages)
  const imagesHasError = useSelector(hasErrorFoundImages)

  useEffect(() => {
    dispatch(searchImages(searchTerm))
  }, [dispatch, searchTerm])

  if (imagesAreLoading) return <div>Loading Images</div>
  if (!searchTerm) return null
  if (imagesHasError) {
    return <div>No podemos conectar con el servidor. Inténtelo más tarde</div>
  }
  return (
    <Gallery itemData={images} />
  )
}

export default FoundImages
