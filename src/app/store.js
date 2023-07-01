import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '../featuers/user/userSlice';
import { sellReducer } from '../featuers/sell/sellSlice'

const store = configureStore( {
	reducer: {
		user: userReducer,
		sell: sellReducer
	}
} );

export default store;