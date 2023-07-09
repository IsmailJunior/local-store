import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
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
		<Container maxWidth='lg'>
		<Box component='nav' sx={{p: 2}}>
		<Stack spacing={2} direction='row'>
		{ user ? <Button variant='contained' onClick={ onLogOutClicked }>Log Out</Button> : <Link to='/log-in'>Log In</Link> }
		<Link to='/sell'>Sell</Link>
		<Link to='/products'>Products</Link>
		</Stack>
		</Box>
		</Container>
  )
}