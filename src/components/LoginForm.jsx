import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import styled from 'styled-components';
import {logIn} from '../featuers/user/userSlice'
export const LoginForm = () =>
{
			const registerOptions = {
			email: { required: "Email cannot be blank" },
			password: {required: "Password cannot be blank" }
	}
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const { register, handleSubmit, formState: {errors} } = useForm();
	const onSubmit = ( data ) =>
	{
		dispatch( logIn( { email: data.email, password: data.password } ) );
		navigate('/')
	}

  return (
	<form onSubmit={handleSubmit(onSubmit)}>
		<Group>
			<Field>
				<label htmlFor='email'>Email</label>
				<input id='email' type="email"  { ...register( 'email', registerOptions.email ) } name='email' />
				<span style={{color: 'red'}}>{errors?.email && errors.email.message}</span>
			</Field>
			<Field>
				<label htmlFor='password'>Password</label>
				<input id='password' type="password" { ...register( 'password', registerOptions.password ) } name='password' />
				<span style={{color: 'red'}}>{errors?.password && errors.password.message}</span>
			</Field>
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

const Field = styled.div`
	display: flex;
	flex-direction: column;
	margin-right: 10px;
	margin-bottom: 5px;
`;
