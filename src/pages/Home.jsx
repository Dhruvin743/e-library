import React from "react";
import homeStyle from "./Home.module.css";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { Stack } from "react-bootstrap";
import Card from "./Card";

function Home() {
	return (
		<>
			<div className={homeStyle.main}>
				<div>
					<nav
						className='navbar navbar-expand-lg p-2.5 rounded-bottom'
						style={{
							backgroundColor: `var(--color-surface-mixed-100)`,
						}}
					>
						<div className='container-fluid mx-4'>
							<a
								className='navbar-brand p-0 ms-5 text-size-'
								style={{
									color: `var(--color-primary-100)`,
									fontWeight: 1000,
									fontSize: "1.5em",
								}}
								href='/'
							>
								E-Library
							</a>
							<button
								className='navbar-toggler'
								type='button'
								data-bs-toggle='collapse'
								data-bs-target='#navbarSupportedContent'
								aria-controls='navbarSupportedContent'
								aria-expanded='false'
								aria-label='Toggle navigation'
							>
								<span className='navbar-toggler-icon'></span>
							</button>
							<div
								className='collapse navbar-collapse'
								id='navbarSupportedContent'
							>
								<form
									className='d-flex mx-auto ps-3 w-50 '
									role='search'
								>
									<input
										className='form-control ms-5 placeholder-glow'
										type='search'
										placeholder='Search'
										aria-label='Search'
										style={{
											backgroundColor: `var(--color-surface-mixed-400)`,
											color: `black`,
											fontWeight: 600,
										}}
									/>
								</form>
								<div className='d-inline-flex flex-row justify-content-evenly align-items-center'>
									<span className='fs-5 fw-bold'>Log in</span>
									<span className='mx-4 fs-5 fw-bold'>
										Sign up
									</span>
									<div
										className='d-flex justify-content-center align-items-center rounded-circle'
										style={{
											width: "30px",
											height: "30px",
											backgroundColor: `var(--color-primary-100)`,
										}}
									>
										<a
											href='http://'
											style={{
												color: `black`,
											}}
										>
											<i class='fa-solid fa-user'></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</nav>
				</div>

				{/*//? bottom part */}
				<div className={homeStyle.contentbar}>
					<div className={homeStyle.contentholder}>
						{/* //?left side menu */}
						<div className={homeStyle.menusection}>
							<ul>
								<li>
									<div
										className={`rounded-pill d-flex justify-content-center align-items-center ${homeStyle.menubtns}`}
									>
										My Collection
									</div>
								</li>
								<li>
									<div
										className={`rounded-pill d-flex justify-content-center align-items-center ${homeStyle.menubtns}`}
									>
										My Favorites
									</div>
								</li>
								<li>
									<div
										className={`rounded-pill d-flex justify-content-center align-items-center ${homeStyle.menubtns}`}
									>
										Wishlist
									</div>
								</li>
							</ul>
						</div>

						{/*//? middle section part */}
						<div
							className={homeStyle.librarysection}
							style={{
								overflow: "scroll",
								scrollbarWidth: "none",
							}}
						>
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
							<Card />
						</div>

						{/*//? right section part */}
						<div className={homeStyle.socialsection}>
							<div
								className={`d-flex flex-column justify-content-center align-items-between ${homeStyle.socialTag}`}
							>
								<div>
									<img src='facebook.png' alt='' />
								</div>
								<div>
									<img src='instagram.jpg' alt='' />
								</div>
								<div>
									<img src='twitter.png' alt='' />
								</div>
								<div>
									<img src='discord.png' alt='' />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Home;
