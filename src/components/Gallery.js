import { ImageList } from '@mui/material'
import ImageModal from '../features/imageModal/ImageModal'
import Image from './Image'

const Gallery = ({ arrImages, favModal }) => {
  let rowHeight = 120
  if (window.screen.width >= 1024) rowHeight = 240
  console.log(arrImages)

  return (
    <>
      <ImageList cols={3} variant='quilted' rowHeight={rowHeight}>
        {arrImages.map((item) => (
          <Image key={item.id} item={item} arrImages={arrImages} rowHeight={rowHeight} />
        ))}
      </ImageList>
      <ImageModal favModal={favModal} arrImages={arrImages} />
    </>
  )
}

export default Gallery
