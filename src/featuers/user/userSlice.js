import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {collection, addDoc} from 'firebase/firestore'
import {firebaseAuth, firebaseStore} from '../../config/firebase'

const initialState = {
	status: 'idle',  
};

const userCollectionRefrence = collection( firebaseStore, 'user' );

export const createUser = createAsyncThunk( 'user/createUser', async ( { email, password, firstName, lastName } ) =>
{
	try
	{
		await addDoc( userCollectionRefrence, { email, firstName, lastName } );
		await createUserWithEmailAndPassword( firebaseAuth, email, password );
	} catch ( error )
	{
		console.log( error.message );
	}
} );

export const logIn = createAsyncThunk( 'user/logIn', async ( { email, password } ) =>
{
	try
	{
		await signInWithEmailAndPassword( firebaseAuth, email, password );
	} catch ( error )
	{
		console.log(error.message)
	}
})

const userSlice = createSlice( {
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: ( builder ) => {
		builder.addCase( createUser.pending, ( state ) =>
		{
			state.status = 'loading';
		} ),
			builder.addCase( createUser.rejected, ( state ) =>
			{
				state.status = 'failed';
			} ),
			builder.addCase( createUser.fulfilled, ( state ) =>
			{
				state.status = 'success';
			} ),
			builder.addCase( logIn.pending, ( state ) =>
			{
				state.status = 'loading';
			} ),
			builder.addCase( logIn.rejected, ( state ) =>
			{
				state.status = 'failed';
			} ),
			builder.addCase( logIn.fulfilled, ( state ) =>
			{
				state.status = 'success'
			})
	}
} );

export const { actions: userActions, reducer: userReducer } = userSlice;
