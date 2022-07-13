import { Box, Typography } from '@mui/material'
import SearchTerm from '../features/searchTerm/SearchTerm'
import FoundImages from '../features/foundImages/FoundImages'

const Search = () => {
  return (
    <>
      <Box mt='2rem'>
        <Typography variant='h3' component='h1' align='center' fontWeight={600} sx={{ flexGrow: 1 }}>
          Encuentra la foto perfecta
        </Typography>
        <SearchTerm />
      </Box>
      <FoundImages />
    </>
  )
}

export default Search
