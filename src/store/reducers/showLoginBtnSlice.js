import { createSlice } from "@reduxjs/toolkit";

const showLoginBtnSlice = createSlice({
	name: "showLoginBtnSlice",
	initialState: { value: "d-inline" },
	reducers: {
		// actions are passed argument in function
		showBtn: (state, actions) => {
			state.value = actions.payload ? "d-inline" : "d-none";
		},
	},
});

export const { showBtn } = showLoginBtnSlice.actions;
export default showLoginBtnSlice.reducer;
