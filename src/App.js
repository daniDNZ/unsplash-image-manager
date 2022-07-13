import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from './pages/Search'
import MyPhotos from './pages/MyPhotos'
import Header from './layout/Header'
import Footer from './layout/Footer'
import { Box, Container, CssBaseline } from '@mui/material'

function App () {
  return (
    <Box className='app' height='100vh' display='flex' flexDirection='column' justifyContent='space-between'>
      <CssBaseline />
      <Header />
      <main>
        <Container maxWidth='lg'>
          <Routes>
            <Route path='/' element={<Search />} />
            <Route path='my-photos' element={<MyPhotos />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Box>
  )
}

export default App
