import MemberManagementCSS from "./MemberManagement.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { callMemberListForAdminAPI } from "../../apis/MemberAPICalls";

function MemberManagement() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.memberReducer);
    const memberList = member.data;

	console.log("나 member야! ",member);
    console.log("난 memberList 라구!", memberList);

    const pageInfo = member.pageInfo;
	console.log("난 pageInfo 야!", pageInfo);
    const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEnd, setPageEnd] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        setStart((currentPage - 1) * 5);
        dispatch(
            callMemberListForAdminAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);

    const onClickTableTr = (memberCode) => {
        navigate(`/member-update/${memberCode}`, { replace: false });
    };

    return (
        <>
            <div className={MemberManagementCSS.bodyDiv}>
                <table className={MemberManagementCSS.productTable}>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>연락처</th>
                            <th>버디</th>
                            <th>일정</th>
                            <th>상태</th>
                            <th>가입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(memberList) &&
                            memberList.map((m) => (
                                <tr
                                    key={m.memberCode}
                                    onClick={() => onClickTableTr(m.memberCode)}
                                >
                                    <td>{m.memberCode}</td>
                                    <td>{m.memberName}</td>
                                    <td>{m.memberFullName}</td>
                                    <td>{m.memberEmail}</td>
                                    <td>{m.memberPhone}</td>
                                    <td>
                                        <button>버디</button>
                                    </td>
                                    <td>
                                        <button>일정</button>
                                    </td>
                                    <td>
                                        <button>정상</button>
                                    </td>
                                    <td>{m.memberCreate}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
			<div
				style={{
					listStyleType: 'none',
					display: 'flex',
					justifyContent: 'center'
				}}
			>
				{Array.isArray(memberList) && (
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
						className={MemberManagementCSS.pagingBtn}
					>
						&lt;
					</button>
				)}
				{pageNumber.map((num) => (
					<li
						key={num}
						onClick={() => setCurrentPage(num)}
					>
						<button
							style={
								currentPage === num
									? { backgroundColor: 'orange' }
									: null
							}
							className={MemberManagementCSS.pagingBtn}
						>
							{num}
						</button>
					</li>
				))}
				{Array.isArray(memberList) && (
					<button
						className={MemberManagementCSS.pagingBtn}
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={
							currentPage === pageInfo.pageEnd ||
							pageInfo.total == 0
						}
					>
						&gt;
					</button>
				)}
			</div>
        </>
    );
}

export default MemberManagement;
