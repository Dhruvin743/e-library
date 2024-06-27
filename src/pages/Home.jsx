import React, { useEffect, useState } from "react";
import homeStyle from "./stylesheets/home.module.css";
import Button from "react-bootstrap/Button";
import { NavLink, Route, Routes, json, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import BookMenu from "../components/BookMenu";
import BookDetails from "../components/BookDetails";
import { useCookies } from "react-cookie";
import FavBookMenu from "../components/FavBookMenu";
import RentBookMenu from "../components/RentBookMenu";
import BMarkBookMenu from "../components/BMarkBookMenu";

function Home() {
	const isProIcoVis = useSelector((state) => state.showProfileIconReducer.value);
	const [cookies, setCookie, removeCookie] = useCookies();
	const nav = useNavigate();

	return (
		<>
			<div className={homeStyle.main}>
				<nav
					className='navbar navbar-expand-lg px-2.5 pt-2 pb-0 rounded-bottom'
					style={{
						backgroundColor: `var(--color-surface-mixed-100)`,
					}}
				>
					<div className='container-fluid mx-4'>
						<a
							className='navbar-brand p-0 ms-5 text-size-'
							tabIndex={-1}
							style={{
								color: `var(--color-primary-100)`,
								fontWeight: 1000,
								fontSize: "1.8em",
							}}
							href='/library'
						>
							E-Library
						</a>
						<div className='d-flex justify-content-end' id='navbarSupportedContent'>
							{/* <div className={``}> */}
							{/* <div className={`${isProIcoVis ? "d-none" : "d-flex"} justify-content-end gap-3`}>
									<span className={`fs-5 fw-bold`} tabIndex={-1}>
										<NavLink to={"/login"} tabIndex={-1}>
											<Button
												className='border-0'
												tabIndex={-1}
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
									<span className={`fs-5 fw-bold`} tabIndex={-1}>
										<NavLink to={"/signup"} tabIndex={-1}>
											<Button
												className='border-0'
												tabIndex={-1}
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
								</div> */}
							<div className={`d-flex justify-content-center align-items-center gap-3 rounded-circle`}>
								<Button
									className='border-0'
									tabIndex={-1}
									style={{
										backgroundColor: `var(--color-primary-100)`,
										color: `black`,
										fontWeight: `700`,
									}}
									onClick={async () => {
										const data = await fetch("http://localhost:2323/logout", { credentials: "include" });
										const res = await data.json();
										if (res.code) {
											removeCookie("libsid");
											nav("/login");
										}
									}}
								>
									Logout
								</Button>
								<div
									className={`d-flex justify-content-center align-items-center rounded-circle`}
									style={{
										width: "30px",
										height: "30px",
										backgroundColor: `var(--color-primary-100)`,
									}}
								>
									<img className='w-75 h-75' src='/user.png' />
								</div>
							</div>
							{/* </div> */}
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
										className={`rounded-pill d-flex justify-content-center cursor-pointer align-items-center ${homeStyle.menubtns}`}
									>
										<NavLink
											className='text-decoration-none'
											style={{ color: "var(--color-primary-100)" }}
											to='collection'
										>
											Collection
										</NavLink>
									</div>
								</li>
								<li>
									<div
										className={`rounded-pill d-flex justify-content-center align-items-center ${homeStyle.menubtns}`}
									>
										{/* if not use "/" then it will attach to current url that's we want here */}
										<NavLink
											className='text-decoration-none'
											style={{ color: "var(--color-primary-100)" }}
											to='favorite'
										>
											Favorite
										</NavLink>
									</div>
								</li>
								<li>
									<div
										className={`rounded-pill d-flex justify-content-center align-items-center ${homeStyle.menubtns}`}
									>
										<NavLink
											className='text-decoration-none'
											style={{ color: "var(--color-primary-100)" }}
											to='wishlist'
										>
											Wishlist
										</NavLink>
									</div>
								</li>
							</ul>
						</div>

						{/*//? middle section part */}
						<div className={`${homeStyle.librarysection} px-5`}>
							<Routes>
								<Route path='/favorite' element={<FavBookMenu />} />
								<Route path='/collection' element={<RentBookMenu />} />
								<Route path='/wishlist' element={<BMarkBookMenu />} />
								<Route path='/' element={<BookMenu />} />
								<Route path='bookdetails/:bookid' element={<BookDetails />} />
							</Routes>
						</div>

						{/*//? right section part */}
						<div className={homeStyle.socialsection}>
							<div className={`d-flex flex-column justify-content-center align-items-between ${homeStyle.socialTag}`}>
								<div>
									<NavLink target='_' to={"https://facebook.com"}>
										<img src='/facebook.png' alt='' />
									</NavLink>
								</div>
								<div>
									<NavLink target='_' to={"https://instagram.com"}>
										<img src='/instagram.jpg' alt='' />
									</NavLink>
								</div>
								<div>
									<NavLink target='_' to={"https://x.com/"}>
										<img src='/twitter.png' alt='' />
									</NavLink>
								</div>
								<div>
									<NavLink target='_' to={"https://discord.com/"}>
										<img src='/discord.png' alt='' />
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
