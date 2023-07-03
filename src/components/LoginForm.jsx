import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import styled from 'styled-components';
import {logIn} from '../featuers/user/userSlice'
export const LoginForm = () =>
{
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const registerOptions = {
		email: {required: "Email cannot be blank"}
	}
	const onSubmit = ( data ) =>
	{
		dispatch( logIn( { email: data.email, password: data.password } ) );
		navigate('/')
	}

  return (
	  <form onSubmit={handleSubmit(onSubmit)}>
		  <Group>
			  <input type="email"  { ...register( 'email', registerOptions.email ) } name='email' />
		  <input type="password" {...register('password')} name='password'/>
		  </Group>
		  <input type="submit" />
		  <span>Or</span>
		  <Link to='/register'>Register</Link>
	</form>
  )
}

const Group = styled.div`
	display: flex;
`;