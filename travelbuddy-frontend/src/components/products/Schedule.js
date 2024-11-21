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
	// 지역값 전달하기 도전중
	const [selectedRegion, setSelectedRegion] = useState(null);

	// 각 단계 컴포넌트들
	const steps = [
		<DateSchedule onNext={() => setCurrentStep(1)} />,
		<RegionSchedule onNext={() => setCurrentStep(2)} selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion}/>,
		<AccomSchedule onNext={() => setCurrentStep(3)}  selectedRegion={selectedRegion} setSelectedRegion={setSelectedRegion}/>,
		<QuestionSchedule onNext={() => setCurrentStep(4)} />,
		<Summary />
	];

	const travelData = {
		startDate: "2023-10-01",
		endDate: "2023-10-07",
		accommodations: ["Hotel A", "Hotel B"],
		regions: ["Seoul", "Busan"],
		questions: ["What to do?", "Where to eat?"]
	};

	return (
		<div className="App">
			<head>
				<meta charset="UTF-8" />
				<script src="https://kit.fontawesome.com/9e9931aed0.js" crossorigin="anonymous"></script>
				<link rel="stylesheet" href="/CSS/media.css" />
				<link rel="stylesheet" href="/CSS/menu.css" />
				<link rel="stylesheet" href="/CSS/slide.css" />
				<link rel="stylesheet" href="/CSS/style.css" />
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
				<main class="wrap2">
					<div id="plan-order2">
						{['날짜 선택', '장소 선택', '숙소 선택', '질문 선택', '일정 생성'].map((title, index) => (
							<div className="order-title" key={index}>
								<p className="step" style={{ color: currentStep === index ? '#1F709E' : '#8CC8EA' }}>
									STEP {index + 1}
								</p>
								<p>{title}</p>
							</div>
						))}
					</div>

					<div className="main-content">
						<div id="chat-box" >
							<p>트래블 버디</p>
							<p>어떤 여행을 하고싶나요?<i id="plane-icon" class="fa-solid fa-plane-departure"></i></p>
						</div>
						{/* 날짜 선택 모달 */}
						{/* 출발일, 도착일 */}
						{/* Region */}
						{/* Accommodation */}
						{/* Qestion */}
						{/* Schedule */}
						{/* Loading */}
						{steps[currentStep]}
					</div>
				</main>

				{/* Footer */}
				<footer class="footer">
					<div>
						<div class="icon">
							<a href="https://travel-buddy.me"><i id="icon" class="fa-brands fa-github"></i></a>
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