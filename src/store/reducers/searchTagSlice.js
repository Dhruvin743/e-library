import { createSlice } from "@reduxjs/toolkit";

const searchTagSlice = createSlice({
	name: "searchTag",
	initialState: {
		value: "",
	},
	reducers: {
		setSearch: (state, action) => {
			state.value = action.payload;
		},
	},
});

export const { setSearch } = searchTagSlice.actions;
export default searchTagSlice.reducer;
