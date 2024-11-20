import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getScheDetail } from "../../../modules/mypage/MyScheduleDetailModule.js"

function MyScheduleDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { scheCode } = useParams(); 
    const [scheDetail, setScheDetail] = useState({});

    console.log('Sche Code:', scheCode);

    useEffect(
        () => {
            fetch(`/mypage/myschedule/${scheCode}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setScheDetail(data.data); 
                console.log('Updated scheDetail:', data.data);
            })
            .catch((error) => {
                console.error('Error fetching schedule:', error);
            });
    }, [scheCode]);

    return (
        <div>
            <h3>내가 만든 일정 상세 조회</h3>
            {scheDetail && scheDetail.scheList ? ( 
            <ul>
                <li key={scheDetail}>
                    <p>제목 : {scheDetail.scheList}</p> 
                    <p>지역 : {scheDetail.region.regionName}</p> 
                    <p>숙소명 : {scheDetail.accommodation.accomName}</p> 
                    <p>여행시작일 : {scheDetail.scheStartDate}</p> 
                    <p>여행종료일 : {scheDetail.scheEndDate}</p> 
                    <p>여행시작시간 : {scheDetail.scheStartTime}</p> 
                    <p>여행종료시간 : {scheDetail.scheEndTime}</p>  
                    <p>여행시간 : {scheDetail.travelTime}</p>  
                    <p>여행시간 : {scheDetail.scheTime}</p> 
                </li>
            </ul>
              ) : (
                <p>Loading...</p>
            )}
            <button>다시만들기</button>
            <button>삭제</button>
        </div>
    );
}

export default MyScheduleDetail;