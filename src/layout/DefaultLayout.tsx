import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NetworkStatus from "@/components/NetworkStatus";
import { RootState } from "@/state";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const DefaultLayout: React.FC = () => {
	const isAuthenticated = useSelector((state: RootState) => !!state.auth.user);
	const next = window.location.pathname;
	const navigate = useNavigate();

	useEffect(() => {
		
		if (!isAuthenticated) {
			navigate(`/auth?page=login&next=${next}`, { replace: true });
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