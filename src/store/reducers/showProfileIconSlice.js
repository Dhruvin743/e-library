import { createSlice } from "@reduxjs/toolkit";

const showProfileIconSlice = createSlice({
	name: "showProfileIcon",
	initialState: { value: "d-none" },
	reducers: {
		// actions are passed argument in function
		showIcon: (state, actions) => {
			//  if we directly add async function here function will execute and move on
			//  and we come to change parameters like state.value program have no idea what
			//  is state it's value will be gone
			// setTimeout(() => {
			// }, 2000);
			// console.log(state);
			state.value = actions.payload ? "d-flex" : "d-none";
		},
	},
});

export const { showIcon } = showProfileIconSlice.actions;

//? this is just another method
// export const showIconAsync = (msg) => {
// 	console.log(msg);
// 	return (dispatchEvent) => {
// 		console.log(dispatchEvent);
// 		setTimeout(() => {
// 			dispatchEvent(showIcon(msg));
// 		}, 2000);
// 	};
// };

export const showIconAsync = (msg) => (dispatchEvent) => {
	//* this is redux's method to deal with async function we call it as normal function but
	//* inside we write another function which will perform some async functionality and then
	//* call our reducer method with special function which comes bydefault
	console.log(dispatchEvent);
	setTimeout(() => {
		dispatchEvent(showIcon(msg));
	}, 2000);
};

export default showProfileIconSlice.reducer;
