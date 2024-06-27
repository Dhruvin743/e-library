import { configureStore } from "@reduxjs/toolkit";
import showProfileIconSlice from "./reducers/showProfileIconSlice";
import exploreSlice from "./reducers/exploreSlice";
import searchTagSlice from "./reducers/searchTagSlice";

export default configureStore({
	reducer: {
		showProfileIconReducer: showProfileIconSlice,
		exploreReducer: exploreSlice,
		rSearch: searchTagSlice,
	},
});
