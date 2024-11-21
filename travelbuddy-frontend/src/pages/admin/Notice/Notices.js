import NoticeCSS from './NoticeCSS.css';

import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { callNoticeListForAdminAPI } from "../../../apis/NoticeAPICalls";

function Notices() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice = useSelector((state) => state.noticeReducer) || {};
    const noticeList = notice.data || {};
    const pageInfo = notice.pageInfo || {};

    console.log('나 noticeList',noticeList);


    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(
        () => {
            dispatch(callNoticeListForAdminAPI(
                {currentPage: currentPage}
            ));
        }, [currentPage]
    );

    const onClickTableTr = (noticeCode) => {
        navigate(`/noticeDetail/${noticeCode}`, { replace: false });
    };

    const onClickNavigation = () => {
        navigate(`/Notice`);
    };


    return (
        <>
         <div className={NoticeCSS.bodyDiv}>
                    <h2>공지사항</h2>
                <table className={NoticeCSS.productTable}>
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
                        {Array.isArray(noticeList) &&
                            noticeList.map((n) => (
                                <tr
                                    key={n.noticeCode}
                                    onClick={() => onClickTableTr(n.noticeCode)}
                                >
                                    <td>{n.noticeCode}</td>
                                    <td colSpan={3}>{n.noticeTitle}</td>
                                    <td>{n.noticeCount}</td>
                                    <td>{n.noticeCreate}</td>
                                    <td>{n.noticeAt}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(noticeList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ NoticeCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'skyblue' } : null}
                        className={ NoticeCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(noticeList) &&
                <button 
                    className={ NoticeCSS.pagingBtn }
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
export default Notices;