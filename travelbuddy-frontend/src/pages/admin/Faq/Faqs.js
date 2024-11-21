import MyFaqsCSS from "../../member/faq/MyFaqsCSS.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { callFaqListForAdminAPI } from "../../../apis/FaqAPICalls";

function Faqs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const faq = useSelector((state) => state.faqReducer) || {};
    const faqList = faq.data || {};
    const { data = {}, pageInfo = {} } = faqList;

    const [currentPage, setCurrentPage] = useState(1);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        dispatch(
            callFaqListForAdminAPI({
                currentPage: currentPage,
            })
        );
    }, [currentPage]);

    const onClickTableTr = (faqCode) => {
        navigate(`/FaqDetail/${faqCode}`, { replace: false });
    };

    const onClickNavigation = () => {
        navigate(`/Faq`);
    };




    return (
        <>
            <div className={MyFaqsCSS.bodyDiv}>
                <h2>FAQ</h2>
                <table className={MyFaqsCSS.productTable}>
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
                            <th>게시글 번호</th>
                            <th>유형</th>
                            <th>제목</th>
                            <th>은폐여부</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(data) &&
                            data.map((f) => {
                                return (
                                    <tr key={f.faqCode}
                                    onClick={() =>
                                        onClickTableTr(f.faqCode)
                                    }>
                                        <td>{f.faqCode}</td>
                                        <td>{f.fqTypeCode}</td>
                                        <td>{f.faqTitle}</td>
                                        <td>
                                            {f.faqAt === "N" ? (
                                                <button>공개</button>
                                            ) : (
                                                <button>비공개</button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
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
                {Array.isArray(data) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={MyFaqsCSS.pagingBtn}
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
                            className={MyFaqsCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(data) && (
                    <button
                        className={MyFaqsCSS.pagingBtn}
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
            <button onClick={onClickNavigation}>작성</button>
        </>
    );
}

export default Faqs;
