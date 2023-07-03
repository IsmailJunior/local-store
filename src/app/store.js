import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../featuers/user/userSlice';
import { sellReducer } from '../featuers/sell/sellSlice';
import { itemsReducer } from '../featuers/items/itemsSlice'

const store = configureStore( {
	reducer: {
		user: userReducer,
		sell: sellReducer,
		items: itemsReducer
	}
} );

export default store;