import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { collection, addDoc, doc } from 'firebase/firestore';
import { firebaseStore } from '../../config/firebase';

const initialState = {
	status: 'idle',
	uid: null
};

export const createItem = createAsyncThunk( 'sell/createItem', async ( { uid, productName, productPrice, productDetails } ) =>
{
	try
	{
		const userDocuemntRefrence = doc( firebaseStore, 'user', uid );
		const productCollectionRefrence = collection( userDocuemntRefrence, 'products' );
		await addDoc( productCollectionRefrence, { productName, productPrice, productDetails } );
	} catch ( error )
	{
		console.log( error.message );
	}
} );

const sellSlice = createSlice( {
	name: 'sell',
	initialState,
	reducers: {
		updateUser ( state, action ) 
		{
			state.uid = action.payload;
			console.log( current( state ) );
		}
	},
	extraReducers: ( builder ) =>
	{
		builder.addCase( createItem.pending, ( state ) =>
		{
			state.status = 'loading';
		} ),
			builder.addCase( createItem.rejected, ( state ) =>
			{
				state.status = 'failed';
			} ),
			builder.addCase( createItem.fulfilled, ( state ) =>
			{
				state.status = 'success';
			} );
	}
} );

export const selectUid = ( state ) => state.sell.uid;
export const { updateUser } = sellSlice.actions;
export const { actions: sellActions, reducer: sellReducer } = sellSlice;