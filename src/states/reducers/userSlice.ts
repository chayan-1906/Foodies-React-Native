import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser, IUserState} from '@/types';
import {RootState} from '@/states/store';

const initialState: IUserState = {
    user: null,
    isVegMode: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        setVegMode: (state, action: PayloadAction<boolean>) => {
            state.isVegMode = action.payload;
        },
    },
});

export const {setUser, setVegMode} = userSlice.actions;

export const selectUser = (state: RootState)=> state.user?.user;

export default userSlice.reducer;
