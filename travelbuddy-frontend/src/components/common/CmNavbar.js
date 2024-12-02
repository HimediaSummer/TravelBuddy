import React, { useEffect, useState } from "react";
import { NavLink, useLocation  } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import CmNavbarCSS from "./CmNavbarCSS.css";

function CmNavbar() {
	const location = useLocation();

    return (
		<div className='adminNavBarContainer'>
			<ul>
				<li>
					<NavLink to="/cm/mynotices"
						end className={({ isActive }) => (location.pathname === '/cm/mynotices' || isActive) ? 'active-link' : ''}
					>
						공지사항
					</NavLink>
				</li>
				<li>
					<NavLink to="/cm/myuseinfos"
						end	className={({ isActive }) => (location.pathname === '/cm/myuseinfos' || isActive) ? 'active-link' : ''}
					>
						이용방법
					</NavLink>
				</li>
				<li>
					<NavLink to="/cm/buddies"
						end className={({ isActive }) => (location.pathname === '/cm/buddies' || isActive) ? 'active-link' : ''}
					>
						버디매칭
					</NavLink>
				</li>
			</ul>
		</div>
    );
}

export default CmNavbar;