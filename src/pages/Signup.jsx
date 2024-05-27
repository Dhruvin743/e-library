import React, { useRef } from "react";
import signupStyle from "./Signup.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";

function Signup() {
	const sgEmail = useRef();
	const sgPass = useRef();
	const sgRePass = useRef();

	return (
		<>
			<div
				className={`d-flex justify-content-center align-items-center p-5 ${signupStyle.main}`}
			>
				<div
					className={`d-flex flex-column fs-5 justify-content-end align-items-center rounded-4 ${signupStyle.loginBox}`}
				>
					<div className='row gx-0 gy-3 pe-3 justify-content-center align-items-center'>
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
							type='text'
							id='sgEmail'
							ref={sgEmail}
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
						<div className='col-7'>
							<input
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
								ref={sgPass}
							/>
                            <button type="button"><img src="" alt="" /></button>
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
							type='password'
							id='sgRePass'
							ref={sgRePass}
						/>
					</div>
					<div className='row text-center mb-5 pb-4 mt-5'>
						<Button
							className='col-12 fs-3 p-0 fw-bold border-0'
							style={{
								backgroundColor: `var(--color-primary-100)`,
								color: `var(--color-surface-mixed-600)`,
							}}
							onClick={() => {
								const user = {
									email: sgEmail.current.value,
									pass: sgPass.current.value,
									rePass: sgRePass.current.value,
								};

								console.log(user);
							}}
						>
							Sign up
						</Button>
						<button
							className='col-12 border-0'
							style={{
								color: `var(--color-font)`,
								backgroundColor: "transparent",
							}}
						>
							Already a member?
						</button>
					</div>
				</div>
			</div>
		</>
	);
}

export default Signup;
