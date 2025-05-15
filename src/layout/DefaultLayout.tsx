import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { RootState } from "@/state/auth";
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
		<div className="mx-auto">
			<main>
				<Outlet />
			</main>

			<div>
				<Footer />
			</div>
			{/* <!-- ===== Footer End ===== --> */}

			{/* <!-- ===== Content Area End ===== --> */}
		</div>


	)
}

export default DefaultLayout;