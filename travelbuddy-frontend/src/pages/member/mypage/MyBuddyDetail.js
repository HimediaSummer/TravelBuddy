import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBuddyDetail } from "../../../modules/mypage/MyBuddyDetailModule.js"

function MyBuddy() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { buddyCode } = useParams(); 
    const [buddyDetail, setBuddyDetail] = useState({});
    const [buddyMatch, setBuddyMatch] = useState([]);

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
                setBuddyMatch(data.data.getBuddyMatchList);
                console.log('setBuddyDetail 발동', data);
            })
            .catch((error) => {
                console.error('Error fetching buddy:', error);
            });
    }, [buddyCode]);

    return (
        <div>
            <h3>내가 쓴 버디 게시글 상세 조회</h3>
            <ul>
                <li key={buddyDetail}>
                    <p>제목 : {buddyDetail.buddyTitle}</p> 
                    <p>내용 : {buddyDetail.buddyContents}</p>
                    <p>이미지 : {buddyDetail.buddyImg}</p>   
                    <p>지역 : {buddyDetail.regionName}</p> 
                    <p>작성일자 : {buddyDetail.buddyCreate}</p>  
                    <p>작성자 : {buddyDetail.memberName}</p>  
                    <p>버디유형 : {buddyDetail.buddyTypeName}</p> 
                </li>
            </ul>

            <h2>신청 회원 리스트</h2>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>회원 ID</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {buddyMatch.map((match, index) => (
                        <tr key={match.buddyMatchCode}>
                            <td><input type="checkbox" id={`select-${index}`} /></td>
                            <td>{index + 1}</td>
                            <td>{match.applyId}</td>
                            <td>
                            {match.applyStatus === 1
                                ? '신청'
                                : match.applyStatus === 2
                                ? '수락'
                                : '거절'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default MyBuddy;

