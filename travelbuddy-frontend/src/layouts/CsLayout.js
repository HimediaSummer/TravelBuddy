import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import CsNavbar from "../components/common/CsNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function CsLayout() {

    const navigate = useNavigate();


    return (
        <>
        <Header/>
        <CsNavbar/>
        <main>
            <Outlet/>
        </main>
        </>
    );
}

export default CsLayout;
