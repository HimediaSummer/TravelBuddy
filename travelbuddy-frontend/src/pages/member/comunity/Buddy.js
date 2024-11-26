import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { callBuddiesListAPI } from "../../../apis/BuddyAPICalls";

function Buddies() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buddy = useSelector((state) => state.buddiesReducer) || {};
	// console.log("buddy에 뭐가 담김?", buddy)

    const buddyList = buddy.data || {};
	// console.log("buddyList에 뭐가 담김?", buddyList)

    const { data = {}, pageInfo = {} } = buddyList;
    // console.log("한번에 하나만 담기나?", data);

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
			callBuddiesListAPI({ 
				currentPage:{ currentPage },
			})
		);
    }, [currentPage]);


    const onClickTableTr = (buddyCode) => {
        navigate(`/buddyDetail/${buddyCode}`, { replace: false });
    };

    const onClickBuddyRegist = () => {
        navigate("/buddyRegist", {replace: false})
    };


    return (
        <>
            <div >
                <h2>버디매칭</h2>
                <button onClick={onClickBuddyRegist}>게시글 작성</button>
                <table >
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
                            <th>매칭신청</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) && 
                            data.map((b) => {
                                return(
                                <tr
                                    key={b.buddyCode}
                                    onClick={() =>
                                        onClickTableTr(b.buddyCode)
                                    }
                                >
                                    <td>{b.buddyCode}</td>
                                    <td>{b.buddyTypeCode}</td>
                                    <td colSpan={5}>{b.buddyTitle}</td>
                                    <td>{b.memberCode}</td>
                                    <td>{b.buddyStatus}</td>
                                    <td>{b.buddyCreate}</td>
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
                {Array.isArray(buddyList) && (
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
                {Array.isArray(buddyList) && (
                    <button
                        
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === pageInfo.pageEnd ||
                            pageInfo.total === 0
                        }
                    >
                        &gt;
                    </button>
                )}
            </div>
        </>
    );
}

export default Buddies;
