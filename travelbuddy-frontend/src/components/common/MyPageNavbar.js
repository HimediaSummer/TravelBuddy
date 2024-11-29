import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import MyPageNavbarCSS from './MyPageNavbarCSS.css';

function MyPageNavbar() {
    return (
		<div className='adminNavBarContainer'>
			<ul>
				<li>
					<NavLink to="/mypage/myBuddy">MY매칭</NavLink>
				</li>
				<li>
					<NavLink to="/mypage/mySchedule">MY일정</NavLink>
				</li>
                <li>
					<NavLink to="/mypage/myProfile">MY정보</NavLink>
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

export default MyPageNavbar;