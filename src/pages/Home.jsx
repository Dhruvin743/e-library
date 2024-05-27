import React from "react";
import homeStyle from "./Home.module.css";
import Button from "react-bootstrap/Button";
import Card from "./Card";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

function Home() {
	return (
		<>
			<div className={homeStyle.main}>
				<nav
					className='navbar navbar-expand-lg px-2.5 pt-3 pb-0 rounded-bottom'
					style={{
						backgroundColor: `var(--color-surface-mixed-100)`,
					}}
				>
					<div className='    container-fluid mx-4'>
						<a
							className='navbar-brand p-0 ms-5 text-size-'
							style={{
								color: `var(--color-primary-100)`,
								fontWeight: 1000,
								fontSize: "1.8em",
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
							<div>
								<span
									className={`${useSelector(
										(state) =>
											state.showLoginBtnReducer.value
									)} fs-5 fw-bold`}
								>
									<NavLink to={"/login"}>
										<Button
											className='border-0'
											style={{
												backgroundColor: `var(--color-primary-100)`,
												color: `black`,
												fontWeight: `700`,
											}}
										>
											Log in
										</Button>
									</NavLink>
								</span>
								<span
									className={`${useSelector(
										(state) =>
											state.showLoginBtnReducer.value
									)} mx-4 fs-5 fw-bold`}
								>
									<NavLink to={"/signup"}>
										<Button
											className='border-0'
											style={{
												backgroundColor: `var(--color-primary-100)`,
												color: `black`,
												fontWeight: `700`,
											}}
										>
											Sign up
										</Button>
									</NavLink>
								</span>
								<div
									className={`${useSelector(
										(state) =>
											state.showProfileIconReducer.value
									)} justify-content-center align-items-center rounded-circle`}
									style={{
										width: "30px",
										height: "30px",
										backgroundColor: `var(--color-primary-100)`,
									}}
								>
									<a
										href='/'
										style={{
											color: `black`,
										}}
									>
										<i className='fa-solid fa-user'></i>
									</a>
								</div>
							</div>
						</div>
					</div>
				</nav>

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
						<div className={homeStyle.librarysection}>
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
									<NavLink
										target='_'
										to={"https://facebook.com"}
									>
										<img src='facebook.png' alt='' />
									</NavLink>
								</div>
								<div>
									<NavLink
										target='_'
										to={"https://instagram.com"}
									>
										<img src='instagram.jpg' alt='' />
									</NavLink>
								</div>
								<div>
									<NavLink target='_' to={"https://x.com/"}>
										<img src='twitter.png' alt='' />
									</NavLink>
								</div>
								<div>
									<NavLink
										target='_'
										to={"https://discord.com/"}
									>
										<img src='discord.png' alt='' />
									</NavLink>
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
