import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function MyPageNavbar() {
    return (
		<div>
			<ul>
				<li>
					<NavLink to="/">홈으로</NavLink>
				</li>
				<li>
					<NavLink to="/mypage/myBuddy">My매칭</NavLink>
				</li>
				<li>
					<NavLink to="/mypage/mySchedule">My일정</NavLink>
				</li>
                <li>
					<NavLink to="/mypage/myProfile">My정보</NavLink>
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