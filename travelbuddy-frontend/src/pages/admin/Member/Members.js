import MemberCSS from "./Members.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { callMemberListForAdminAPI } from "../../../apis/MemberAPICalls";

function Members() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const member = useSelector((state) => state.memberReducer) || {};
    const memberList = member.data || {};
    const pageInfo = member.pageInfo || {};

    const [currentPage, setCurrentPage] = useState(1);


    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        dispatch(callMemberListForAdminAPI(
                {currentPage: currentPage}
            ));
    }, [currentPage]);

    const onClickTableTr = (memberCode) => {
        navigate(`/memberDetail/${memberCode}`, { replace: false });
    };

    return (
        <>
            <div className={MemberCSS.bodyDiv}>
                    <h2>회원</h2>
                <table className={MemberCSS.productTable}>
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
                                        {
                                        (m.memberSuspension === 'N' && m.memberDeletion === 'N')
                                        ? <button>정상</button> : 
                                        (m.memberSuspension === 'Y' && m.memberDeletion === 'N') 
                                        ? <button>정지</button> :
                                        (m.memberSuspension === 'N' && m.memberDeletion === 'Y')
                                        ? <button>탈퇴</button> :
                                        <p></p>
                                        }
                                    </td>
                                    <td>{m.memberCreate}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(memberList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ MemberCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'skyblue' } : null}
                        className={ MemberCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(memberList) &&
                <button 
                    className={ MemberCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
        </>
    );
}

export default Members;