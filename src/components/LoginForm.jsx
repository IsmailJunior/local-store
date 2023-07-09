import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { logIn } from '../featuers/user/userSlice'
import Stack from '@mui/material/Stack'
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'
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
	<form noValidate  onSubmit={handleSubmit(onSubmit)}>
		<Stack spacing={ 2 }>
			<h2>Log in</h2>
		<Stack spacing={ 2 } direction='row'>
		<Stack spacing={1} direction='column'>
			<TextField size='small' type='email' id='email' label='Email' name='email' {...register('email', registerOptions.email)}/>
			<span style={ { color: 'red' } }>{ errors?.email && errors.email.message }</span>
		</Stack>
		<Stack spacing={1} direction='column'>
			<TextField size='small' type='password' id='password' label='Password' name='password' { ...register( 'password', registerOptions.password ) } />
			<span style={ { color: 'red' } }>{ errors?.password && errors.password.message }</span>
		</Stack>
		</Stack>
		<LoadingButton variant='contained' loading={loading} type='submit'>Log in</LoadingButton>
		<Stack spacing={2} direction='row'>
		<span>Or</span>
		<Link to='/register'>Register</Link>
		</Stack>
	</Stack>
	</form>
  )
}

