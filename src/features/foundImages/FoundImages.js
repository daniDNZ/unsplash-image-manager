import Gallery from '../../components/Gallery'
import { useDispatch, useSelector } from 'react-redux'
import { selectSearchTerm } from '../searchTerm/searchTermSlice'
import { useEffect } from 'react'
import { hasErrorFoundImages, isLoadingFoundImages, searchImages, selectFoundImages } from './foundImagesSlice'

const FoundImages = () => {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const images = useSelector(selectFoundImages)
  const imagesAreLoading = useSelector(isLoadingFoundImages)
  const imagesHasError = useSelector(hasErrorFoundImages)

  console.log('searchterm ' + searchTerm)
  console.log('images: ' + images)
  console.log('images loading: ' + imagesAreLoading)
  console.log('Error: ' + imagesHasError)

  useEffect(() => {
    searchImages(searchTerm)
  }, [dispatch, searchTerm])

  if (imagesAreLoading) return <div>Loading Images</div>
  if (!searchTerm) return null
  return (
    <Gallery itemData={[]} />
  )
}

export default FoundImages
