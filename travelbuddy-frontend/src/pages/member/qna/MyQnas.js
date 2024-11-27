import MyQnaCSS from "./MyQnas.css";
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

    console.log('나 QnaRedcer',qna);
    console.log('그럼 난 fqTypeReducer',fqTypeList);
    console.log('후후 나는 memberReducer',memberList);


    const [currentPage, setCurrentPage] = useState(1);

    const [fqTypesName, setFqTypesName] = useState([]);
    const [membersName, setMembersName] = useState({});

    

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        dispatch(
            callQnaListAPI({
                currentPage: currentPage 
            })
        );
    }, [currentPage]);

    useMemo (() => {
        dispatch(callFqTypeNameAPI());
        if (Array.isArray(fqTypeList)){
            setFqTypesName(fqTypeList);
        }
    }, [setFqTypesName]);

    useMemo(()=>{
        dispatch(callMemberDetailForAdminAPI);
        if ((memberList)){
            setMembersName(memberList);
            return console.log('membersName 은 뭐야',membersName);
        }
    },[setMembersName]);
    


    const onClickTableTr = (qnaCode) => {
        navigate(`/cs/myqnas/${qnaCode}`, { replace: false });
    };

    const onClickNavigation = () => {
        navigate(`/cs/myQna`);
    };


    return (
        <>
            <div className={MyQnaCSS.bodyDiv}>
                <h2>문의(Q&A)<button onClick={onClickNavigation}>작성</button></h2>
               
                <table className={MyQnaCSS.productTable}>
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
                                    fqTypesName.find(type => type.fqTypeCode === q.qnaDTO.fqTypeCode)?.fqTypeName || "알수없음"
                                    }</td>
                                    <td colSpan={5}>{q.qnaDTO.qnaTitle}</td>
                                    <td>{
                                    membersName.memberCode === q.qnaDTO.memberCode ? membersName.memberName : "알수없음"
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
                        className={MyQnaCSS.pagingBtn}
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
                            className={MyQnaCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(qnaList) && (
                    <button
                        className={MyQnaCSS.pagingBtn}
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
