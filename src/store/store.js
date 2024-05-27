import { configureStore } from "@reduxjs/toolkit";
import showProfileIconSlice from "./reducers/showProfileIconSlice";
import showLoginBtnSlice from "./reducers/showLoginBtnSlice";

export default configureStore({
	reducer: {
		showProfileIconReducer: showProfileIconSlice,
		showLoginBtnReducer: showLoginBtnSlice,
	},
});
