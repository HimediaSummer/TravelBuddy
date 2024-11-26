import React from "react";
import "./Schedule.css";

function Schedule() {
    const itinerary = [
        {
            day: "1일차",
            date: "2024-11-22(금)",
            activities: [
                {
                    time: "14:28-14:28",
                    type: "항공",
                    place: "제주국제공항",
                    duration: "53분",
                },
                {
                    time: "15:21-15:21",
                    type: "숙소",
                    place: "스위트호텔 제주",
                    link: "예약하기",
                    duration: "94분",
                },
                {
                    time: "16:55-18:55",
                    type: "명소",
                    place: "섭지코지",
                    duration: "5분",
                },
                {
                    time: "20:00-22:00",
                    type: "명소",
                    place: "성산 일출봉",
                    duration: "95분",
                },
                {
                    time: "22:33-23:33",
                    type: "숙소",
                    place: "스위트호텔 제주",
                    link: "예약하기",
                },
            ],
        },
        {
            day: "2일차",
            date: "2024-11-23(토)",
            activities: [
                {
                    time: "18:56-18:56",
                    type: "숙소",
                    place: "스위트호텔 제주",
                    link: "예약하기",
                    duration: "94분",
                },
                {
                    time: "20:00-22:00",
                    type: "명소",
                    place: "제주동문시장",
                    duration: "48분",
                },
                {
                    time: "22:48-22:48",
                    type: "숙소",
                    place: "스위트호텔 제주",
                    link: "예약하기",
                },
                {
                    time: "23:33-23:33",
                    type: "항공",
                    place: "제주국제공항",
                },
            ],
        },
    ];

    return (
        <div className="schedule-container">
            <div className="sidebar">
                <button className="sidebar-btn">전체일정</button>
                {itinerary.map((day, index) => (
                    <button key={index} className="sidebar-btn">{day.day}</button>
                ))}
                <button className="save-btn">저장</button>
            </div>
            <div className="main">
                <div className="header">
                    <h1>제주</h1>
                    <p>2024.11.22-2024.11.23</p>
                    <button className="flight-btn">항공권</button>
                    <button className="hotel-btn">숙소</button>
                </div>
                {itinerary.map((day, index) => (
                    <div key={index} className="day-schedule">
                        <h2>{day.day}</h2>
                        <p>{day.date}</p>
                        {day.activities.map((activity, actIndex) => (
                            <div key={actIndex} className="activity">
                                <div className="activity-time">{activity.time}</div>
                                <div className="activity-type">{activity.type}</div>
                                <div className="activity-place">
                                    {activity.place}{" "}
                                    {activity.link && <a href="#">{activity.link}</a>}
                                </div>
                                <div className="activity-duration">{activity.duration}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="map">
                <div className="map-placeholder">지도 영역</div>
            </div>
        </div>
    );
}

export default Schedule;
