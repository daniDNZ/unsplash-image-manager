import { Box } from '@mui/material'

const Footer = () => {
  return (
    <Box component='footer' display='flex' justifyContent='center' p='1rem' backgroundColor='black' color='white' mt='auto'>
      <Box component='span' sx={{ alignText: 'center' }}>
        Made with ♡ Dani Sanz
      </Box>
    </Box>
  )
}

export default Footer
