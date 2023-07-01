import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseAuth } from '../../config/firebase'

const initialState = {
	status: 'idle',
	user: null
};
export const createUser = createAsyncThunk( 'user/createUser', async ( { email, password } ) =>
{
	try
	{
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
	reducers: {
		login ( state, action )
		{
			const { email } = action.payload;
			state.user = email;
		},
		logout ( state )
		{
			signOut( firebaseAuth );
			state.user = null;
			state.status = 'idle'
		}
	},
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

export const selectUser = ( state ) => state.user.user;
export const { login, logout } = userSlice.actions;
export const { actions: userActions, reducer: userReducer } = userSlice;
