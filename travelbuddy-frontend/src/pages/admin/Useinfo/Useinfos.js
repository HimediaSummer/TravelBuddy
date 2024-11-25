import UseinfoCSS from './UseinfoCSS.css';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callUseinfoListForAdminAPI } from "../../../apis/UseinfoAPICalls";
import { appendUseinfoCountAPI } from "../../../apis/UseinfoAPICalls";

function Useinfos() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const useinfo = useSelector((state) => state.useinfoReducer) || {};
    const useinfoList = useinfo.data || {};
    const pageInfo = useinfo.pageInfo || {};

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callUseinfoListForAdminAPI(
                {currentPage: currentPage}
            ));
        }, [currentPage]
    );

// 상세페이지로 이동하면서, 조회수 카운트 올리기
const onClickTableTr = (useinfoCode) => {
    const selectUseinfo = useinfoList.find(n => n.useinfoCode === useinfoCode); // 선택한 공지사항 찾기
    const appendCount = {useinfoCount:selectUseinfo.useinfoCount};
   if (selectUseinfo) {
        dispatch(appendUseinfoCountAPI(useinfoCode, appendCount)); // API 호출로 업데이트
    }
    navigate(`/admin/useinfos/${useinfoCode}`, { replace: false }); // 상세 페이지로 이동
};

    const onClickNavigation = () => {
        navigate(`/admin/useinfo`);
    };


    return (
        <>
         <div className={UseinfoCSS.bodyDiv}>
                    <h2>사용설명서</h2>
                <table className={UseinfoCSS.productTable}>
                    <colgroup>
                        <col width="10%" />
                        <col width="35%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />

                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th colSpan={3}>제목</th>
                            <th>조회</th>
                            <th>작성일</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(useinfoList) &&
                            useinfoList.map((u) => (
                                <tr
                                    key={u.useinfoCode}
                                    onClick={() => onClickTableTr(u.useinfoCode)}
                                >
                                    <td>{u.useinfoCode}</td>
                                    <td colSpan={3}>{u.useinfoTitle}</td>
                                    <td>{u.useinfoCount}</td>
                                    <td>{u.useinfoCreate}</td>
                                    <td>{u.useinfoAt}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(useinfoList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ UseinfoCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'skyblue' } : null}
                        className={ UseinfoCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(useinfoList) &&
                <button 
                    className={ UseinfoCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
            <button onClick={onClickNavigation}>작성</button>
        </>
    );
}
export default Useinfos;