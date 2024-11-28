import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';
import AdminNavbarCSS from './AdminNavbarCSS.css';

function AdminNavbar() {
    return (
		<div className='adminNavBarContainer'>
			<ul>
				<li>
					<NavLink to="/admin/notices">공지사항관리</NavLink>
				</li>
				<li>
					<NavLink to="/admin/qnas">문의(Q&A)관리</NavLink>
				</li>
				<li>
					<NavLink to="/admin/faqs">FAQ 관리</NavLink>
				</li>
				<li>
					<NavLink to="/admin/useinfos">사용설명서 관리</NavLink>
				</li>
				<li>
					<NavLink to="/admin/members">회원 관리</NavLink>
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

export default AdminNavbar;