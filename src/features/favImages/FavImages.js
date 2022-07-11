import { useSelector } from 'react-redux'
import Gallery from '../../components/Gallery'
import { selectFavImages } from './favImagesSlice'

const FavImages = () => {
  const favImages = useSelector(selectFavImages)

  return (
    <Gallery itemData={favImages} addDate />
  )
}

export default FavImages
