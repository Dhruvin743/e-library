import React from "react";

function Bookmark({ isfill }) {
	return (
		<svg
			height='30'
			viewBox='0 0 48 48'
			width='30'
			xmlns='http://www.w3.org/2000/svg'
			fill={isfill ? "var(--color-primary-100)" : "none"}
		>
			<path
				d='M34 6H14c-2.21 0-3.98 1.79-3.98 4L10 42l14-6 14 6V10c0-2.21-1.79-4-4-4z'
				strokeWidth={3}
				stroke="white"
			/>
		</svg>
	);
}

export default Bookmark;
