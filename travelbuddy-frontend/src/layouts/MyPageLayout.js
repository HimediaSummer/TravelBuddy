import { Outlet } from "react-router-dom";
import MyPageLayoutCSS from "./MyPageLayout.module.css";
import MyPageNavbar from "../components/common/MyPageNavbar";
import Header from "../components/common/Header";


function MyPageLayout() {

	return (
		<>
			<div className={MyPageLayoutCSS.myPageLayoutDiv}>
				<Header/>
				<MyPageNavbar />
				<main className={MyPageLayoutCSS.main}>
					<Outlet />
				</main>
			</div>
		</>
	);
}

export default MyPageLayout;
