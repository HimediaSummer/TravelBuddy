import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import './MypageNavbar.css';

function MyPageNavbar() {
	const [activeSubMenu, setActiveSubMenu] = useState(null);
	const toggleSubMenu = (menu) => {
        setActiveSubMenu((prev) => (prev === menu ? null : menu)); // 현재 열려있으면 닫고, 아니면 연다
    };
    const closeSubMenu = () => {
        setActiveSubMenu(null); // 하위 네비바 닫기
    };

    useEffect(() => {
        // 페이지 외부 클릭 감지
        const handleClickOutside = (event) => {
            if (!event.target.closest('.navbar-main')) {
                closeSubMenu(); // 네비게이션 외부 클릭 시 하위 네비바 닫기
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="navbar-main">
			<ul>
				<li>
					<NavLink 
                        to="/mypage/myProfile" 
                        onClick={(e) => {
                            e.preventDefault(); // 기본 링크 동작 막기
                            toggleSubMenu('myInfo'); // 하위 메뉴 토글
                        }}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        MY정보
                    </NavLink>
					{activeSubMenu === 'myInfo' && ( // My정보 하위 메뉴 표시 여부
                         <ul className="navbar-sub">
                            <li>
                                <NavLink to="/mypage/myprofile">내정보</NavLink>
                            </li>
                            <li>
                                <NavLink to="/mypage/updatemyprofile">내정보 수정</NavLink>
                            </li>
                            <li>
                                <NavLink to="/mypage/deletion">탈퇴</NavLink>
                            </li>
                        </ul>
                    )}
				</li>
				<li>
					<NavLink to="/mypage/myschedule">
                        MY일정
                    </NavLink>
				</li>
				<li>
					<NavLink 
                        to="/mypage/mybuddy" 
                        onClick={(e) => {
                            e.preventDefault(); // 기본 링크 동작 막기
                            toggleSubMenu('myBuddy'); // 하위 메뉴 토글
                        }}
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        MY버디
                    </NavLink>
					{activeSubMenu === 'myBuddy' && ( // My버디 하위 메뉴 표시 여부
                        <ul className="navbar-sub">
                            <li>
                                <NavLink to="/mypage/mybuddy">My게시글</NavLink>
                            </li>
                            <li>
                                <NavLink to="/mypage/mymatch">MY신청</NavLink>
                            </li>
                        </ul>
                    )}
				</li>
			</ul>
		</div>
    );
}

export default MyPageNavbar;