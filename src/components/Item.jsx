import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import LoadingButton from '@mui/lab/LoadingButton'
import CardActions from '@mui/material/CardActions'
export const Item = ( { imageUrl, price, title, action, loading } ) =>
{
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
			<CardActions>
				<LoadingButton loading={loading} onClick={action} variant='contained' color='error'>Delete</LoadingButton>
			</CardActions>
		</CardContent>
	</Card>
  )
}