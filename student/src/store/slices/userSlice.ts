import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface user{
    _id: string,
    fullname: string,
    email: string
}

export interface UserState {
    user: any;
    token: any;
    quizzes: any;
}


const initialState: UserState = {
    user: undefined,
    token: undefined,
    quizzes:undefined
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginUser(state, action: PayloadAction<UserState['user']>) {
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        },
        logoutUser(state) {
            state.user = undefined;
            state.token = undefined;
        },
        setQuizzes(state, action){
            state.quizzes = action.payload;
        }
    }
})

export const { loginUser, logoutUser, setQuizzes } = userSlice.actions;
export default userSlice.reducer;