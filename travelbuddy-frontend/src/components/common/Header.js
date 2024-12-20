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

    const handleMyPageClick = (e) => {
        if (!token) {
            e.preventDefault(); // 기본 링크 이동 방지
            alert("로그인 시 사용 가능합니다.");
            navigate("/login");
        }
    };

    function BeforeLogin() {
        return (
            <div>
                <NavLink to="/login" style={{color: 'black', cursor: 'pointer'}}>로그인</NavLink>
            </div>
        );
    }

    function AfterLogin() {
        return (
            <div>
                {/* <button onClick={onClickLogoutHandler}>로그아웃</button> */}
                <a onClick={onClickLogoutHandler} style={{color: 'black', cursor: 'pointer'}}>로그아웃</a>
            </div>
        );
    }

    const getMyPageLink = () => {
        if (token?.auth && token.auth.includes('ROLE_ADMIN')) {
            return { link: "/admin", text: "관리자페이지" };
        }
        return { link: "/mypage", text: "MY정보" };
    };

	// 메인으로
	const onClickMain = () => {
		navigate("/");
	};

    return (
        <div className="HeaderContainer">
            {/* <title>Travel Buddy</title>
            <p>Travel Buddy</p> */}
            {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}
			<header class="header">
					<h1>
						<div class="header-click">
							{/* <i class="fa-solid fa-globe"></i> */}
							{/* <a href="http://travel-buddy5.site:3000"> */}
							<img src="/Img/TravelBuddy(256).png" alt="Main logo" style={{marginLeft: '20px', cursor: 'pointer'}} onClick={onClickMain}/>
						</div>
					</h1>
            <ul class="menu">
                <li>
                    {/* <NavLink to="/mypage">MY정보</NavLink> */}
                    {(() => {
                            const myPage = getMyPageLink();
                            return <NavLink
                                        to={myPage.link}
                                        onClick={handleMyPageClick}
                                    >
                                        {myPage.text}
                                    </NavLink>
                    })()}
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
                    <NavLink to="/cm/buddies">커뮤니티</NavLink>
                </li>
                <li>
                    <NavLink to="/cs">고객지원</NavLink>
                </li>
            </ul>
            <button class="header_toogleBtn">
                <i class="fas fa-bars"></i>
            </button>
			</header>
        </div>
    );
}

export default Header;
