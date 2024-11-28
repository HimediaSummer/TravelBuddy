import { Outlet } from "react-router-dom";
import MyPageNavbar from "../components/common/MyPageNavbar";
import Header from "../components/common/Header";


function MyPageLayout() {

	return (
		<>
			<div>
				<Header/>
				<MyPageNavbar />
				<main>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default MyPageLayout;
