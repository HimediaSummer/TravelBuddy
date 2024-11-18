// import QnaDetail from "./QnaDetail";
import QnaCSS from "./Qnas.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { callQnaListForAdminAPI } from "../../apis/QnaAPICalls";

function Qnas() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const qna = useSelector((state) => state.qnaReducer) || {};
    const qnaList = qna.data || {};
    const { data = {}, pageInfo = {} } = qnaList;

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
            callQnaListForAdminAPI({
                currentPage: { currentPage },
            })
        );
    }, [currentPage]);


    const onClickTableTr = (qnaCode) => {
        navigate(`/qnaDetail/${qnaCode}`, { replace: false });
    };


    return (
        <>
            <div className={QnaCSS.bodyDiv}>
                <h2>문의(Q&A)</h2>
                <table className={QnaCSS.productTable}>
                    <colgroup>
                        <col width="5%" />
                        <col width="5%" />
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
                            <th>유형</th>
                            <th colSpan={5}>제목</th>
                            <th>작성자</th>
                            <th>답변상태</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) &&
                            data.map((q) => {
                                return(
                                <tr
                                    key={q.qnaDTO.qnaCode}
                                    onClick={() =>
                                        onClickTableTr(q.qnaDTO.qnaCode)
                                    }
                                >
                                    <td>{q.qnaDTO.qnaCode}</td>
                                    <td>{q.qnaDTO.fqTypeCode}</td>
                                    <td colSpan={5}>{q.qnaDTO.qnaContents}</td>
                                    <td>{q.qnaDTO.memberCode}</td>
                                    <td>{q.qnaAnswerDTO.ansCode}</td>
                                    <td>{q.qnaDTO.qnaCreate}</td>
                                </tr>
                            )})}
                    </tbody>
                </table>
            </div>
            <div
                style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {Array.isArray(qnaList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={QnaCSS.pagingBtn}
                    >
                        &lt;
                    </button>
                )}
                {pageNumber.map((num) => (
                    <li key={num} onClick={() => setCurrentPage(num)}>
                        <button
                            style={
                                currentPage === num
                                    ? { backgroundColor: "skyBlue" }
                                    : null
                            }
                            className={QnaCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(qnaList) && (
                    <button
                        className={QnaCSS.pagingBtn}
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

export default Qnas;
