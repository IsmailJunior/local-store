import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createDocument } from '../../util/document';
import { uploadFile } from '../../util/upload';

const initialState = {
	status: 'idle',
	uid: null
};

export const createItem = createAsyncThunk( 'sell/createItem', async ( { uid, productName, productPrice, productDetails, productImage } ) =>
{
	try
	{
		const productImageUrl = await uploadFile( uid, productImage );
		await createDocument( uid, productName, productPrice, productDetails, productImageUrl );
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