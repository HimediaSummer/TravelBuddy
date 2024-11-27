import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

function Mypage() {

    const navigate = useNavigate();
    
    useEffect(() => {
        
        if (window.location.pathname === '/mypage') {
            navigate("/mypage/myprofile", { replace: false });
        }
    }, [navigate]);

    return (
        <div>
            <h3>마이페이지마이페이지마이페이지마이페이지마이페이지마이페이지마이페이지마이페이지마이페이지ㅍ</h3>
					<button>My정보</button>
					<button>My커뮤니티</button>
					<button>My버디</button>
					<button>My신청</button>
				<Outlet />
        </div>
    );
}

export default Mypage;