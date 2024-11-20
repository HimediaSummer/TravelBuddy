import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getSchedule } from "../../../modules/mypage/MyScheduleModule.js"

function MySchedule() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [schedule, setSchedule] = useState("");
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

    useEffect(() => {
        console.log('Schedule State:', schedule);
    }, [schedule]);

    if (schedule.length === 0) {
        return <p>일정을 만들어 주세요</p>;
    }

    return (
        <div>
            <table>
                    <thead>
                        <th>
                            <input type="checkbox" id="selectAll" onclick="selectAllRows(this)" />
                        </th>
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
                                onClick={() => navigate(`/mypage/myschedule/${item.scheCode}`)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>
                                    <input type="checkbox" id={`select-${index}`} onClick={() => {}} />
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
        </div>
    );
}

export default MySchedule;

