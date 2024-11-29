import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

function MyScheduleDetail() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { scheCode } = useParams(); 
    const [scheDetail, setScheDetail] = useState({});
    const [testScheduleData, setTestScheduleData] = useState([]); // 테스트

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
                console.log('scheDetail:', scheDetail);
                console.log('scheDetail.scheList:', scheDetail.scheList);
                
                // const content = scheDetail.scheList;
                const content = data.data.scheList;
                console.log("content : ", content);
            
                // 문자열에서 JSON 배열 부분만 추출
                const jsonString = content.slice(content.indexOf('['), content.lastIndexOf(']') + 1);
                console.log('jsonString : ', jsonString);
            
                // JSON 형식으로 변환
                const jsonData = JSON.parse(jsonString);
                console.log("jsonData summarySchedule에서 사용할 데이터 json.parse 한 형태 : ", jsonData);
                setTestScheduleData(jsonData);
            
                console.log("testScheduleData" , testScheduleData);
            })
            .catch((error) => {
                console.error('Error fetching schedule:', error);
            });
        }, [scheCode]);
        
        // 날짜별로 데이터를 그룹화하는 함수
        const groupByDate = (data) => {
            return data.reduce((acc, item) => {
                const date = item.scheduledate;
                if (!acc[date]) {
                acc[date] = []; // 해당 날짜가 처음 등장하면 빈 배열 생성
                }
                acc[date].push(item); // 해당 날짜에 데이터를 추가
                return acc;
            }, {});
        };


    return (
        <div>
            <div className="chat-container">
                <h3>내가 만든 일정 상세 조회</h3>
                <form className="chat-form2" action="post">
                        <div className="schedule">
                            {testScheduleData && testScheduleData.length > 0 ? (
                                Object.entries(groupByDate(testScheduleData.slice(1))).map(([date, items], dayIndex) => (
                                <div className="day" key={dayIndex}>
                                    <div className="day-header">
                                    <h3>{dayIndex + 1}일차</h3> {/* 1일차, 2일차 등의 표시 */}
                                    <span className="date">{date}</span>
                                    {/* <h3>{date}</h3> 날짜 표시 */}
                                    </div>
                                    {items.map((item, index) => (
                                    <div className="scheduleitem" key={index}>
                                        <span className="schedulecircle">{index + 1}</span> {/* 일정 번호 */}
                                        <p>
                                        <strong>{item.sche_list}</strong> {/* 장소 이름 */}
                                        <br />
                                        {item.addres} {/* 주소 */}
                                        <br />
                                        <span className="time">{item.sche_time}</span> {/* 시간 */}
                                        </p>
                                    </div>
                                    ))}
                                </div>
                                ))
                            ) : (
                                <p>일정이 없습니다.</p>
                            )}
                        </div>
                </form>
                <div className="chat-box3" style={{marginTop: '100px'}}>
                    {scheDetail && scheDetail.scheList ? ( 
                    <ul>
                        <li key={scheDetail}>
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
                        <p>메인페이지에서 일정을 생성해주세요.</p>
                    )}
                    <button>삭제</button>
			    </div>
            </div>
        </div>
    );
}

export default MyScheduleDetail;