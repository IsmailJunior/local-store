import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import styled from 'styled-components';
import {createUser} from '../featuers/user/userSlice'
export const RegisterForm = () =>
{
		const registerOptions = {
			email: { required: "Email cannot be blank" },
			password: {required: "Password cannot be blank" }
	}
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit =  (data) =>
	{
		dispatch( createUser( { email: data.email, password: data.password } ) );
		navigate('/')
	}

  return (
	  <form onSubmit={handleSubmit(onSubmit)}>
		  <Group>
			  <input type="email" name='email' { ...register( 'email', registerOptions.email ) } />
			  <input type='password' name='password' { ...register( 'password', registerOptions.password ) } />
			  <input type="submit" />
		  </Group>
		  <span>Or</span>
		  <Link to='/log-in'>Log in</Link>
	</form>
  )
}

const Group = styled.div`
	display: flex;
`;