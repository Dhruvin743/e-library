import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showDetail } from "../store/reducers/exploreSlice";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Bookmark from "../assets/BookmarkSvg";
import HeartSvg from "../assets/HeartSvg";
import BackSvg from "../assets/BackSvg";

function CardDetails() {
	// const dispatch = useDispatch();
	const nav = useNavigate();
	const { bookid } = useParams();
	const params = new URLSearchParams(document.location.search);
	console.log(params.get("q"));
	const [isMarked, setIsMarked] = useState({ fav: false, book: false, borrow: false });
	const [bookDetail, setBookDetail] = useState({ gotit: "" });
	useEffect(() => {
		if (bookid) {
			fetch(`http://localhost:2323/getbook/${bookid}`, { credentials: "include" })
				.then((data) => data.json())
				.then((res) => {
					if (res.code) {
						nav("/login");
						return;
					}
					if (res.cached) {
						setBookDetail({ gotit: "yes", covers: res.bCover, title: res.bTitle, description: res.bDescription });
						setIsMarked({ fav: res.bIsFavorite, book: res.bIsMarked, borrow: res.bIsRented });
					} else {
						console.log(res);
						setBookDetail({ gotit: "yes", ...res, covers: [params.get("q")] });
					}
				});
		}
	}, []);
	return (
		<>
			<div
				className='d-flex mx-auto text-light rounded-4 text-center overflow-hidden'
				style={{
					width: "90%",
					height: "100%",
					backgroundColor: `var(--color-surface-mixed-400)`,
				}}
			>
				<div className='d-flex flex-column p-3 row-gap-2' style={{ width: "40%", height: "100%" }}>
					<div
						className='d-flex justify-content-between align-items-center gap-0 text-center'
						style={{ width: "max-content", height: "max-content" }}
						onClick={() => {
							// dispatch(showDetail({ gotit: "" }));
							setBookDetail("");
							nav(-1);
						}}
					>
						<button type='button' className='border-0 bg-transparent'>
							<BackSvg />
						</button>
						{/* <span className='fs-3 fw-bold font-monospace' style={{ color: "var(--color-primary-100)" }}>
							Back
						</span> */}
					</div>
					<div
						className='d-flex flex-column justify-content-center text-center rounded-3 overflow-hidden'
						style={{
							width: "100%",
							height: "60%",
							filter: "drop-shadow(8px 8px 2px rgb(from var(--color-text) r g b/.75))",
						}}
					>
						<img
							src={
								bookDetail.gotit
									? `${
											bookDetail.covers?.length
												? `https://covers.openlibrary.org/b/id/${bookDetail.covers[0]}-L.jpg`
												: "/openBook.png"
									  }`
									: "/openBook.png"
							}
							alt=''
							className='w-100 h-100'
						/>
					</div>
					<div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "30%" }}>
						<button
							className='px-3 py-2 rounded-2 fs-3 font-monospace border-1 border-top-0 border-start-0 border-end border-bottom border-black'
							type='button'
							style={{
								backgroundColor: `var(--color-primary-500)`,
								color: `black`,
								fontWeight: `700`,
							}}
							onClick={async () => {
								// console.log(bookDetail.covers[0], bookDetail.description, bookDetail.title);
								const data = await fetch("http://localhost:2323/borrow", {
									method: "POST",
									body: JSON.stringify({
										cover: bookDetail.covers?.length ? bookDetail.covers[0] : null,
										desc: bookDetail.description?.value || bookDetail.description || "no description",
										title: bookDetail.title,
										bookid,
									}),
									headers: {
										"Content-Type": "application/json",
									},
									credentials: "include",
								});
								const res = await data.json();
								if (res.code) {
									nav("/login");
								} else {
									setIsMarked((prev) => ({ ...prev, borrow: res.bIsRented }));
								}
							}}
						>
							{isMarked.borrow ? "Borrowed" : "Borrow"}
						</button>
					</div>
				</div>

				{/*//? title */}
				<div className='d-flex flex-column row-gap-2 p-3' style={{ width: "60%", height: "100%" }}>
					<div
						className='d-flex flex-column justify-content-center text-center position-relative rounded-2'
						style={{
							width: "100%",
							height: "30%",
							backgroundColor: "var(--color-surface-mixed-600)",
							color: "var(--color-primary-100)",
						}}
					>
						{bookDetail.gotit ? <h4 className='fs-2'>{`${bookDetail.title}`}</h4> : ""}
						<div className='position-absolute end-0 top-0'>
							<button
								className='p-1 m-1 border-0 rounded-5'
								type='button'
								style={{ backgroundColor: "var(--color-primary-600)" }}
								onClick={async () => {
									const data = await fetch("http://localhost:2323/favorite", {
										method: "POST",
										body: JSON.stringify({
											cover: bookDetail.covers?.length ? bookDetail.covers[0] : null,
											desc: bookDetail.description?.value || bookDetail.description || "no description",
											title: bookDetail.title,
											bookid,
										}),
										headers: {
											"Content-Type": "application/json",
										},
										credentials: "include",
									});
									const res = await data.json();
									if (res.code) {
										nav("/login");
									} else {
										setIsMarked((prev) => ({ ...prev, fav: res.bIsFavorite }));
									}
								}}
							>
								<HeartSvg isfill={isMarked.fav} />
							</button>
							<button
								className='p-1 m-1 border-0 rounded-5'
								type='button'
								style={{ backgroundColor: "var(--color-primary-600)" }}
								onClick={async () => {
									const data = await fetch("http://localhost:2323/bookmark", {
										method: "POST",
										body: JSON.stringify({
											cover: bookDetail.covers?.length ? bookDetail.covers[0] : null,
											desc: bookDetail.description?.value || bookDetail.description || "no description",
											title: bookDetail.title,
											bookid,
										}),
										headers: {
											"Content-Type": "application/json",
										},
										credentials: "include",
									});
									const res = await data.json();
									if (res.code) {
										nav("/login");
									} else {
										setIsMarked((prev) => ({ ...prev, book: res.bIsMarked }));
									}
								}}
							>
								<Bookmark isfill={isMarked.book} />
							</button>
						</div>
					</div>
					<div
						className='d-flex flex-column p-3 justify-content-start align-items-start overflow-y-scroll rounded-2'
						style={{
							width: "100%",
							height: "70%",
							scrollbarWidth: "none",
							textAlign: "justify",
							backgroundColor: "var(--color-surface-mixed-600)",
							color: "var(--color-primary-100)",
						}}
					>
						{/* {bookDetail.gotit ? <div>{`Publisher : ${bookDetail.publisher}`}</div> : ""} */}
						{bookDetail.gotit ? (
							<div>{`${bookDetail.description?.value || bookDetail.description || "no description"}`}</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
}

export default CardDetails;
