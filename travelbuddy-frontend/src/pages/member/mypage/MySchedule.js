import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callMyScheduleAPI, deleteMyScheduleAPI } from '../../../apis/MypageAPICalls';
import './MySchedule.css';

function MySchedule() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { schedule } = useSelector((state) => state.myScheduleReducer) || { schedule: { data: [], pageInfo: {} } };
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {

        dispatch(callMyScheduleAPI(currentPage));
    }, [dispatch, currentPage]);

    // Redux 상태 확인
    useEffect(() => {
    }, [schedule]);

    const totalItems = schedule?.pageInfo?.total || 0;
    const itemsPerPage = schedule?.pageInfo?.amount || 10; 
    const totalPages = Math.ceil(totalItems / itemsPerPage); 

    useEffect(() => {
    }, [schedule, currentPage, totalPages]);

    // 전체 체크박스 선택
    const handleSelectAll = (e) => {
        if (!schedule?.data) return;
        if (e.target.checked) {
            const allRowIds = schedule.data.map((item) => item.scheCode);

            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    // 개별 체크박스 선택
    const handleSelectRow = (scheCode) => {
        if (!schedule?.data) return;
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = prevSelectedRows.includes(scheCode)
                ? prevSelectedRows.filter((code) => code !== scheCode)
                : [...prevSelectedRows, scheCode];

            return newSelectedRows;
        });
    };

    // 행 클릭 이벤트
    const handleRowClick = (scheCode, e) => {
        if (e.target.type === 'checkbox') return; // 체크박스 클릭 시 이벤트 무시
        navigate(`/mypage/myschedule/${scheCode}`);
    };

    // 선택된 행 삭제
    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            alert('삭제할 항목을 선택해주세요.');
            return;
        }

        dispatch(deleteMyScheduleAPI(selectedRows));
        setSelectedRows([]); // 선택된 행 초기화
    };


    return (
        <div className="schedule-page">
            <h2 className="schedule-title">MY 일정</h2>
            <table className="schedule-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={
                                    schedule?.data?.length > 0 &&
                                    selectedRows.length === schedule.data.length
                                }
                            />
                        </th>
                        <th>번호</th>
                        <th>지역</th>
                        <th>제목</th>
                        <th>여행시작</th>
                        <th>여행종료</th>
                    </tr>
                </thead>
                    <tbody>
                        {schedule?.data?.length > 0 ? (
                            schedule.data.map((item, index) => (
                                <tr
                                    key={index}
                                    onClick={(e) => handleRowClick(item.scheCode, e)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedRows.includes(item.scheCode)}
                                            onChange={() => handleSelectRow(item.scheCode)}
                                        />
                                    </td>
                                    <td>{item.scheCode}</td>
                                    <td>{item.regionName}</td>
                                    <td>{item.scheStartDate} ~ {item.scheEndDate} 까지의 {item.regionName} 의 일정 입니다.</td>
                                    {/* <td>{item.scheList}</td> */}
                                    <td>{item.scheStartDate}</td>
                                    <td>{item.scheEndDate}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" style={{ textAlign: 'center' }}>
                                    일정을 만들어 주세요
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    {schedule?.data?.length > 0 && (
                         <button className="delete-button" onClick={handleDeleteSelected}>삭제</button>
                    )}
                <br />
                {/* 페이지네이션 */}
                <div className="pagination">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        {'<'}
                    </button>
                    {[...Array(totalPages).keys()].map((_, index) => (
                        <button
                            key={index}
                            className={`pagination-button ${currentPage === index + 1 ? "active" : ""}`} // 여기 추가
                            onClick={() => {
                                setCurrentPage(index + 1);
                            }}
                            disabled={currentPage === index + 1}
                            >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        {'>'}
                    </button>
                </div>
        </div>
    );
}

export default MySchedule;
