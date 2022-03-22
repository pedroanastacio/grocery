import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUser from '../../interfaces/models/user';

const initialState = { name: '', email: '', roles: ['user'] };

export const userSlice = createSlice({
	name: 'user',
	initialState: { value: initialState },
	reducers: {
		set: (state, { payload: user }: PayloadAction<IUser>) => {
			state.value = user;
		},
		clear: state => {
			state.value = initialState;
		}
	}
});
