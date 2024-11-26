import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBuddy } from "../../../modules/mypage/MyBuddyModule.js"
import { putBuddy } from "../../../modules/mypage/MyBuddyModule.js"

function MyBuddyDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { buddyCode } = useParams(); 
    const [buddyDetail, setBuddyDetail] = useState({});
    const [regionName, setRegionName] = useState(""); // 지역명
    const [buddyTypeName, setBuddyTypeName] = useState(""); // 버디 유형
    const [memberName, setMemberName] = useState(""); // 작성자 이름
    const [buddyMatch, setBuddyMatch] = useState([]);
    const [selectedBuddyMatches, setSelectedBuddyMatches] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);

    console.log('Buddy Code:', buddyCode);
    

    useEffect(
        () => {
            fetch(`/mypage/mybuddy/${buddyCode}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setBuddyDetail(data.data.getBuddyDetail); 
                setRegionName(data.data.regionName); 
                setBuddyTypeName(data.data.buddyTypeName); 
                setMemberName(data.data.memberName); 
                setBuddyMatch(data.data.getBuddyMatchList);
                console.log('setBuddyDetail 발동', data);
            })
            .catch((error) => {
                console.error('Error fetching buddy:', error);
            });
    }, [buddyCode]);

    // 헤더 체크박스
    const handleSelectAll = () => {
        if (isAllSelected) {
            // 전체 선택 해제
            setSelectedBuddyMatches([]);
        } else {
            // 모든 buddyMatchCode 추가
            const allMatches = buddyMatch.map((match) => match.buddyMatchCode);
            setSelectedBuddyMatches(allMatches);
        }
        setIsAllSelected(!isAllSelected);
    };

    // 개별선택
    const handleCheckboxChange = (buddyMatchCode) => {
        setSelectedBuddyMatches((prev) =>
            prev.includes(buddyMatchCode)
                ? prev.filter((code) => code !== buddyMatchCode) // 이미 선택된 경우 제거
                : [...prev, buddyMatchCode] // 선택된 경우 추가
        );
    };

     // 헤더 체크박스 상태 동기화
     useEffect(() => {
        setIsAllSelected(
            buddyMatch.length > 0 && buddyMatch.length === selectedBuddyMatches.length
        );
    }, [buddyMatch, selectedBuddyMatches]);

    // 상태 업데이트 공통 함수
    const updateStatus = async (applyStatus) => {
        if (selectedBuddyMatches.length === 0) {
        alert(applyStatus === 2 ? "수락할 회원을 선택해주세요." : "거절할 회원을 선택해주세요.");
        return;
        }

        if (applyStatus === 2) {
            // 이미 수락된 회원이 있는지 확인
            const alreadyAccepted = buddyMatch.filter((match) => match.applyStatus === 2).length;
    
            // 이미 수락된 회원이 있는 경우
            if (alreadyAccepted > 0) {
                alert("이미 수락된 회원이 있습니다. 추가로 수락할 수 없습니다.");
                return;
            }
    
            // 새로 선택된 회원이 2명 이상인 경우
            if (alreadyAccepted + selectedBuddyMatches.length > 1) {
                alert("수락 회원은 1명만 선택할 수 있습니다.");
                return;
            }
        }

        try {
            for (const buddyMatchCode of selectedBuddyMatches) {
                const response = await fetch(`/mypage/mybuddy/${buddyCode}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        buddyMatchCode,
                        applyStatus, 
                    }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update buddyMatchCode ${buddyMatchCode}: ${response.statusText}`);
        }
    }

        alert(applyStatus === 2 ? "수락되었습니다." : "거절되었습니다.");

        // 상태 업데이트
        setBuddyMatch((prev) =>
            prev.map((match) =>
            selectedBuddyMatches.includes(match.buddyMatchCode)
                ? { ...match, applyStatus }
                : match
            )
        );
        setSelectedBuddyMatches([]); // 선택 초기화
    } catch (error) {
        console.error("Error updating status:", error);
        alert("상태 업데이트 중 오류가 발생했습니다.");
    }
    };

    return (
        <div style={{ display: 'flex', gap: '20px', justifyContent: 'space-between' }}>
            {/* 왼쪽 영역 */}
            <div style={{ flex: 1 }}>
                <h3>내가 쓴 버디 게시글 상세 조회</h3>
                <ul>
                    <li key={buddyDetail.buddyCode}>
                        <p>제목 : {buddyDetail.buddyTitle}</p> 
                        <p>내용 : {buddyDetail.buddyContents}</p>
                        {/* 이미지 */}
                        {buddyDetail.buddyImg && (
                            <img 
                                src={buddyDetail.buddyImg} 
                                alt="Buddy" 
                                style={{ width: '200px', height: 'auto' }} 
                            />
                        )} 
                        <p>지역 : {regionName}</p> 
                        <p>작성일자 : {buddyDetail.buddyCreate}</p>  
                        <p>작성자 : {memberName}</p>  
                        <p>버디유형 : {buddyTypeName}</p> 
                    </li>
                </ul>
                <button onClick={() => navigate(`/mypage/mybuddy/${buddyCode}/update`)}>
                수정
                </button>
            </div>

            {/* 오른쪽 영역 */}
            <div style={{ flex: 1 }}>
                <h2>신청 회원 리스트</h2>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th>번호</th>
                            <th>회원 ID</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {buddyMatch.length > 0 ? (
                            buddyMatch.map((match, index) => (
                                <tr key={match.buddyMatchCode}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedBuddyMatches.includes(match.buddyMatchCode)}
                                            onChange={() => handleCheckboxChange(match.buddyMatchCode)}
                                        />
                                    </td>
                                    <td>{index + 1}</td>
                                    <td>{match.applyId}</td>
                                    <td>
                                    {match.applyStatus === 1
                                        ? '대기중'
                                        : match.applyStatus === 2
                                        ? '수락'
                                        : '거절'}
                                    </td> 
                                </tr>
                            ))
                            ) : (
                                <tr>
                                    <td colSpan="4" style={{ textAlign: 'center' }}>
                                        신청 회원이 없습니다.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                </table>
                <div>
                    <button onClick= {() => updateStatus(2)}>수락</button>
                    <button onClick={() => updateStatus(3)}>거절</button>
                </div>
            </div>
        </div>
    );
}

export default MyBuddyDetail;
