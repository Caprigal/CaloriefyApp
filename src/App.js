import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/layout/Navbar'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Home from './pages/Home'
import Burn from './pages/Burn'
import NotFound from './pages/NotFound'
import Intake from './pages/Intake'
import Signin from './pages/Signin'
import Register from './pages/Register'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { CalorieNinjaProvider } from './context/calorieninja/CalorieNinjaContext'
import { SidebarProvider } from './context/sidebar/SidebarContext'
import { CaloriefyDbProvider } from './context/caloriefydb/CaloriefyDbContext'

function App() {
  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <CalorieNinjaProvider>
          <CaloriefyDbProvider>
            <SidebarProvider>
              <Router>
                <Navbar elevation={20} position='relative' />
                <Container maxWidth='md'>
                  <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/burn' element={<Burn />} />
                    <Route path='/intake' element={<Intake />} />
                    <Route path='/signin' element={<Signin />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/notfound' element={<NotFound />} />
                    <Route path='/*' element={<NotFound />} />
                  </Routes>
                </Container>
              </Router>
              <ToastContainer
                position='bottom-right'
                autoClose={3000}
                theme='colored'
              />
            </SidebarProvider>
          </CaloriefyDbProvider>
        </CalorieNinjaProvider>
      </ThemeProvider>
  )
}

export default App
