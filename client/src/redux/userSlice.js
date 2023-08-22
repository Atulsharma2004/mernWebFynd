import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: "",
    fname: "",
    _id: "",
    image: "",
    lname: "",

}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            const { _id, fname, lname, email, image } = action.payload.data;
            return {
                ...state,
                _id,
                fname,
                lname,
                email,
                image,
            };
        },
        logoutRedux: (state, action) => {
            const { _id, fname, lname, email, image } = '';
            return {
                ...state,
                _id,
                fname,
                lname,
                email,
                image,
            };
            
        }
    }
})
export const { loginRedux, logoutRedux } = userSlice.actions

export default userSlice.reducer

