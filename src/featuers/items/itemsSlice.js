import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getItems } from '../../util/items';

const initialState = {
	status: 'idle',
	items: []
};

export const listItems = createAsyncThunk( 'items/listItems', async ( uid ) =>
{
	try
	{
		const items = await getItems( 'user', uid, 'products' );
		return items;
	} catch ( error )
	{
		console.log( error.message );
	}
} );

const itemsSlice = createSlice( {
	name: 'items',
	initialState,
	reducers: {},
	extraReducers: ( builder ) =>
	{
		builder.addCase( listItems.pending, ( state ) =>
		{
			state.items = [];
			state.status = 'loading';
		} ),
			builder.addCase( listItems.rejected, ( state ) =>
			{
				state.items = [];
				state.status = 'failed';
			} ),
			builder.addCase( listItems.fulfilled, ( state, action ) =>
			{
				if ( action.payload.data != null )
				{
					state.items = state.items.concat( action.payload.data );
				}
				state.status = 'success';
			} );
	}
} );

export const selectItems = ( state ) => state.items.items;
export const selectStatus = ( state ) => state.items.status;
export const { actions: itemsActions, reducer: itemsReducer } = itemsSlice;