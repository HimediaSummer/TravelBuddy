import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function MyMatchDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { buddyCode } = useParams(); 
    const [buddyMatchDataList, setBuddyMatchDataList] = useState([]);
    const [buddyList, setBuddyList] = useState([]);

    console.log('Buddy Code:', buddyCode);
    

    useEffect(
        () => {
            fetch(`/mypage/mymatch`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setBuddyList(data.data.buddyList); 
                setBuddyMatchDataList(data.data.buddyMatchDataList);
                console.log('setBuddyDetail 발동', data);
            })
            .catch((error) => {
                console.error('Error fetching buddy:', error);
            });
    }, []);

    const handleCancel = (buddyMatchCode) => {
        if (!window.confirm("신청을 취소하시겠습니까?")) {
          return;
        }
    
        fetch(`/mypage/mymatch`, {
            method: "DELETE",
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("Failed to cancel request");
              }
              alert("신청이 취소되었습니다.");
              // 삭제된 행을 화면에서 제거
              setBuddyMatchDataList((prev) =>
                prev.filter((match) => match.buddyMatchCode !== buddyMatchCode)
              );
            })
            .catch((error) => {
              console.error("Error cancelling request:", error);
              alert("신청 취소 중 오류가 발생했습니다.");
            });
        };

    return (
        <div>
            <h3>내가 신청한 글 상세조회</h3>
                {buddyList.length > 0 ? (
                    <ul>
                        {buddyList.map((buddy, index) => (
                            <li key={index}>
                                <p>제목 : {buddy.buddyTitle}</p> 
                                <p>내용 : {buddy.buddyContents}</p>
                                <p>이미지 : {buddy.buddyImg}</p>   
                                <p>지역 : {buddy.region.regionName}</p> 
                                <p>작성일자 : {buddy.buddyCreate}</p>  
                                <p>작성자 : {buddy.account.memberName}</p>  
                                <p>버디유형 : {buddy.buddyType.buddyTypeName}</p> 
                    <ul>
                    {buddyMatchDataList
                                .filter((match) => match.buddyCode === buddy.buddyCode) // Buddy와 연관된 매칭 데이터만 출력
                                .map((match, matchIndex) => (
                                    <li key={matchIndex}>
                                        <p>ApplyId: {match.applyId}</p>
                                        <p>
                                            ApplyStatus:{" "}
                                            {match.applyStatus === 1
                                                ? "대기중"
                                                : match.applyStatus === 2
                                                ? "수락"
                                                : "거절"}
                                        </p>      
                                        <button onClick={() => handleCancel(match.buddyMatchCode)}>
                                            신청취소
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>   
            ) : (
                <p>신청한 버디가 없습니다.</p>
            )}
        </div>
    );
}

export default MyMatchDetail;
