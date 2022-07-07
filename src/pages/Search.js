import { Box, Typography } from '@mui/material'
import FoundPics from '../features/foundPics/FoundPics'
import SearchPics from '../features/searchPics/SearchPics'

const Search = () => {
  return (
    <>
      <Box mt='2rem'>
        <Typography variant='h3' component='h1' align='center' fontWeight={600} sx={{ flexGrow: 1 }}>
          Encuentra la foto perfecta
        </Typography>
        <SearchPics />
      </Box>
      <FoundPics />
    </>
  )
}

export default Search
