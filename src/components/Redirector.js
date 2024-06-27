import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Redirector() {
	const navigate = useNavigate();
	useEffect(() => {
		navigate("/library");
	}, []);
}

export default Redirector;
