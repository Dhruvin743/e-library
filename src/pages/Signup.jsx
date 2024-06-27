import React, { useEffect, useRef } from "react";
import signupStyle from "./stylesheets/signup.module.css";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

function Signup() {
	const sgEmail = useRef();
	const sgPass = useRef();
	const sgRePass = useRef();
	const nav = useNavigate();

	var EMAIL_REGEX =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
			<div className={`d-flex justify-content-center align-items-center p-5 ${signupStyle.main}`}>
				<div
					className={`d-flex flex-column fs-5 justify-content-end align-items-center rounded-4 ${signupStyle.loginBox}`}
				>
					<div className='row gx-0 gy-3 pe-3 justify-content-center align-items-center'>
						<span className='col-12 m-0 fs-1 ms-3 fw-bolder text-center' style={{ color: `var(--color-primary-100)` }}>
							E-Library
						</span>
						<label
							className='col-3 text-end'
							style={{
								color: `var(--color-text)`,
							}}
							htmlFor='sgEmail'
						>
							E-mail
						</label>
						<span className='col-1 text-center'>:</span>
						<input
							className='col-7'
							style={{
								// backgroundColor: `var(--color-surface-mixed-200)`,
								border: `0px none transparent`,
								backgroundColor: `transparent`,
								borderBottomWidth: "2px",
								borderBottomStyle: "solid",
								borderBottomColor: "black",
							}}
							type='email'
							id='sgEmail'
							ref={sgEmail}
							// onChange={validateForm(sgEmail)}
						/>
						<label
							className='col-3 text-end'
							style={{
								color: `var(--color-text)`,
							}}
							htmlFor='sgPass'
						>
							Password
						</label>
						<span className='col-1 text-center'>:</span>
						<div className='col-7 position-relative'>
							<input
								className='w-100'
								style={{
									// backgroundColor: `var(--color-surface-mixed-200)`,
									border: `0px none transparent`,
									backgroundColor: `transparent`,
									borderBottomWidth: "2px",
									borderBottomStyle: "solid",
									borderBottomColor: "black",
								}}
								type='password'
								id='sgPass'
								pattern='/{8}/'
								ref={sgPass}
							/>
							<button
								className='border-0 position-absolute top-0 end-0 '
								tabIndex={-1}
								type='button'
								style={{ backgroundColor: "transparent" }}
								onClick={() => {
									if (sgPass.current.getAttribute("type") === "password") {
										sgPass.current.setAttribute("type", "text");
									} else {
										sgPass.current.setAttribute("type", "password");
									}
								}}
							>
								<i className='fa-solid fa-eye-slash'></i>
							</button>
						</div>
						<label
							className='col-3 text-end'
							style={{
								color: `var(--color-text)`,
							}}
							htmlFor='sgRePass'
						>
							Confirm Password
						</label>
						<span className='col-1 text-center'>:</span>
						<div className='col-7 position-relative'>
							<input
								className='w-100'
								style={{
									// backgroundColor: `var(--color-surface-mixed-200)`,
									border: `0px none transparent`,
									backgroundColor: `transparent`,
									borderBottomWidth: "2px",
									borderBottomStyle: "solid",
									borderBottomColor: "black",
								}}
								type='password'
								id='sgRePass'
								ref={sgRePass}
							/>
							<button
								className='border-0 position-absolute top-0 end-0 '
								tabIndex={-1}
								type='button'
								style={{ backgroundColor: "transparent" }}
								onClick={() => {
									if (sgRePass.current.getAttribute("type") === "password") {
										sgRePass.current.setAttribute("type", "text");
									} else {
										sgRePass.current.setAttribute("type", "password");
									}
								}}
							>
								<i className='fa-solid fa-eye-slash'></i>
							</button>
						</div>
					</div>
					<div className='row justify-content-center text-center mt-5'>
						<Button
							className='col-8 fs-3 p-0 mb-2 fw-bold border-0'
							style={{
								backgroundColor: `var(--color-primary-100)`,
								color: `var(--color-surface-mixed-600)`,
							}}
							onClick={async () => {
								const email = sgEmail.current.value;
								const pass = sgPass.current.value;
								const rePass = sgRePass.current.value;
								if (EMAIL_REGEX.test(email)) {
									if (pass.length > 7 && rePass.length > 7) {
										if (pass === rePass) {
											const user = { email, pass };
											console.log(JSON.stringify(user));
											// const lclStrg = localStorage.getItem("elibraryUser");
											// if (lclStrg) {
											// 	if (JSON.parse(lclStrg).filter((value) => value.email === email).length) return;
											// 	localStorage.setItem("elibraryUser", JSON.stringify([...JSON.parse(lclStrg), user]));
											// 	console.log(localStorage.getItem("elibraryUser"));
											// } else {
											// 	localStorage.setItem("elibraryUser", JSON.stringify([user]));
											// }
											const data = await fetch("http://localhost:2323/signup", {
												method: "POST",
												body: JSON.stringify(user),
												headers: {
													"Content-Type": "application/json",
												},
											});
											const res = await data.json();
											if (res.code) {
												nav("/login");
											} else {
												alert("user already exist try login");
											}
										} else {
											alert("please confirm your password");
										}
									} else {
										alert("paswword should be more then 8 character");
									}
								} else {
									alert("please check your email");
								}
							}}
						>
							Sign up
						</Button>
						<NavLink
							to='/login'
							className='btn bg-transparent col-12 mb-3 border-0'
							style={{
								color: `var(--color-font)`,
								backgroundColor: "transparent",
							}}
						>
							Already a member?
						</NavLink>
					</div>
				</div>
			</div>
		</>
	);
}

export default Signup;
