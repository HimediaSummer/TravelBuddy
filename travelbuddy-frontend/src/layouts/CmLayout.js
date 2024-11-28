import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import CmNavbar from "../components/common/CmNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CmLayout() {

    const navigate = useNavigate();


    return (
        <>
        <Header/>
        <CmNavbar/>
        <main>
            <Outlet/>
        </main>
        </>
    );
}

export default CmLayout;
