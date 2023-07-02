import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuid } from 'uuid';
import { firebaseStore, firebaseStorage } from '../../config/firebase';

const initialState = {
	status: 'idle',
	uid: null
};

export const createItem = createAsyncThunk( 'sell/createItem', async ( { uid, productName, productPrice, productDetails, productImage } ) =>
{
	try
	{
		const productFileRefrence = ref( firebaseStorage, `${ uid }/products/${ uuid() }` );
		await uploadBytes( productFileRefrence, productImage );
		const productImageUrl = await getDownloadURL( productFileRefrence );
		const userDocuemntRefrence = doc( firebaseStore, 'user', uid );
		const productCollectionRefrence = collection( userDocuemntRefrence, 'products' );
		await addDoc( productCollectionRefrence, { productName, productPrice, productDetails, productImageUrl } );
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