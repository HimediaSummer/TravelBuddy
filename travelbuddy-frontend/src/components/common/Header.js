import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { decodeJwt } from '../../utils/tokenUtils';

function Header () {
    const navigate = useNavigate();


    return (
        <header class="header">
                <h1>
                    <div class="header-click">
                        <i class="fa-solid fa-globe"></i>
                            <a href="http://travel-buddy.me/">Travel Buddy</a>
                    </div>
                </h1>
                    <ul class="menu">
                        <li><NavLink to="/cm">커뮤니티</NavLink></li>
                        <li><NavLink to="/cs">고객지원</NavLink></li>
                        <li><NavLink to="">회원가입</NavLink></li>
                        <li><NavLink to="">로그인</NavLink></li>
                    </ul>
                    <button class="header_toogleBtn">
                        <i class="fas fa-bars"></i>
                    </button>
            </header>
    );
}

export default Header;