import MenuIcon from '@mui/icons-material/Menu'
import { AppBar, Box, IconButton, MenuItem, Toolbar, Typography, Menu, Link } from '@mui/material'
import { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <header>
      <Box>
        <AppBar position='static' color='primary'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              <Link component={RouterLink} to='/' underline='none' color='white'>
                Image Manager
              </Link>
            </Typography>
            <IconButton
              size='large'
              edge='start'
              color='inherit'
              aria-label='menu'
              onClick={handleMenu}
              sx={{ padding: '.5rem' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link component={RouterLink} to='/' underline='none'>Search</Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link component={RouterLink} to='my-photos' underline='none'>My Photos</Link>
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
      </Box>
    </header>
  )
}

export default Header
