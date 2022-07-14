import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Gallery from '../../components/Gallery'
import { selectFilteredFavImages, selectOrderTerm } from './favImagesSlice'

const FavImages = () => {
  const favImages = useSelector(selectFilteredFavImages)
  const arrImages = [...favImages.totalImages]

  const favsOrderTerm = useSelector(selectOrderTerm)

  arrImages.sort((a, b) => b[favsOrderTerm] - a[favsOrderTerm])

  const [imagesObj, setImagesObj] = useState({
    results: arrImages.slice(0, 30),
    totalPages: 1,
    currentPage: 1,
    totalImages: arrImages
  })

  useEffect(() => {
    const totalPages = Math.ceil(arrImages.length / 30)

    setImagesObj({
      ...imagesObj,
      results: arrImages.slice(0, 30),
      totalImages: arrImages,
      totalPages
    })
  }, [favsOrderTerm, favImages])

  return (
    <Gallery imagesObj={imagesObj} favGallery setImagesObj={setImagesObj} />
  )
}

export default FavImages
