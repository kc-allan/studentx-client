import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router-dom";

const DefaultLayout: React.FC = () => {
	return (
		<div className="flex flex-col items-center bg-black">
			<Header />
			{/* <!-- ===== Main Content Start ===== --> */}
			<main>
				<Outlet />
			</main>

			<div className='lg:hidden'>
				<Footer />
			</div>
			{/* <!-- ===== Footer End ===== --> */}

			{/* <!-- ===== Content Area End ===== --> */}
		</div>


	)
}

export default DefaultLayout;