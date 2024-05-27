import React from "react";

function Card() {
	return (
		<>
			<div
				className='card m-20 text-light rounded-4 text-center align-items-center'
				style={{
					width: "16rem",
					height: "20rem",
					backgroundColor: `var(--color-surface-mixed-400)`,
				}}
			>
				<img
					className='h-50 w-50 text-center'
					// src='https://source.unsplash.com/random/900x700/?code,book,bookopen'
					src='openBook.png'
					alt=''
				/>
				<div
					className='card-body'
					style={{
						height: "30%",
						overflow: "scroll",
						scrollbarWidth: "none",
					}}
				>
					<h5
						className='card-title d-inline-flex flex-row'
						style={{ color: `var(--color-text)` }}
					>
						Card title
						<span
							className='badge ms-2'
							style={{
								backgroundColor: `var(--color-primary-100)`,
								color: `var(--color-surface-mixed-600)`,
							}}
						>
							New
						</span>
					</h5>
					<p
						className='card-text'
						style={{
							color: `var(--color-primary-100)`,
						}}
					>
						Some quick example text to build on the card title and
						make up the bulk of the card's content.
					</p>
				</div>
				<div
					className='card-footer bg-transparent border-0'
					style={
						{
							// backgroundColor: `var(--color-surface-mixed-200)`,
						}
					}
				>
					<a
						href='/'
						className='btn w-100'
						style={{
							backgroundColor: `var(--color-primary-500)`,
							color: `black`,
							fontWeight: 700,
							fontSize: "1.2em",
						}}
					>
						Explore
					</a>
				</div>
			</div>
		</>
	);
}

export default Card;
