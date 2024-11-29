import { NavLink } from 'react-router-dom';
import CmNavbarCSS from './CmNavbarCSS.css';

function CmNavbar() {
    return (
		<div className='adminNavBarContainer'>
			<ul>
				<li>
					<NavLink to="/cm/mynotices">공지사항</NavLink>
				</li>
				<li>
					<NavLink to="/cm/myuseinfos">이용방법</NavLink>
				</li>
				<li>
					<NavLink to="/cm/buddies">버디매칭</NavLink>
				</li>
				{/* {decoded === 'ROLE_ADMIN' && (
					<li>
						<NavLink to="/product-management">상품관리</NavLink>
					</li>
				)} */}
			</ul>
		</div>
    );
}

export default CmNavbar;