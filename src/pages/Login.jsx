import React from "react";
import loginStyle from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function Login() {
	return (
		<>
			<div
				className={`d-flex justify-content-center align-items-center p-5 ${loginStyle.main}`}
			>
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
								// backgroundColor: `var(--color-surface-mixed-200)`,
								border: `0px none transparent`,
								backgroundColor: `transparent`,
								borderBottomWidth: "2px",
								borderBottomStyle: "solid",
								borderBottomColor: "black",
							}}
							type='text'
							id='lgEmail'
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
							id='lgPass'
						/>
					</div>
					<div className='row text-center mb-5 pb-4 mt-5'>
						<Button
							className='col-12 fs-3 p-0 fw-bold border-0'
							style={{
								backgroundColor: `var(--color-primary-100)`,
								color: `var(--color-surface-mixed-600)`,
							}}
						>
							Log in
						</Button>
						<span
							className='col-12'
							style={{ color: `var(--color-primary-100)` }}
						>
							forgot Password
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

export default Login;
