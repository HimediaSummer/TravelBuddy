import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import 'moment/locale/ko';
import Region from './Region';
import Accom from './Accom';
import Question from './Question';


// 모달 body 태그에 붙이기
Modal.setAppElement('#root');
moment.locale('ko');

function Schedule() {
	const [currentStep, setCurrentStep] = useState(0); // z컴포넌트 바꾸기?
//   const [message, setMessage] = useState('');
  const [accom, setAccom] = useState([]);
  const [region, setRegion] = useState([]);
  const [qTheme, setQTheme] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedAccom, setSelectedAccom] = useState(null);
  const [selectedQuestionTheme, setSelectedQuestionTheme] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState(null);

  // 모달
  const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedDate, setSelectedDate] = useState(new Date());

  // 날짜
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [selectedRange, setSelectedRange] = useState([null, null]);

  // 각 단계 컴포넌트들
  const steps = [
	<Region onNext={() => setCurrentStep(1)} />,
	<Accom onNext={() => setCurrentStep(2)} />,
	<Question onNext={() => setCurrentStep(2)} />
  ];

  // 페이지 오면 모달 자동으로 열리게
  useEffect(
	() => {setIsModalOpen(true);},
	[]
  );

  // 모달 닫기
  const closeModal = () => {
	if(!startDate || !endDate) {
		alert('날짜를 선택해주세요.');
		return;
	}
	setIsModalOpen(false);
  };

  // 날짜 선택 최대 5일
  const diffdays = (start, end) => {
	const startDate = new Date(start);
	const endDate = new Date(end);
	return (endDate - startDate) / (1000 * 3600 * 24);
  };

  // 날짜 선택 핸들러
  const dateSelectedHandler = e => {

	const start = e[0];
	const end = e[1];

	if(start && end) {

		const daysDiff = diffdays(start, end);
		
		if(daysDiff > 5) {
			alert('최대 5일까지 선택 가능합니다.');
			setStartDate(null);
			setEndDate(null);
			setSelectedRange([null, null]);
			return;
		}

		const startDateFormat = moment(start).format("MM.DD(ddd)");
		const endDateFormat = moment(end).format("MM.DD(ddd)");

		setStartDate(startDateFormat);
        setEndDate(endDateFormat);
		setSelectedRange([start, end]);
	}
};

//   useEffect(() => {
//     // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
//     fetch('http://localhost:8080/schedule')
//       .then(response => response.text())
//       .then(data => setMessage(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   useEffect(() => {
//     // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
//     fetch('http://localhost:8080/schedule/accom/1')
//       .then(response => response.text())
//       .then(data => setMessage(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

