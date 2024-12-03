import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callMyBuddyListAPI, deleteBuddyAPI } from '../../../apis/MypageAPICalls.js';
import './MyBuddy.css';

function MyBuddy() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const buddyList = useSelector(state => state.myBuddyReducer.buddy); // Redux 상태에서 buddy 목록 가져오기
    
    const itemsPerPage = 10; // 페이지당 항목 수
    const totalItems = buddyList?.pageInfo?.total || 0; // 전체 게시글 수
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산
    
    const [selectedRows, setSelectedRows] = useState([]); // 선택된 행
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
   

    // API로 목록 가져오기
    useEffect(() => {

        dispatch(callMyBuddyListAPI(currentPage)); // 현재 페이지로 API 호출
    }, [dispatch, currentPage]);

    // 데이터 상태 확인 로그
    useEffect(() => {

    }, [buddyList]);

    // 전체 체크박스 선택
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allRowIds = buddyList.map(item => item.buddyCode);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    // 개별 체크박스 선택
    const handleSelectRow = (buddyCode) => {
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = prevSelectedRows.includes(buddyCode)
                ? prevSelectedRows.filter(code => code !== buddyCode)
                : [...prevSelectedRows, buddyCode];
            return newSelectedRows;
        });
    };

    // 행 클릭 이벤트
    const handleRowClick = (buddyCode, e) => {
        if (e.target.type === 'checkbox') return; // 체크박스 클릭 시 이벤트 무시
        navigate(`/mypage/mybuddy/${buddyCode}`);
    };

    // 선택된 행 삭제
    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        // API로 삭제 요청
        dispatch(deleteBuddyAPI(selectedRows)).then(() => {
            alert("삭제되었습니다.");
            setSelectedRows([]);
            dispatch(callMyBuddyListAPI(currentPage)); // 삭제 후 목록 갱신
        }).catch(error => {
            console.error("Error deleting buddy:", error);
            alert("문제가 발생했습니다. 다시 시도해주세요.");
        });
    };

    return (
        <div className="buddy-page">
            <h2 className="buddy-title">MY게시글</h2>
            <table className="buddy-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedRows.length === (buddyList?.data?.length || 0) && buddyList?.data?.length > 0}
                            />
                        </th>
                        <th>버디</th>
                        <th>지역</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {buddyList?.data?.length > 0 ? (
                        buddyList.data.map((item, index) => (
                        <tr
                            key={index}
                            onClick={(e) => handleRowClick(item.buddyCode, e)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(item.buddyCode)}
                                    onChange={() => handleSelectRow(item.buddyCode)}
                                />
                            </td>
                            <td>{item.buddyTypeName}</td>
                            <td>{item.regionName}</td>
                            <td>{item.buddyTitle}</td>
                            <td>{item.buddyCreate.slice(0, 10)}</td>
                            <td>
                                <span className="status-button">{item.buddyStatus}</span>
                            </td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                             <td colSpan="6" className="no-data">게시글을 작성해 주세요</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* 페이지네이션 */}
            <div className="pagination">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                {[...Array(totalPages).keys()].map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
            </div>
            <button className="delete-button" onClick={handleDeleteSelected}>삭제</button>
        </div>
    );
}

export default MyBuddy;