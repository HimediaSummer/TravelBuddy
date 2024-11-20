import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getBuddyDetail } from "../../../modules/mypage/MyBuddyDetailModule.js"

function MyBuddy() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [buddyDetail, setBuddyDetail] = useState("");

    // function MyBuddy() {
    //     const { buddyCode } = useParams(); // URL에서 buddyCode 추출
    //     // ${buddyCode}
    // }

    useEffect(
        () => {
            fetch('/mypage/mybuddy/1')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setBuddyDetail(data.data); 
                console.log('setBuddyDetail 발동', data);
            })
            .catch((error) => {
                console.error('Error fetching buddy:', error);
            });
    }, []);

    return (
        <div>
            <ul>
                <li key={buddyDetail}>
                    <p>제목 : {buddyDetail.buddyTitle}</p> 
                    <p>내용 : {buddyDetail.buddyContents}</p>
                    <p>이미지 : {buddyDetail.buddyImg}</p>   
                    <p>지역 : {buddyDetail.region.regionName}</p> 
                    <p>작성일자 : {buddyDetail.buddyCreate}</p>  
                    <p>작성자 : {buddyDetail.account.memberName}</p>  
                    <p>버디유형 : {buddyDetail.buddyType.buddyTypeName}</p> 
                </li>
            </ul>
        </div>
    );
}

export default MyBuddy;

