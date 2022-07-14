import { Box, Typography } from '@mui/material'
import SearchBox from '../components/SearchBox'
import SearchImages from '../features/searchImages/SearchImages'

const Search = () => {
  return (
    <>
      <Box mt='2rem'>
        <Typography variant='h3' component='h1' align='center' fontWeight={600} sx={{ flexGrow: 1 }}>
          Encuentra la foto perfecta
        </Typography>
        <SearchBox />
      </Box>
      <SearchImages />
    </>
  )
}

export default Search
