import { Outlet, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

function Mypage() {
	const navigate = useNavigate();

	useEffect(() => {
        
        if (window.location.pathname === '/mypage') {
            navigate("/mypage/buddylist", { replace: false });
        }
    }, [navigate]);

	return (
		<>
			<div>
                <h1>마이페이지마이페이지마이페이지마이페이지마이페이지</h1>
					<button>My정보</button>
					<button>My커뮤니티</button>
					<button>My버디</button>
					<button>My신청</button>
				<Outlet />
			</div>
		</>
	);
}

export default Mypage;