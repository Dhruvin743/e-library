import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { showDetail } from "../store/reducers/exploreSlice";

function Card({ imgsrc, cardtitle, isNew, bookid }) {
	// console.log(bookid);
	if (cardtitle.length > 18) {
		cardtitle = `${cardtitle.slice(0, cardtitle.indexOf(" ", 18))}...`;
	}
	const dispatch = useDispatch();
	const navigate = useNavigate();
	return (
		<>
			<div
				className='card mx-3 py-2 text-light rounded-3 text-center align-items-center'
				style={{
					width: "12rem",
					height: "14rem",
					backgroundColor: `var(--color-surface-mixed-400)`,
				}}
				onClick={() => {
					// dispatch(showDetail(bookid));
					navigate(`/library/bookdetails/${bookid}?q=${imgsrc}`);
				}}
			>
				<img
					className='h-75 w-75 text-center'
					// src='https://source.unsplash.com/random/900x700/?code,book,bookopen'
					src={imgsrc ? `https://covers.openlibrary.org/b/id/${imgsrc}-M.jpg` : "/openBook.png"}
					style={{ objectFit: "contain" }}
				/>
				<div
					className='card-body p-1 d-flex align-items-center'
					style={{
						height: "20%",
						overflow: "scroll",
						scrollbarWidth: "none",
					}}
				>
					<h5 className='card-title d-inline-flex mb-0' style={{ color: `var(--color-text)` }}>
						{cardtitle || "cardtitle"}
					</h5>
					<span
						className={`${isNew} badge m-2 fs-6 p-2 position-absolute top-0 end-0`}
						style={{
							backgroundColor: `var(--color-primary-100)`,
							color: `var(--color-surface-mixed-600)`,
						}}
					>
						New
					</span>
				</div>
			</div>
		</>
	);
}

export default Card;
