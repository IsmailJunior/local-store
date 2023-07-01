import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components';
import {logIn, selectUser} from '../featuers/user/userSlice'
import { Control } from './Control';
export const LoginForm = () =>
{
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const user = useSelector(selectUser)
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
			console.log(user );
			dispatch( logIn( { email: email, password: password}) );
			setEmail( '' );
			setPassword( '' );
			navigate('/')
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