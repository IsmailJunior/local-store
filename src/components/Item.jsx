import {useNavigate} from 'react-router-dom'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LoadingButton from '@mui/lab/LoadingButton'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button';
import { Stack } from '@mui/material';
export const Item = ( { imageUrl, price, title, action, loading, listActions, addToCart, inCart } ) =>
{
	const navigate = useNavigate()

	const onViewCartClicked = () =>
	{
		navigate('/cart')
	}

  return (
	<Card sx={{maxWidth: 345}}>
		<CardMedia component='img' sx={ { height: 300, width: 300 } } image={ imageUrl } />
		<CardContent>
			<Typography gutterBottom variant='h5' component='div'>
				{title}
			</Typography>
			<AttachMoneyIcon fontSize='large' color='success' />
			<Typography display='inline'  variant='h3' component='div'>
					{price}
			</Typography>
			{ listActions ?
				<CardActions>
				<Stack spacing={1} direction='row' alignItems='start'>
				<LoadingButton loading={ loading } onClick={ action } variant='contained' color='error'>Delete</LoadingButton>
				<Stack>
					{ inCart ?
					<Stack direction='column'>
					<Button onClick={ onViewCartClicked } variant='contained'>View in cart</Button>
					<Typography color='GrayText'>In Cart</Typography>
					</Stack>
					:
					<Button onClick={ addToCart } variant='contained'>Add to cart</Button>
							}
					</Stack>
					</Stack>
					</CardActions> 
			: null }
		</CardContent>
	</Card>
  )
}