import {useState} from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { logIn } from '../featuers/user/userSlice'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import '@fontsource/roboto/400.css'
export const LoginForm = () =>
{
			const registerOptions = {
			email: { required: "Email cannot be blank" },
			password: {required: "Password cannot be blank" }
			}
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { register, handleSubmit, formState: {errors} } = useForm();
	const onSubmit = ( data ) =>
	{
		setLoading(true)
		dispatch( logIn( { email: data.email, password: data.password } ) );
		navigate( '/' )
	}

	return (
	<Box sx={{border: '1px solid rgba(0,0,0,0.2)', p: '50px', borderRadius: '10px', height: '450px'}}>
	<form style={{width: '350px'}} noValidate  onSubmit={handleSubmit(onSubmit)}>
		<Stack spacing={ 2 }>
		<Stack sx={{textAlign: 'center'}}>
			<Typography variant='h5' gutterBottom>Log in to your account</Typography>
			<Typography color='gray' variant='h7' gutterBottom>Provide your information</Typography>
		</Stack>
		<Stack spacing={1} direction='column'>
			<TextField fullWidth size='large' type='email' id='email' label='Email' name='email' {...register('email', registerOptions.email)}/>
			<span style={ { color: 'red' } }>{ errors?.email && errors.email.message }</span>
		</Stack>
		<Stack spacing={1} direction='column'>
			<TextField fullWidth size='large' type='password' id='password' label='Password' name='password' { ...register( 'password', registerOptions.password ) } />
			<span style={ { color: 'red' } }>{ errors?.password && errors.password.message }</span>
		</Stack>
		<LoadingButton variant='contained' loading={loading} type='submit'>Log in</LoadingButton>
		<Stack spacing={2} direction='row'>
		<span>Or</span>
		<Link to='/register'>Register</Link>
		</Stack>
	</Stack>
	</form>
	</Box>
  )
}

