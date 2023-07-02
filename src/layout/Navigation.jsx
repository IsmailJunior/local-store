import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {logout, selectUser} from '../featuers/user/userSlice'

export const Navigation = () =>
{
	const dispatch = useDispatch();
	const user = useSelector(selectUser)
	const onLogOutClicked = ( event ) =>
	{
		event.preventDefault();
		dispatch( logout() );
	}

  return (
	  <Navbar>
		  { user ? <button onClick={ onLogOutClicked }>Log Out</button> : <Link to='/log-in'>Log In</Link> }
		  <Link to='/sell'>Sell</Link>
		  <Link to='/products'>Products</Link>
	</Navbar>
  )
}

const Navbar = styled.nav`
	display: flex;
	width: 100vw;
	height: 50px;
	padding: 5px 20px;
	background-color: white;
	border: 1px solid black;
	gap: 10px;
`;