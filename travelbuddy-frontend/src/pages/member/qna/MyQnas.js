import MyQnasCSS from "./MyQnasCSS.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef, useMemo } from "react";

import { callQnaListAPI } from "../../../apis/QnaAPICalls";
import { callFqTypeNameAPI } from "../../../apis/FqTypeAPICalls";
import { callMemberDetailForAdminAPI } from "../../../apis/MemberAPICalls";

function MyQnas() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const qna = useSelector((state) => state.qnaReducer) || {};
    const fqType = useSelector((state) => state.fqTypeReducer) || {};
    const member = useSelector((state) => state.memberReducer) || {};
    const qnaList = qna.data || {};
    const fqTypeList = fqType.data || {};
    const memberList = member.data || {};
    const { data = {}, pageInfo = {} } = qnaList;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        dispatch(
            callQnaListAPI({currentPage})
        );
    }, [currentPage,dispatch]);

    useMemo (() => {
        dispatch(callFqTypeNameAPI());
    }, [dispatch]);

    useMemo(()=>{
        dispatch(callMemberDetailForAdminAPI);
    },[dispatch]);
    


    const onClickTableTr = (qnaCode) => {
        navigate(`/cs/myqnas/${qnaCode}`, { replace: false });
    };

    const onClickNavigation = () => {
        navigate(`/cs/myQna`);
    };


    return (
        <>
            <div className="MyQnaContainer">
            <div className="header">
                <p>문의 Q&A</p>
                    <button onClick={onClickNavigation}>작성</button>
                    </div>
                <table>
                    <thead>
                        <tr>
                            <th className="th1qna">번호</th>
                            <th className="th2qna">유형</th>
                            <th className="th3qna" colSpan={5}>제목</th>
                            <th className="th4qna">작성자</th>
                            <th className="th5qna">답변상태</th>
                            <th className="th6qna">작성일</th>
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
                                    <td className="td1qna">{q.qnaDTO.qnaCode}</td>
                                    <td className="td2qna">{Array.isArray(fqTypeList)
                                    ?fqTypeList.find(type => type.fqTypeCode === q.qnaDTO.fqTypeCode)
                                    ?.fqTypeName || "로딩중" : "로딩중"
                                    }</td>
                                    <td className="td3qna" colSpan={5}>{q.qnaDTO.qnaTitle}</td>
                                    <td className="td4qna">{
                                    memberList.memberCode === q.qnaDTO.memberCode ? memberList.memberName : "로딩중"
                                    }</td>
                                    <td className="td5qna">{q.qnaAnswerDTO.ansContents ? "답변완료" : ""}</td>
                                    <td className="td6qna">{q.qnaDTO.qnaCreate}</td>
                                </tr>
                            )})}
                    </tbody>
                </table>
            </div>
            <div className="AdminAllCSSButtonList">
                {Array.isArray(qnaList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
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
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(qnaList) && (
                    <button
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

export default MyQnas;
