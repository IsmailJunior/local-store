import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signUpUser, signInUser, signOutUser } from '../../util/auth'

const initialState = {
	status: 'idle',
	user: null,
	uid: null
};
export const createUser = createAsyncThunk( 'user/createUser', async ( { email, password } ) =>
{
	try
	{
		await signUpUser( email, password )
	} catch ( error )
	{
		console.log( error.message );
	}
} );

export const logIn = createAsyncThunk( 'user/logIn', async ( { email, password } ) =>
{
	try
	{
		await signInUser( email, password )

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
			const { email, uid } = action.payload;
			state.uid = uid
			state.user = email;
		},
		logout ( state )
		{
			signOutUser();
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
				state.status = 'success';
			})
	}
} );
export const selectUid = ( state ) => state.user.uid;
export const selectUser = ( state ) => state.user.user;
export const { login, logout } = userSlice.actions;
export const { actions: userActions, reducer: userReducer } = userSlice;
