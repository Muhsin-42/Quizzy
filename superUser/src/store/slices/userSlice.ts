import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    user: any;
    token: any;
    quizzes: any;
    students: any;
    faculties: any;
}

const initialState: UserState = {
    user: undefined,
    token: undefined,
    quizzes:undefined,
    students: undefined,
    faculties: undefined
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
        },
        setStudents(state, action){
            state.students = action.payload;
        },
        setFaculties(state, action){
            state.faculties = action.payload;
        }
    }
})

export const { loginUser, logoutUser, setQuizzes, setFaculties, setStudents } = userSlice.actions;
export default userSlice.reducer;