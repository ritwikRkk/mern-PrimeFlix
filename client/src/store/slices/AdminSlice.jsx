import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movieContent: [],
    movieGenre: [],
    isLoading: true,
    error: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
})

export default adminSlice.reducer;