import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {logIn} from '../featuers/user/userSlice'
import { Control } from './Control';
export const LoginForm = () =>
{
	const dispatch = useDispatch();
	const [ email, setEmail ] = useState( '' );
	const [ password, setPassword ] = useState( '' );

	const onEmailChange = event => setEmail( event.target.value );
	const onPasswordChange = event => setPassword( event.target.value );

	const canLogin = [email, password ].every( Boolean );

	const onLoginClicked =  (event) =>
	{
		event.preventDefault();
		if ( canLogin )
		{
			console.log(email, password );
			dispatch( logIn( { email: email, password: password}) );
			setEmail( '' );
			setPassword( '' );
		}
	}

  return (
	  <form action="#">
		  <Group>
		<Control value={email} func={onEmailChange} type='email' name='email' id='email' placeholder='john@example.com'>Email</Control>
		  <Control value={ password } func={ onPasswordChange } type='password' name='password' id='password'>Password</Control>
		  </Group>
		  <button onClick={ onLoginClicked }>Login</button>
		  <span>Or</span>
		  <Link to='/register'>Register</Link>
	</form>
  )
}

const Group = styled.div`
	display: flex;
`;