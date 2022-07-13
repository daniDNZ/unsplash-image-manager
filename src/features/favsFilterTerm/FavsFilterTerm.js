import { TextField } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { selectFavsFilterTerm, setFavsFilterTerm } from './favsFilterTermSlice'

const FilterTerm = () => {
  const dispatch = useDispatch()

  return (

    <TextField id='filterTerm' label='Filtrar por descripción' variant='outlined' defaultValue={useSelector(selectFavsFilterTerm)} onChange={e => dispatch(setFavsFilterTerm(e.target.value))} />

  )
}

export default FilterTerm
