import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import SellIcon from '@mui/icons-material/Sell'
import HomeIcon from '@mui/icons-material/Home'
 import CategoryIcon from '@mui/icons-material/Category'
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
		<Stack alignItems='center' spacing={2} direction='row'>
					{ user ? <Button variant='contained' onClick={ onLogOutClicked }>Log Out</Button> : <Link to='/log-in'>Log In</Link> }
		<Link style={{textDecoration: 'none'}} to='/sell'>
		<Stack alignItems='center' spacing={1} direction='row'>
			<SellIcon />	
			<Typography>Sell</Typography>		
		</Stack>
		</Link>	
		<Link style={{textDecoration: 'none'}}  to='/products'>
		<Stack alignItems='center' spacing={ 1 } direction='row'>
		<CategoryIcon />
			<Typography>Products</Typography>	
		</Stack>
		</Link>
		<Link style={{textDecoration: 'none'}} to='/'>
		<Stack alignItems='center' spacing={ 1 } direction='row'>
			<HomeIcon />
			<Typography>Home</Typography>	
		</Stack>
		</Link>	
		</Stack>
		</Box>
		</Container>
  )
}