//   useEffect(() => {
//     // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
//     fetch('http://localhost:8080/schedule/region')
//       .then(response => response.text())
//       .then(data => setRegion(data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

    // useEffect(() => {
    //     // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
    //     fetch('http://localhost:8080/schedule/accom')
    //     .then(response => response.text())
    //     .then(data => setAccom(data))
    //     .catch(error => console.error('Error fetching data:', error));
    // }, []);

	// 장소
    useEffect(() => {
    // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
    fetch('http://localhost:8080/schedule/region')
        .then(response => response.json())
        .then(data => {
            const regions = data.data.regions.map(region => ({
            regionCode : region.regionCode,
            regionName : region.regionName
        }));
		console.log("가져왓냐?", data);
        setRegion(regions);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

	// 숙소
    useEffect(() => {
        fetch('http://localhost:8080/schedule/accom')
          .then(response => response.json())
          .then(data => {
              const accommodations = data.data.Accommodations.map(accom => ({
              accomCode: accom.accomCode,
              accomType: accom.accomType
            }));
			console.log("가져왓냐?", data);
            setAccom(accommodations);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

	  // 질문지 테마
	  useEffect(() => {
        fetch('http://localhost:8080/schedule/question')
          .then(response => response.json())
          .then(data => {
			console.log('가져온거', data);
              const questionThemes = data.data.qThemes.map(qTheme => ({
              themeCode: qTheme.themeCode,
              questionTheme: qTheme.questionTheme
            }));
			console.log("가져왓냐?", data);
            setQTheme(questionThemes);
          })
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        console.log("Selected Region:", region);
      };

      const handleAccomSelect = (accom) => {
        setSelectedAccom(accom);
        console.log("Selected Accommodation:", accom);
      };

	  const handleQuestionThemeSelect = qTheme => {
		const selectedQThemes = qTheme.target.value;

		if(selectedQuestionTheme === selectedQThemes) {
			setSelectedQuestionTheme(null);
		} else {
			setSelectedQuestionTheme(selectedQThemes);
		}
		console.log("Selected QuestionTheme:", selectedQThemes);
	  };

	  const handleQuestionThemeSelect2 = qTheme => {
		setSelectedQuestionTheme(qTheme);
		console.log("Selected QuestionTheme:", qTheme);
	  };

  return (
    <div className="App">
      {/* <h2>Regions</h2>
      {region.map((region, index) => (
        <div key={index}>
          <p>regionCode: {region.regionCode}</p>
          <p>regionName: {region.regionName}</p>
        </div>
      ))} */}
      
      {/* <h2>Accommodations</h2>
      {accom.map((accom, index) => (
        <div key={index}>
          <p>accomCode: {accom.accomCode}</p>
          <p>accomType: {accom.accomType}</p>
        </div>
      ))} */}
{/* 
	 <h2>QuestionThemes</h2>
      {qTheme.map((qTheme, index) => (
        <div key={index}>
          <p>themeCode: {qTheme.themeCode}</p>
          <p>questionTheme: {qTheme.questionTheme}</p>
        </div>
      ))} */}

      {/* {accom} */}
      {/* {accom.accomCode} */}
      <br/>      
      <br/>      
      {/* {region} */}
      {/* {region.regionCode} */}
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
				<Modal
					isOpen={isModalOpen}
					onRequestClose={closeModal}
					contentLabel="날짜선택모달"
					style={{
						overlay: {
							backgroundColor: "rgba(0, 0, 0, 0.75)",
							zIndex: 20
						},
						content: {
							position: 'absolute',
							top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            zIndex: 20,
							width: "50%",
							height: "70%"
						}
					}}
				>
					<div style={{textAlign: 'center'}}>
					<h4>행복한 여행기간을 선택해주세요!</h4>
					<p>최대 5일까지 선택 가능합니다.</p>
					</div>
					<div style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center'
						}}>
					<Calendar
						onChange={dateSelectedHandler}
						value={selectedRange}
						minDate={new Date()}
						selectRange={true}
						formatDay={(locale, date) => moment(date).format("DD") }
					/>
					</div>
					<br/>
					<div style={{textAlign: 'right', paddingRight: '50px'}}>
					<button onClick = {closeModal} disabled={! startDate || !endDate}>선택완료</button>
					</div>

				</Modal>

                    <div class="chat-container">
                        <form class="chat-form" action="post">
                            <div class="user_input">
                                <h2 class="chat-head" style={{margin: 'auto'}}>장소를 입력해주세요.</h2>
								<h5 style={{margin: 'auto'}}>{startDate || ""} ~ {endDate || ""}</h5>
                                {/* 출발일, 도착일 */}
                                <div class="travel-date">
                                    <div class="depart">
                                        <h3 id="depart-schedule">{startDate || ""}&nbsp;&nbsp;오전 10:00&nbsp;&nbsp;오후10:00</h3>
                                    </div>
                                    <div class="arrive">
									<h3 id="depart-schedule">{endDate || ""}&nbsp;&nbsp;오전 10:00&nbsp;&nbsp;오후 10:00</h3>
                                    </div>
                                </div>
                                <div class="location">
                                <div class="depart-airport">
                                {/* <div class="tema-title">
                                    <legend>가고싶은 도시를 선택해주세요</legend>
                                </div>
                                    <select id="start-point">
                                        <option value="" disabled selected>가고싶은 도시</option>
                                        {region.map((region) => (
                                            <option key={region.regionCode} value={region.regionName}>
                                                {region.regionName}
                                            </option>
                                        ))}
                                    </select>
                                    <div>
                                        {region.map((region) => (
                                        <button key={region.regionCode} onClick={() => handleRegionSelect(region)}>
                                            {region.regionName}
                                        </button>
                                        ))}
                                    </div> */}
									{/* 각 단계별 컴포넌트 자리 */}
									<div>
										{steps[currentStep]}
									</div>
                                    {/* <div class="tema-title">
                                        <legend>선호하는 숙소형태를 선택해주세요</legend>
                                    </div>
                                    <div>
                                        {accom.map((accom) => (
                                        <button key={accom.accomCode} onClick={() => handleAccomSelect(accom)}>
                                            {accom.accomName} ({accom.accomType})
                                        </button>
                                        ))}
                                    </div> */}
                                </div>
                        </div>
                    <div>
                        {/* <fieldset class="select">
                            <div class="tema-title">
                                <legend>선호하는 여행테마를 선택해주세요</legend>
                            </div> */}
                        {/* <ul class="user-tema">
                        <li>
                            <input type="checkbox" id="favorite-healing" name="tema" value="healing"/>
                            <label for="favorite-healing">힐링</label>
                        </li>
                        <li>
                            <input type="checkbox" id="favorite-culture" name="tema"value="culture"/>
                            <label for="favorite-culture">관광/문화</label>
                        </li>
                        <li>
                            <input type="checkbox" id="favorite-activity" name="tema" value="activity"/>
                            <label for="favorite-activity">활동</label>
                        </li>
                        <li>
                            <input type="checkbox" id="favorite-food" name="tema" value="food"/>
                            <label for="favorite-food">식사</label>
                        </li>
                        </ul> */}
						{/* <div>
							{qTheme.map((qTheme) => (
								<label key={qTheme.themeCode}>
									<input 
										type="checkbox" 
										value={qTheme.questionTheme}
										onChange={handleQuestionThemeSelect}
										checked={selectedQuestionTheme === qTheme.questionTheme}
									/>
									{qTheme.questionTheme}
								</label>
							))}
						</div>
						<div>
							{qTheme.map((qTheme) => {
								return (<button key={qTheme.questionTheme} onClick={handleQuestionThemeSelect2}>
									{qTheme.questionTheme}
								</button>);
							})}
						</div>
                        </fieldset> */}
                    </div>
                        {/* Qestion */}
                        <div>
                            {/* <fieldset class="select">
                                <div class="qestion-title">
                                    <legend>질문 : 새로운 모임의 단톡방이 만들어 졌을 때 나는?</legend>
                                </div>
                                <ul class="user-answer">
                                    <li>
                                    <input type="radio" id="answer-1" name="user-answer" value="1"/>
                                    <label for="answer-1">인사만 하고 별다른 톡은 남기지 않는다.</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="answer-2" name="user-answer" value="2"/>
                                        <label for="answer-2">완전 소꿉친구 바이브 나온다</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="answer-3" name="user-answer" value="3"/>
                                        <label for="answer-3">어색한 분위기를 살리려고 인사하고, 리액션이나 이모티콘을 사용해본다.</label>
                                    </li>
                                    <li>
                                        <input type="radio" id="answer-4" name="user-answer" value="4"/>
                                        <label for="answer-4">우우 유령이다 우우</label>
                                    </li>
                                </ul>
                            </fieldset> */}
                        </div>
                        {/* Schedule */}
                        <div class="button-edit">
                            <div class="create-schedule">
                                <button class="submit-button" type="submit" id="button" onclick="btnshow()">일정 생성</button>
                                <div id="loading-gif">
                                    {/* <img src="/Img/spin.gif" alt="로딩이미지"/> */}
                                </div>
                            </div>
                            <div class="reset-travel">
                                <button id="button" type="reset" onclick="reset()">초기화
                                </button>
                        </div>
                        </div>
                    </div>
                    {/* Loading */}
                    <div class="chat-answer">
                        <div id="answer">
                            <textarea
                            name="content"
                            id="chat-content"
                            placeholder="여행 일정이 완성되고 있습니다. 잠시만 기다려주세요 :)"></textarea>
                        </div>
                    </div>
                </form>
              </div>
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