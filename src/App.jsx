import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch } from "react-redux";
import { showIconAsync, showIcon } from "./store/reducers/showProfileIconSlice";
import Redirector from "./components/Redirector";

function App() {
	const dispatch = useDispatch();
	let showiconFlag = false;
	let showLoginFlag = true;

	return (
		<>
			{/* <div>App page</div>
			<button
				type='button'
				onClick={() => {
					showiconFlag = !showiconFlag;
					showLoginFlag = !showLoginFlag;
					// dispatch(showIcon(showiconFlag));
					dispatch(showBtn(showLoginFlag));
					dispatch(showIcon(showiconFlag));
				}}
			>
				Show
			</button> */}
			<Routes>
				<Route path='/library/*' element={<Home />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/signup' element={<Signup />}></Route>
				<Route path='*' element={<Redirector />} />
			</Routes>
		</>
	);
}

export default App;
