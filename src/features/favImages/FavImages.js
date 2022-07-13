import { useSelector } from 'react-redux'
import Gallery from '../../components/Gallery'
import { selectFilteredFavImages, selectOrderTerm } from './favImagesSlice'

const FavImages = () => {
  const favImages = useSelector(selectFilteredFavImages)
  const arrImages = [...favImages]
  // const filterTerm = useSelector(selectFilterTerm)
  // let arrImages = []

  // // Sort and filter
  // const regEx = /[a-zA-Z0-9]/ // to fix crash when user input some symbols like + in first character

  // if ((filterTerm && regEx.test(filterTerm))) {
  //   arrImages = [...favImages.filter(item => {
  //     return item.description !== null
  //       ? item.description.search(filterTerm.trim()) !== -1
  //       : false
  //   })]
  // } else arrImages = [...favImages]

  const favsOrderTerm = useSelector(selectOrderTerm)
  arrImages.sort((a, b) => b[favsOrderTerm] - a[favsOrderTerm])

  return (
    <Gallery arrImages={arrImages} favModal />
  )
}

export default FavImages
