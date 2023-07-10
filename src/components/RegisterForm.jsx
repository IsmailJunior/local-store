import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import '@fontsource/roboto/400.css'
import {createUser} from '../featuers/user/userSlice'
export const RegisterForm = () =>
{
		const registerOptions = {
			email: { required: "Email cannot be blank" },
			password: {required: "Password cannot be blank" }
	}
	const { register, handleSubmit, formState: {errors} } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false)
	const onSubmit =  (data) =>
	{
		setLoading(true)
		dispatch( createUser( { email: data.email, password: data.password } ) );
		navigate('/')
	}

	return (
	<Box sx={{border: '1px solid rgba(0,0,0,0.2)', p: '50px', borderRadius: '10px', height: '450px'}}>
	<form style={{width: '350px'}} noValidate  onSubmit={handleSubmit(onSubmit)}>
		<Stack spacing={ 2 }>
		<Stack sx={{textAlign: 'center'}}>
			<Typography variant='h5' gutterBottom>Create your account</Typography>
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
			<LoadingButton loading={loading} variant='contained' type='submit'>Register</LoadingButton>
		<Stack spacing={2} direction='row'>
		<span>Or</span>
		<Link to='/log-in'>Log in</Link>
		</Stack>
	</Stack>
	</form>
	</Box>
  )
}
