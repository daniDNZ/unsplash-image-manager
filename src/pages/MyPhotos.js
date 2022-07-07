import { FilterList } from '@mui/icons-material'
import { Typography, Box, IconButton } from '@mui/material'
import FavPics from '../features/favPics/FavPics'
import FilterFavPics from '../features/filterFavPics/FilterFavPics'

const MyPhotos = () => {
  return (
    <>
      <Box mt='2rem' display='flex' justifyContent='space-between'>
        <Typography variant='h4' component='h2'>
          My Photos
        </Typography>
        <IconButton aria-label='filter'>
          <FilterList />
        </IconButton>
      </Box>
      <FilterFavPics />
      <FavPics />
    </>
  )
}

export default MyPhotos
