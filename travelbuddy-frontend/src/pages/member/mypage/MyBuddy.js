import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBuddy } from "../../../modules/mypage/MyBuddyModule.js"

function MyBuddy() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [buddy, setBuddy] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(
        () => {
            fetch('/mypage/mybuddy')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setBuddy(data.data || []); 
                console.log('setBuddy 발동', data);
            })
            .catch((error) => {
                console.error('Error fetching buddy:', error);
            });
    }, []);

    useEffect(() => {
        console.log('Buddy State:', buddy);
    }, [buddy]);

    if (buddy.length === 0) {
        return <p>게시글을 작성 해 주세요</p>;
    }

    // 전체 체크박스 선택
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allRowIds = buddy.map(item => item.buddyCode);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    // 개별 체크박스 선택
    const handleSelectRow = (buddyCode) => {
        setSelectedRows(prevSelectedRows => {
            const newSelectedRows = prevSelectedRows.includes(buddyCode)
                ? prevSelectedRows.filter(code => code !== buddyCode)
                : [...prevSelectedRows, buddyCode];

            console.log(
                "Current selected rows:",
                buddy.filter(item => newSelectedRows.includes(item.buddyCode))
            );
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

    // 서버에 삭제 요청 보내기
    fetch('/mypage/mybuddy/delete', {
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
            alert("삭제되었습니다.");
            setBuddy(buddy.filter(item => !selectedRows.includes(item.buddyCode)));
            setSelectedRows([]); 
            console.log("Sending request with body뒤진다:", JSON.stringify(selectedRows));
        })
        .catch((error) => {
            console.error("Error deleting buddy:", error);
            alert("문제가 발생했습니다. 다시 시도해주세요.");
            console.log("Deleting buddy with IDs:욕나와", selectedRows);
        });
    };

    return (
        <div>
            <table>
                    <thead>
                        <input 
                            type="checkbox" 
                            onChange={handleSelectAll} 
                            checked={selectedRows.length === buddy.length && buddy.length > 0} 
                        />
                        <th>버디</th>
                        <th>지역</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </thead>
                    <tbody>
                        {buddy.map((item, index) => (
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
                                <td>{item.buddyCreate}</td>
                                <td>{item.buddyStatus}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
            <button onClick={handleDeleteSelected}>삭제</button>
        </div>
    );
}

export default MyBuddy;

