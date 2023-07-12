import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { login, logout } from './featuers/user/userSlice'
import { firebaseAuth } from './config/firebase'
import { Layout } from './layout/Layout'
import { HomePage } from './pages/HomePage'
import { RegisterPage } from './pages/RegisterPage'
import { LoginPage } from './pages/LoginPage'
import { SellingPage } from './pages/SellingPage'
import { ItemsPage } from './pages/ItemsPage'
import { ItemPage } from './pages/ItemPage'
import {CartPage} from './pages/CartPage'
const App = () =>
{
  const [ isLoggedIn, setIsLoggedIn ] = useState( null );
  const dispatch = useDispatch();
  useEffect( () =>
  {
    const unsubscrube = onAuthStateChanged( firebaseAuth, ( user ) =>
    {
    if ( !user )
    {
      dispatch( logout )
      setIsLoggedIn(false)
      console.log('You Must Sign In')
    } else
    {
      dispatch( login( {
        email: user.email,
        uid: user.uid
      } ) );
      setIsLoggedIn(true)
    }
    } )
    return unsubscrube;
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={ <Layout /> }>
        <Route index element={isLoggedIn ? <HomePage /> : <LoginPage />} />
        <Route path='register' element={ <RegisterPage /> } />
        <Route path='log-in' element={ <LoginPage /> } />
        <Route path='sell' element={ isLoggedIn ? <SellingPage /> : <LoginPage /> } />
        <Route path='products' element={ isLoggedIn ? <ItemsPage /> : <LoginPage /> } />
        <Route path='products/:productId' element={ isLoggedIn ? <ItemPage /> : <LoginPage /> } />
        <Route path='cart' element={isLoggedIn ? <CartPage /> : <LoginPage />} />
      </Route>
    </Routes>
  )
};

export default App;