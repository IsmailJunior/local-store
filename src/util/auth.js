import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';

export const signInUser = async ( email, password ) =>
{
	try
	{
		await signInWithEmailAndPassword( firebaseAuth, email, password );
	} catch ( error )
	{
		return {
			error: error.message
		};
	}
};

export const signUpUser = async ( email, password ) =>
{
	try
	{
		await createUserWithEmailAndPassword( firebaseAuth, email, password );
	} catch ( error )
	{
		return {
			error: error.message
		};
	}
};

export const signOutUser = () =>
{
	signOut( firebaseAuth );
};