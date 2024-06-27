import React, { useEffect, useRef, useState } from "react";
import homeStyle from "../pages/stylesheets/home.module.css";
import Card from "../pages/Card";
import { Widget } from "./Pagination";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../store/reducers/searchTagSlice";

function FavBookMenu() {
	const nav = useNavigate();
	const [bookList, setbookList] = useState([]);
	const searchData = useSelector((state) => state.rSearch.value);
	const searchTag = useRef();
	const dispatch = useDispatch();
	// useEffect(() => {
	// 	fetch("https://openlibrary.org/trending/daily.json?limit=12&page=1")
	// 		.then((data) => {
	// 			return data.json();
	// 		})
	// 		.then((res) => {
	// 			console.log(res);
	// 			localStorage.setItem("mybooks", JSON.stringify(res.works));
	// 			setbookList(res.works);
	// 		});
	// }, []);

	useEffect(() => {
		const pull = async () => {
			if (searchData) {
				console.log(searchData);
				const data = await fetch(`http://localhost:2323/search/${searchData.replaceAll(" ", "+")}`, {
					credentials: "include",
				});
				const res = await data.json();
				if (res.code) {
					nav("/login");
				} else {
					setbookList(res.data);
				}
			} else {
				const data = await fetch("http://localhost:2323/favoritebooks", { credentials: "include" });
				const res = await data.json();
				if (res.code) {
					nav("/login");
				} else {
					setbookList(res.data);
				}
			}
		};
		pull();
	}, []);

	return (
		<div className={`d-flex w-100 h-100 flex-column position-relative align-items-center overflow-hidden`}>
			<form
				className='d-flex align-items-center w-75 border border-0 mb-3 rounded-5 overflow-hidden'
				style={{ minHeight: "40px", maxHeight: "40px" }}
				role='search'
				onSubmit={async (e) => {
					e.preventDefault();
					if (searchData) {
						// const data = await fetch(`http://localhost:2323/search/${searchData}`, {
						// 	credentials: "include",
						// });
						// const res = await data.json();
						// if (res.code) {
						// 	nav("/login");
						// } else {
						// 	setbookList(res.data);
						// }
					} else {
						console.log("hitt");
						const data = await fetch("http://localhost:2323/favoritebooks", { credentials: "include" });
						const res = await data.json();
						if (res.code) {
							nav("/login");
						} else {
							setbookList(res.data);
						}
					}
				}}
			>
				<button
					type='button'
					className='h-auto fw-bold fs-5 p-3 border-0'
					tabIndex={-1}
					style={{
						backgroundColor: `var(--color-surface-mixed-400)`,
						color: "var(--color-primary-100)",
					}}
				>
					Filter
				</button>
				<input
					className='w-100 h-100 px-2 fw-bold'
					type='search'
					placeholder='Search'
					style={{
						// width:"0px",
						backgroundColor: `var(--color-surface-mixed-400)`,
						borderWidth: "0px 3px",
						borderStyle: "solid solid",
						borderColor: "var(--color-primary-400)",
						color: `black`,
					}}
					ref={searchTag}
					onChange={() => {
						dispatch(setSearch(searchTag.current.value));
					}}
					value={searchData}
				/>
				<button
					type='submit'
					className='h-auto fw-bold fs-5 p-3 border-0'
					tabIndex={-1}
					style={{
						backgroundColor: `var(--color-surface-mixed-400)`,
						color: "var(--color-primary-100)",
					}}
				>
					Search
				</button>
			</form>
			<div className={`${homeStyle.library} d-flex flex-wrap mx-auto px-4 row-gap-4 justify-content-start`}>
				{bookList.map((v, i) => {
					return (
						<Card key={`card${i}`} imgsrc={v.bCover[0]} cardtitle={v.bTitle} bookid={v.book_id} isNew={"d-none"} />
					);
				})}
			</div>
			<div className='w-100 position-absolute bottom-0 p-2'>
				<div className='d-flex w-100 h-100 justify-content-center align-items-center'>
					{/* <ul className="d-flex m-0" style={{listStyle:"none"}}>
					<li
						className='d-flex p-1 lh-1 m-0 justify-content-center align-items-center bg-light rounded-2'
						style={{ width: "max-content", height: "max-content" }}
					>
						{"<"}
					</li> 
					<li className='d-none'>...</li>
						{new Array(10).fill(true, 0).map((v, i) => {
							return <li>{i + 1}</li>;
						})}
					<li>...</li>
					<li>{">"}</li>
					</ul> */}
					<Widget />
				</div>
			</div>
		</div>
	);
}

export default FavBookMenu;
