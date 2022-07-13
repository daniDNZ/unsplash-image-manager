import { useSelector } from 'react-redux'
import Gallery from '../../components/Gallery'
import { selectFavsFilterTerm } from '../favsFilterTerm/favsFilterTermSlice'
import { selectFavsOrderTerm } from '../favsOrderTerm/favsOrderTermSlice'
import { selectFavImages } from './favImagesSlice'

const FavImages = () => {
  const favImages = useSelector(selectFavImages)
  const favsFilterTerm = useSelector(selectFavsFilterTerm)
  let arrImages = []

  // Sort and filter
  if (favsFilterTerm !== '') {
    arrImages = [...favImages.filter(item => {
      return item.description !== null
        ? item.description.search(favsFilterTerm) !== -1
        : false
    })]
  } else arrImages = [...favImages]

  const favsOrderTerm = useSelector(selectFavsOrderTerm)
  arrImages.sort((a, b) => b[favsOrderTerm] - a[favsOrderTerm])

  return (
    <Gallery arrImages={arrImages} favModal />
  )
}

export default FavImages
