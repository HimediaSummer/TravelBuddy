import React, { useEffect, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { callLogoutAPI } from "../../apis/MemberAPICalls";
import { callGetMemberAPI } from '../../apis/MemberAPICalls';

import { decodeJwt } from '../../utils/tokenUtils';
import LoginModal from "../common/LoginModal";

function Header() {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const dispatch = useDispatch(); // Redux dispatch
    const loginMember = useSelector((state) => state.memberReducer); // 저장소에서 가져온 loginMember 정보
    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    const [loginModal, setLoginModal] = useState(false);

    console.log("loginMember =" , loginMember);
    console.log("loginMember type", typeof loginMember);

    console.log("token = ", token)
    console.log("token type", typeof token);

    useEffect(() => {
        if(token) {
            dispatch(callGetMemberAPI({ 
                memberName: token.sub
            }));
        }
    }, []);

    // useEffect(() => {
    //     // 로그인 상태 확인
    //     const token = window.localStorage.getItem('accessToken');
    //     if (!token) {
    //         alert('로그인이 필요한 서비스입니다.');
    //         navigate('/login');
    //         return;
    //     }
    // }, []);

    //로그인
    const handleLoginClick = () => {
        navigate("/login");
    };

    //로그아웃
    const onClickLogoutHandler = () => {
        window.localStorage.removeItem("accessToken");
        dispatch(callLogoutAPI());

        alert("로그아웃이 되어 메인화면으로 이동합니다.");
        navigate("/", { replace: true });
        window.location.reload();
    };

    function BeforeLogin() {
        return (
            <div>
                <NavLink to="/login">로그인</NavLink>
            </div>
        );
    }

    function AfterLogin() {
        return (
            <div>
                <button onClick={onClickLogoutHandler}>로그아웃</button>
            </div>
        );
    }

    return (
        <div className="Main">
            <head>
                <meta charset="UTF-8" />
                <script
                    src="https://kit.fontawesome.com/9e9931aed0.js"
                    crossorigin="anonymous"
                ></script>
                <link rel="stylesheet" href="/CSS/media.css" />
                <link rel="stylesheet" href="/CSS/menu.css" />
                <link rel="stylesheet" href="/CSS/slide.css" />
                <link rel="stylesheet" href="/CSS/style.css" />
                <title>Travel Buddy</title>
            </head>
            {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}
            <ul class="menu">
                <li>
                    <NavLink to="/mypage">MY정보</NavLink>
                </li>
                <li>
                    {/* <li onClick={handleLoginClick}>로그인</li> */}
                    {token == null || token == undefined ? (
                        <BeforeLogin />
                    ) : (
                        <AfterLogin />
                    )}
                </li>
                <li>
                    <NavLink to="/cm">커뮤니티</NavLink>
                </li>
                <li>
                    <NavLink to="/cs">고객지원</NavLink>
                </li>
            </ul>
            <button class="header_toogleBtn">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    );
}

export default Header;
