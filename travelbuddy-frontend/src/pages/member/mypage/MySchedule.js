import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSchedule } from "../../../modules/mypage/MyScheduleModule.js"

function MySchedule() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const [totalItems, setTotalItems] = useState(0); // 전체 게시글 수
    const itemsPerPage = 10; // 페이지당 항목 수

    // 데이터 가져오기
    const fetchScheList = async (page) => {
        try {
            const response = await fetch(`/mypage/myschedule?offset=${page}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Fetched schedule data!!!!!!!!!!!!!!!!!!:", data);

            // 데이터를 state에 설정
            setSchedule(data.data.data || []); // 게시글 목록
            setTotalItems(data.data.pageInfo.total || 0); // 전체 게시글 수
            console.log("전체 일정 수:", data.data.pageInfo.total);
            console.log("현재 페이지 데이터:", data.data.data);
        } catch (error) {
            console.error("Error fetching buddy list:", error);
            alert("데이터를 가져오는 중 오류뿅콩뿅콩뿅콩뿅콩뿅콩뿅콩");
        }
    };

    useEffect(() => {
        fetchScheList(currentPage);
    }, [currentPage]);


    // 전체 체크박스 선택
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allRowIds = schedule.map(item => item.scheCode);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    // 개별 체크박스 선택
    const handleSelectRow = (scheCode) => {
        setSelectedRows(prevSelectedRows => {
            const newSelectedRows = prevSelectedRows.includes(scheCode)
                ? prevSelectedRows.filter(code => code !== scheCode)
                : [...prevSelectedRows, scheCode];

            console.log(
                "Current selected rows:",
                schedule.filter(item => newSelectedRows.includes(item.scheCode))
            );
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
            alert("삭제할 항목을 선택해주세요.");
            return;

        }

    // 서버에 삭제 요청 보내기
    fetch('/mypage/myschedule/delete', {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedRows), 
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("삭제 요청 실패");
            }
            return response.json();
        })
        .then(() => {
            alert("일정이 삭제되었습니다.");
            setSchedule(schedule.filter(item => !selectedRows.includes(item.scheCode)));
            setSelectedRows([]); 
            console.log("Sending request with body뒤진다:", JSON.stringify(selectedRows));
        })
        .catch((error) => {
            console.error("Error deleting schedules:", error);
            alert("문제가 발생했습니다. 다시 시도해주세요.");
            console.log("Deleting schedules with IDs:욕나와", selectedRows);
        });
    };
    
    // 총 페이지 수 계산
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div>
            {schedule.length === 0 ? (
                <p>일정을 만들어 주세요</p>
            ) : (
            <>
                <table>
                        <thead>
                            <input 
                                type="checkbox" 
                                onChange={handleSelectAll} 
                                checked={selectedRows.length === schedule.length && schedule.length > 0} 
                            />
                            <th>번호</th>
                            <th>지역</th>
                            <th>제목</th>
                            <th>여행시작</th>
                            <th>여행종료</th>
                        </thead>
                        <tbody>
                            {schedule.map((item, index) => (
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
                                    <td>{item.scheList}</td>
                                    <td>{item.scheStartDate}</td>
                                    <td>{item.scheEndDate}</td>
                                </tr>
                            ))}
                        </tbody>
                </table>
            <button onClick={handleDeleteSelected}>삭제</button>
            </>
            )}
            <br/>
            {/* 페이지네이션 */}
            <div style={{ marginTop: "20px" }}>
                <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                >
                {"<"}
                </button>
                {[...Array(totalPages).keys()].map((_, index) => (
                <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    disabled={currentPage === index + 1}
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
        </div>
    );
}

export default MySchedule;

