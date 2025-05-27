import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/state";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const DefaultLayout: React.FC = () => {
	const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
	const navigate = useNavigate();

	useEffect(() => {
		console.log("isAuthenticated:", isAuthenticated);
		if (!isAuthenticated) {
			navigate("/auth?page=login", { replace: true });
		}
	}, [isAuthenticated, navigate]);
	return (
		<div>
			<main>
				<Outlet />
			</main>
		</div>


	)
}

export default DefaultLayout;