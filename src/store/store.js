import { configureStore } from "@reduxjs/toolkit";
import searchTagSlice from "./reducers/searchTagSlice";

export default configureStore({
	reducer: {
		rSearch: searchTagSlice,
	},
});
