import { useSelector } from 'react-redux'
import Gallery from '../../components/Gallery'
import { selectFilteredFavImages, selectOrderTerm } from './favImagesSlice'

const FavImages = () => {
  const favImages = useSelector(selectFilteredFavImages)
  const arrImages = [...favImages]

  const favsOrderTerm = useSelector(selectOrderTerm)
  arrImages.sort((a, b) => b[favsOrderTerm] - a[favsOrderTerm])

  return (
    <Gallery arrImages={arrImages} favModal />
  )
}

export default FavImages
