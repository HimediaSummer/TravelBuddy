import UseinfoCSS from './UseinfoCSS.css';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callUseinfoListForAdminAPI } from "../../../apis/UseinfoAPICalls";

function Useinfos() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const useinfo = useSelector((state) => state.useinfoReducer) || {};
    const useinfoList = useinfo.data || {};
    const pageInfo = useinfo.pageInfo || {};

    console.log('나 useinfoList',useinfoList);

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

    const onClickTableTr = (useinfoCode) => {
        navigate(`/useinfoDetail/${useinfoCode}`, { replace: false });
    };

    const onClickNavigation = () => {
        navigate(`/Useinfo`);
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