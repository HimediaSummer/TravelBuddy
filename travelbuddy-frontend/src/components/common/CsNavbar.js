import { NavLink } from 'react-router-dom';
import { decodeJwt } from '../../utils/tokenUtils';

function CsNavbar() {
    return (
		<div className='adminNavBarContainer'>
			<ul>
				<li>
					<NavLink to="/cs/myfaqs">FAQ</NavLink>
				</li>
				<li>
					<NavLink to="/cs/myqnas">1:1 문의</NavLink>
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

export default CsNavbar;