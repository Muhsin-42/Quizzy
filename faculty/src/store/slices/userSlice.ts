import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    user: undefined | any;
    token: undefined | any;
    quizzes: undefined | any;
}

const initialState: UserState = {
    user: undefined,
    token: undefined,
    quizzes: undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<UserState['user']>) {
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        logoutUser(state, action: PayloadAction<undefined>) {
            state.user = undefined;
            state.token = undefined;
        },
        setQuizzes(state, action){
            state.quizzes = action.payload
        }
    }
})

export const { loginUser, logoutUser, setQuizzes } = userSlice.actions;
export default userSlice.reducer;