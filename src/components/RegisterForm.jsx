import { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Link} from 'react-router-dom'
import styled from 'styled-components';
import {createUser} from '../featuers/user/userSlice'
import { Control } from './Control';
export const RegisterForm = () =>
{
	const dispatch = useDispatch();
	const [ firstName, setFirstName ] = useState( '' );
	const [ lastName, setLastName ] = useState( '' );
	const [ email, setEmail ] = useState( '' );
	const [ password, setPassword ] = useState( '' );

	const onFirstNameChange = event => setFirstName( event.target.value );
	const onLastNameChange = event => setLastName( event.target.value );
	const onEmailChange = event => setEmail( event.target.value );
	const onPasswordChange = event => setPassword( event.target.value );

	const canRegister = [ firstName, lastName, email, password ].every( Boolean );

	const onRegisterClicked =  (event) =>
	{
		event.preventDefault();
		if ( canRegister )
		{
			console.log( firstName, lastName, email, password );
			dispatch( createUser( { email: email, password: password, firstName: firstName, lastName: lastName}) );
			setFirstName( '' );
			setLastName( '' );
			setEmail( '' );
			setPassword( '' );
		}
	}

  return (
	  <form action="#">
		  <Group>
			<Control value={firstName} func={onFirstNameChange} type='text' name='first-name' id='firstName' placeholder='First Name'>First Name</Control>
		  <Control value={lastName} func={onLastNameChange} type='text' name='last-name' id='lastName' placeholder='Last Name'>Last Name</Control>
		  </Group>
		  <Group>
		<Control value={email} func={onEmailChange} type='email' name='email' id='email' placeholder='john@example.com'>Email</Control>
		  <Control value={ password } func={ onPasswordChange } type='password' name='password' id='password'>Password</Control>
		  </Group>
		  <button onClick={ onRegisterClicked }>Register</button>
		  <span>Or</span>
		  <Link to='/log-in'>Log in</Link>
	</form>
  )
}

const Group = styled.div`
	display: flex;
`;