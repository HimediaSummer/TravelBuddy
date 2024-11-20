import MyFaqsCSS from '../member/faq/MyFaqsCSS.css';
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { callFaqListForAdminAPI } from '../../apis/FaqAPICalls';


function MyFaqs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const faq = useSelector((state) => state.faqReducer) || {};
    const { data = {}, pageInfo = {} } = faq;
    console.log('나는 어떻게 써야되냐고',data);

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
            callFaqListForAdminAPI({
                currentPage: { currentPage },
            })
        );
    }, [currentPage]);


    const onClickTableTr = (faqCode) => {
        navigate(`/MyFaqDetail/${faqCode}`, { replace: false });
    }

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
                        <th></th>
                        <th>유형</th>
                        <th colSpan={5}>제목</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) &&
                        data.map((f) => {
                            return(
                            <tr
                                key={f.faqCode}
                                onClick={() =>
                                    onClickTableTr(f.faqCode)
                                }
                            >
                                <td>{f.fqTypeCode}</td>
                                <td>{f.faqTitle}</td>
                                <td colSpan={4}>{f.faqContents}</td>
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
    </>
    );
}

export default MyFaqs;