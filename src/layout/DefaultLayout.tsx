import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = () => {
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