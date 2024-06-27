import React, { useEffect, useRef } from "react";
import loginStyle from "./stylesheets/login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showIcon } from "../store/reducers/showProfileIconSlice";
import { useCookies } from "react-cookie";

function Login() {
	const lgEmail = useRef();
	const lgPass = useRef();
	const dispatch = useDispatch();
	const nav = useNavigate();

	useEffect(() => {
		const checking = async () => {
			const data = await fetch("http://localhost:2323/logincheck", { credentials: "include" });
			const res = await data.json();
			if (res.code === 0) {
				nav("/library");
			}
		};
		checking();
	}, []);

	return (
		<>
			<div className={`d-flex justify-content-center align-items-center p-5 ${loginStyle.main}`}>
				<div
					className={`d-flex flex-column fs-5 justify-content-end align-items-center rounded-4 ${loginStyle.loginBox}`}
				>
					<div className='row gx-0 gy-3 pe-3 justify-content-center align-items-center'>
						<span
							className='col-12 m-0 fs-1 ms-3 mb-3 fw-bold text-center'
							style={{ color: `var(--color-primary-100)` }}
						>
							E-Library
						</span>
						<label
							className='col-3 text-end'
							style={{
								color: `var(--color-text)`,
							}}
							htmlFor='lgEmail'
						>
							E-mail
						</label>
						<span className='col-1 text-center'>:</span>
						<input
							className='col-7'
							style={{
								border: `0px none transparent`,
								backgroundColor: `transparent`,
								borderBottomWidth: "2px",
								borderBottomStyle: "solid",
								borderBottomColor: "black",
							}}
							type='text'
							id='lgEmail'
							ref={lgEmail}
						/>
						<label
							className='col-3 text-end'
							style={{
								color: `var(--color-text)`,
							}}
							htmlFor='lgPass'
						>
							Password
						</label>
						<span className='col-1 text-center'>:</span>
						<div className='col-7 position-relative'>
							<input
								className='w-100'
								style={{
									border: `0px none transparent`,
									backgroundColor: `transparent`,
									borderBottomWidth: "2px",
									borderBottomStyle: "solid",
									borderBottomColor: "black",
								}}
								type='password'
								id='lgPass'
								ref={lgPass}
							/>
							<button
								className='border-0 position-absolute top-0 end-0 '
								tabIndex={-1}
								type='button'
								style={{ backgroundColor: "transparent" }}
								onClick={() => {
									if (lgPass.current.getAttribute("type") === "password") {
										lgPass.current.setAttribute("type", "text");
									} else {
										lgPass.current.setAttribute("type", "password");
									}
								}}
							>
								<i className='fa-solid fa-eye-slash'></i>
							</button>
						</div>
					</div>
					<div className='row text-center mb-5 mt-5 justify-content-center position-relative'>
						<Button
							className='col-12 fs-3 p-0 fw-bold border-0'
							style={{
								backgroundColor: `var(--color-primary-100)`,
								color: `var(--color-surface-mixed-600)`,
							}}
							onClick={async () => {
								const email = lgEmail.current.value;
								const pass = lgPass.current.value;
								const data = await fetch("http://localhost:2323/login", {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									credentials: "include",
									body: JSON.stringify({ email, pass }),
								});
								// console.log(data);
								const res = await data.json();
								console.log(res);
								if (res.code) {
									alert("username or password incorrect");
								} else {
									// setCookie(res.cname, res.cvalue, { maxAge: 60 * 30 });
									dispatch(showIcon(true));
									nav("/library");
								}
								// if (localStorage.getItem("elibraryUser")) {
								// 	JSON.parse(localStorage.getItem("elibraryUser")).filter((value) => {
								// 		if (value.email === email) {
								// 			if (value.pass === pass) {
								// 				dispatch(showIcon(true));
								// 				setTimeout(() => {
								// 					nav("/library");
								// 				}, 2000);
								// 				return value;
								// 			} else {
								// 				alert("user email or password is incorrect");
								// 			}
								// 		}
								// 	}).length
								// 		? alert("user found Logging in...")
								// 		: alert("no user found with this email");
								// } else {
								// 	alert("no user found with this email");
								// }
							}}
						>
							Log in
						</Button>
						<button
							className='btn col-12 mt-4 bg-transparent border-0 p-0 w-auto'
							style={{ color: `var(--color-font)` }}
						>
							forgot Password
						</button>
						<NavLink
							to={"/signup"}
							className='btn bg-transparent fw-semibold fs-5 position-absolute ms-4 start-100 top-100'
							style={{ color: `var(--color-font)` }}
						>
							New user?
						</NavLink>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
