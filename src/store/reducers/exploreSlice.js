import { createSlice } from "@reduxjs/toolkit";

const exploreSlice = createSlice({
	name: "exploreSlice",
	initialState: {
		value: "",
	},
	reducers: {
		showDetail: (state, actions) => {
			state.value = actions.payload;
		},
	},
});

export const { showDetail } = exploreSlice.actions;
export default exploreSlice.reducer;
