import { useSelector } from 'react-redux'
import Gallery from '../../components/Gallery'
import { selectFavImages, selectFilterTerm, selectOrderTerm } from './favImagesSlice'

const FavImages = () => {
  const favImages = useSelector(selectFavImages)
  const filterTerm = useSelector(selectFilterTerm)
  let arrImages = []

  // Sort and filter
  if (filterTerm) {
    arrImages = [...favImages.filter(item => {
      return item.description !== null
        ? item.description.search(filterTerm) !== -1
        : false
    })]
  } else arrImages = [...favImages]

  const favsOrderTerm = useSelector(selectOrderTerm)
  arrImages.sort((a, b) => b[favsOrderTerm] - a[favsOrderTerm])

  return (
    <Gallery arrImages={arrImages} favModal />
  )
}

export default FavImages
