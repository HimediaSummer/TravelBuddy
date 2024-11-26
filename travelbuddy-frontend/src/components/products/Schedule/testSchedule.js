import React from "react";

const App = () => {
  return (
    <div className="container">
        <head>
            <meta charset="UTF-8" />
            <link rel="stylesheet" href="/CSS/Schedule.css"/>
            <title>Travel Buddy</title>
        </head>
      <main>
        <aside className="sidebar">
          <h2>Part 5. 전체일정</h2>
          <p>제주도</p>
          <p>2024.11.05(화) ~ 2024.11.06(수)</p>
        </aside>

        <section className="schedule">
          <div className="day">
            <h3>1일차</h3>
            <h3>2024.11.05(화)</h3>
            <div className="scheduleitem">
              <span className="circle">1</span>
              <p>
                <strong>공항</strong>
                <br />
                제주국제공항 
                <br />
                <span className="time">13:00 ~ 14:00</span>
              </p>
            </div>
            <div className="item">
              <span className="circle">2</span>
              <p>
                <strong>숙소</strong>
                <br />
                제주신화월드 
                <br />
                <span className="time">13:00 ~ 14:00</span>
              </p>
            </div>
            {/* Add more items as needed */}
          </div>

          <div className="day">
            <h3>2일차 2024.11.06(수)</h3>
            <div className="item">
              <span className="circle">1</span>
              <p>
                <strong>숙소</strong>
                <br />
                제주신화월드 
                <br />
                <span className="time">13:00 ~ 14:00</span>
              </p>
            </div>
            <div className="item">
              <span className="circle">2</span>
              <p>
                <strong>명소</strong>
                <br />
                성산일출봉 
                <br />
                <span className="time">17:00 ~ 18:00</span>
              </p>
            </div>
            {/* Add more items as needed */}
          </div>
        </section>

        <section className="map">
          <h2>지도</h2>
          <img src="/path-to-map-image.png" alt="지도" />
        </section>
      </main>
      <footer>
        <button>일정 저장</button>
      </footer>
    </div>
  );
};

export default App;