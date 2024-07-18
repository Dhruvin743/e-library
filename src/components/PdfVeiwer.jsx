import { embed } from "pdfobject";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PdfVeiwer() {
	const nav = useNavigate();
	useEffect(() => {
		(async () => {
			const data = await fetch("http://localhost:2323/getpdf", { credentials: "include" });
			try {
				if (data.status == 403) {
					nav("/login");
					return;
				}
			} catch (error) {
				console.log(error.message);
				return;
			}
			const blob = await data.blob();
			const file = window.URL.createObjectURL(blob);
			embed(file, "#mypdf");
		})();
	}, []);
	return (
		<>
			<div className='w-100 h-100 rounded-3 overflow-hidden' id='mypdf'></div>
		</>
	);
}

export default PdfVeiwer;
