import { Routes, Route } from 'react-router-dom'
import { Layout } from './layout/Layout'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import {LoginPage} from './pages/LoginPage'

const App = () =>
{
  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>
        <Route index element={ <HomePage /> } />
        <Route path='register' element={ <RegisterPage /> } />
        <Route path='log-in' element={<LoginPage />} />
      </Route>
    </Routes>
  )
};

export default App;