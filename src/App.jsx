import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import {selectEmail,setEmail} from './featuers/user/userSlice'
import { firebaseAuth } from './config/firebase'
import {Protected} from './components/Protected'
import { Layout } from './layout/Layout'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import {LoginPage} from './pages/LoginPage'

const App = () =>
{
  const dispatch = useDispatch();
  const userEmail = useSelector( selectEmail );
  const [ isLoggedIn, setIsLoggedIn ] = useState( null );

  onAuthStateChanged( firebaseAuth, ( user ) =>
  {
    if ( !user )
    {
      setIsLoggedIn(false)
      console.log('You Must Sign In')
    } else
    {
      dispatch( setEmail() );
      setIsLoggedIn(true)
      console.log(userEmail)
    }
  } )
  
  useEffect( () =>
  {
    
  })

  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>
        <Route index element={
            <Protected isLoggedIn={ isLoggedIn }>
              <HomePage />
            </Protected> } />
        <Route path='register' element={ <RegisterPage /> } />
        <Route path='log-in' element={<LoginPage />} />
      </Route>
    </Routes>
  )
};

export default App;