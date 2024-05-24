import React from "react";

function Card() {
	return (
		<>
			<div
				className='card m-20 text-light rounded-4 text-center align-items-center' 
				style={{
					width: "16rem",
					height: "19rem",
					backgroundColor: `var(--color-surface-mixed-200)`,
				}}
			>
                <img className="h-50 w-50 text-center" src="openBook.png" alt="" />
				<div
					className='card-body'
					style={{
						height: "60%",
						overflow: "scroll",
						scrollbarWidth: "none",
					}}
				>
					<h5 className='card-title' style={{ color: `black` }}>
						Card title
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
					className='card-footer border-0'
					style={{
						backgroundColor: `var(--color-surface-mixed-200)`,
					}}
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
