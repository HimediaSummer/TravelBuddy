import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
    fetch('http://localhost:8080/schedule')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      {message}
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

                    <div class="chat-container">
                        <form class="chat-form" action="post">
                            <div class="user_input">
                                <h2 class="chat-head">여행 일정을 입력해주세요</h2>
                                <div class="location">
                                    <div class="depart-airport">
                                    <select id="start-point">
                                        <option value="" disabled selected>가고싶은도시</option>
                                        <option name="start-point" value="서울">서울</option>
                                        <option name="start-point" value="인천">인천</option>
                                        <option name="start-point" value="부산">부산</option>
                                        <option name="start-point" value="광주">광주</option>
                                        <option name="start-point "value="울산">울산</option>
                                        <option name="start-point "value="제주">제주</option>
                                    </select>
                                </div>
                        </div>
                        {/* 출발일, 도착일 */}
                        <div class="travel-date">
                            <div class="depart">
                                <input id="depart-schedule" type="date" name="depart"/>
                            </div>
                            <div class="arrive">
                                <input id="arrive-schedule" type="date" name="arrive"/>
                            </div>
                        </div>
                    <div>
                        <fieldset class="select">
                            <div class="tema-title">
                                <legend>선호하는 여행테마를 선택해주세요</legend>
                            </div>
                        <ul class="user-tema">
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
                        </ul>
                        </fieldset>
                    </div>
                        {/* Qestion */}
                        <div>
                            <fieldset class="select">
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
                            </fieldset>
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

export default App;
