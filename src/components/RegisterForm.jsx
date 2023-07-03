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
	const { register, handleSubmit, formState: {errors} } = useForm();
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
			  <Field>
				  <label htmlFor='email'>Email</label>
				  <input id='email' type="email" name='email' { ...register( 'email', registerOptions.email ) } />
				<span style={{color: 'red'}}>{errors?.email && errors.email.message}</span>
			  </Field>
			  <Field>
				  <label htmlFor='password'>Password</label>
				  <input id='password' type='password' name='password' { ...register( 'password', registerOptions.password ) } />
				<span style={{color: 'red'}}>{errors?.password && errors.password.message}</span>
			  </Field>
		  </Group>
		<input type="submit" />
		  <span>Or</span>
		  <Link to='/log-in'>Log in</Link>
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
