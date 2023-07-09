import Stack from '@mui/material/Stack'
import Skeleton from '@mui/material/Skeleton'


export const Holder = () => {
  return (
	<Stack spacing={1}>
		<Skeleton variant="rounded" width={ 300 } height={ 450 } />
		<Skeleton variant='text' sx={ { fontSize: 10 } } width={ 150 } />
		<Skeleton variant='text' sx={ { fontSize: 50 } } width={ 200 } />
	</Stack>
  )
}
