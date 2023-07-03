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
			  <Field>
				<label htmlFor='email'>Email</label>
			  <input id='email' type="email"  { ...register( 'email', registerOptions.email ) } name='email' />
			  </Field>
			  <Field>
				  <label htmlFor='password'>Password</label>
				<input id='password' type="password" {...register('password')} name='password'/>
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
