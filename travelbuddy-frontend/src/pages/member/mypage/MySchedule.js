import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSchedule } from "../../../modules/mypage/MyScheduleModule.js"

function MySchedule() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);

    // 데이터 가져오기
    useEffect(
        () => {
            fetch('/mypage/myschedule')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setSchedule(data.data || []); 
                console.log('setSchedule 발동', data);
            })
            .catch((error) => {
                console.error('Error fetching schedule:', error);
            });
    }, []);

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
        </div>
    );
}

export default MySchedule;

