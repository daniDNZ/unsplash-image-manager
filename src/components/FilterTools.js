import { Box } from '@mui/material'
import FavsFilterTerm from '../features/favsFilterTerm/FavsFilterTerm'
import FavsOrderTerm from '../features/favsOrderTerm/FavsOrderTerm'

const FilterTools = ({ isVisible }) => {
  let display = 'none'
  isVisible
    ? display = 'flex'
    : display = 'none'

  return (
    <Box
      id='filterTools' mt='1rem' width='100%' justifyContent='flex-end' gap='1rem' display={display}
    >
      <FavsFilterTerm />
      <FavsOrderTerm />
    </Box>
  )
}

export default FilterTools
