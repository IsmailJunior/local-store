import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
export const Item = ( { imageUrl, price, title } ) =>
{
  return (
	<Card sx={{maxWidth: 345}}>
		<CardMedia component='img' sx={ { height: 400, width: 300 } } image={ imageUrl } />
		<CardContent>
			<Typography gutterBottom variant='h5' component='div'>
				{title}
			</Typography>
			<Typography gutterBottom variant='h3' component='div'>
				${price}
			</Typography>
		</CardContent>
	</Card>
  )
}