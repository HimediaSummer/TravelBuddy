import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import AdminNavbar from "../components/common/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AdminLayout() {

    const navigate = useNavigate();


    return (
        <>
        <Header/>
        <AdminNavbar/>
        <main>
            <Outlet/>
        </main>
        </>
    );
}

export default AdminLayout;
