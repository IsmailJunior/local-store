import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
const cartItemsAdapter = createEntityAdapter( {
	selectId: ( item ) => item.itemId,
} );

const cartSlice = createSlice( {
	name: 'cart',
	initialState: cartItemsAdapter.getInitialState(),
	reducers: {
		itemAdded: cartItemsAdapter.addOne,
		itemsRemoved: cartItemsAdapter.removeAll,
		itemRemoved ( state, action )
		{
			cartItemsAdapter.removeOne( state, action.payload );
		},
		itemUpdated ( state, action )
		{
			cartItemsAdapter.updateOne( state, action.payload );
		}
	}
} );
export const itemsSelectors = cartItemsAdapter.getSelectors( ( state ) => state.cart );
export const { itemAdded, itemRemoved, itemUpdated, itemsRemoved } = cartSlice.actions;
export const { reducer: cartReducer } = cartSlice;