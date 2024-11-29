import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import CmNavbarCSS from "./CmNavbarCSS.css";

function CmNavbar() {
    return (
		<div className='cmNavBarContainer'>
			<ul>
				<li>
					<NavLink to="/cm/mynotices"
						className={({ isActive }) => isActive ? 'active-link' : ''}
					>
						공지사항
					</NavLink>
				</li>
				<li>
					<NavLink to="/cm/myuseinfos"
							className={({ isActive }) => isActive ? 'active-link' : ''}
					>
						이용방법
					</NavLink>
				</li>
				<li>
					<NavLink to="/cm/buddies"
						className={({ isActive }) => isActive ? 'active-link' : ''}
					>
						버디매칭
					</NavLink>
				</li>
			</ul>
		</div>
    );
}

export default CmNavbar;