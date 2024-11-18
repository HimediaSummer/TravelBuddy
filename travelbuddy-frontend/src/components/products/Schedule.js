import React, { useEffect, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import 'moment/locale/ko';
import DateSchedule from './Schedule/DateSchedule';
import RegionSchedule from './Schedule/RegionSchedule';
import AccomSchedule from './Schedule/AccomSchedule';
import QuestionSchedule from './Schedule/QuestionSchedule';
import Summary from './Schedule/SummarySchedule';

function Schedule() {
  const [currentStep, setCurrentStep] = useState(0); // z컴포넌트 바꾸기?

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 날짜
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedRange, setSelectedRange] = useState([null, null]);

  // 각 단계 컴포넌트들
  const steps = [
    <DateSchedule onNext={() => setCurrentStep(1)} />,
	<RegionSchedule onNext={() => setCurrentStep(2)} />,
	<AccomSchedule onNext={() => setCurrentStep(3)} />,
	<QuestionSchedule onNext={() => setCurrentStep(4)} />,
    <Summary />
  ];

  return (
    <div className="App">
      <head>
        <meta charset="UTF-8" />
        <script src="https://kit.fontawesome.com/9e9931aed0.js" crossorigin="anonymous"></script>
        <link rel="stylesheet" href="/CSS/media.css"/>
        <link rel="stylesheet" href="/CSS/menu.css"/>
        <link rel="stylesheet" href="/CSS/slide.css"/>
        <link rel="stylesheet" href="/CSS/style.css"/>
        <title>Travel Buddy</title>
      </head>

        <body>
            <header class="header">
                <h1>
                    <div class="header-click">
                        <i class="fa-solid fa-globe"></i>
                            <a href="http://travel-buddy.me/">Travel Buddy</a>
                    </div>
                </h1>
                    <ul class="menu">
                        <li>이용 방법</li>
                        <li>커뮤니티</li>
                        <li>회원가입</li>
                        <li>로그인</li>
                    </ul>
                    <button class="header_toogleBtn">
                        <i class="fas fa-bars"></i>
                    </button>
            </header>
            
            {/* main */}
            <main class="wrap">
                <div id="plan-order">
                    <div class="order-title">
                        <p class="step">STEP 1</p>
                        <p>날짜 선택</p>
                    </div>
                    <i id="arrow-icon"class="fa-solid fa-angle-right"></i>
                    <div class="order-title">
                        <p class="step">STEP 2</p>
                        <p>장소 선택</p>
                    </div>
                    <i id="arrow-icon" class="fa-solid fa-angle-right"></i>
                    <div class="order-title">
                        <p class="step">STEP 3</p>
                        <p>숙소 선택</p>
                    </div>
                    <i id="arrow-icon" class="fa-solid fa-angle-right"></i>
                    <div class="order-title">
                        <p class="step">STEP 4</p>
                        <p>질문 선택</p>
                    </div>
                    <i id="arrow-icon"class="fa-solid fa-angle-right"></i>
                    <div class="order-title">
                        <p class="step">STEP 5</p>
                        <p>일정 생성</p>
                    </div>
                </div>

                <div id="chat-box" >
                    <p>트래블 버디</p>
                    <p>어떤 여행을 하고싶나요?<i id="plane-icon"class="fa-solid fa-plane-departure"></i></p>
                </div>
                
				{/* 날짜 선택 모달 */}
                {/* 출발일, 도착일 */}
                {steps[currentStep]}
                {/* Region */}
                {/* Accommodation */}
                {/* Qestion */}
                {/* Schedule */}
                {/* Loading */}
            </main>
            {/* Footer */}
            <footer class="footer">
                <div>
                    <div class="icon">
                        <a href="https://travel-buddy.me"><i id="icon"class="fa-brands fa-github"></i></a>
                        <a href="https://github.com/HimediaSummer/TravelBuddy" ><i id="icon" class="fa-solid fa-blog"></i></a>
                    </div>
                    Copyright 2024. Travel Buddy All rights reserved
                </div>
            </footer>
        </body>
    </div>
  );
}

export default Schedule;