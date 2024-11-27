import QnaCSS from "./Qnas.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { callQnaListForAdminAPI } from "../../../apis/QnaAPICalls";
import { callFqTypeNameAPI } from "../../../apis/FqTypeAPICalls";
import { callMemberAllNameAPI } from "../../../apis/MemberAPICalls";

function Qnas() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const qna = useSelector((state) => state.qnaReducer) || {};
    const fqType = useSelector((state) => state.fqTypeReducer) || {};
    const member = useSelector((state) => state.memberReducer) || {};
    const qnaList = qna.data || {};
    const fqTypeList = fqType.data || {};
    const memberList = member.data || {};
    const memberPageInfo = member.pageInfo || {};
    const { data = {}, pageInfo = {} } = qnaList;

    console.log('나 qnaList',qnaList);
    console.log('나 fqTypeList',fqTypeList);
    console.log('나 memberList',memberList);
    console.log('나는 멤버페이지',memberPageInfo);


    const [currentPage, setCurrentPage] = useState(1);
    const [fqTypesName, setFqTypesName] = useState([]);
    const [membersName, setMembersName] = useState([]);


    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        console.log(currentPage)
        dispatch(callQnaListForAdminAPI({currentPage: currentPage}));
       
    }, [currentPage]);

    useEffect(()=>{
        dispatch(callMemberAllNameAPI());
        if (Array.isArray(memberList)){
            setMembersName(memberList);
            console.log('저장되냐고',memberList);
            console.log('여기다말이지!!',membersName);
        }
    },[membersName]);

    useEffect (() => {
        dispatch(callFqTypeNameAPI());
        if (Array.isArray(fqTypeList)){
            setFqTypesName(fqTypeList);
        }
    }, [fqTypesName]);

    


    const onClickTableTr = (qnaCode) => {
        navigate(`/admin/qnas/${qnaCode}`, { replace: false });
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
                                    <td>{
                                    fqTypeList.find(type => type.fqTypeCode === q.qnaDTO.fqTypeCode)?.fqTypeName || "알수없음"
                                    }</td>
                                    <td colSpan={5}>{q.qnaDTO.qnaTitle}</td>
                                    <td>{
                                    membersName.find((m) => m.memberCode === q.qnaDTO.memberCode)?.memberName || "알수없음"
                                    }</td>
                                    <td>{q.qnaAnswerDTO.ansContents ? "답변완료" : ""}</td>
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
