import React, { useEffect, useState } from 'react';

<<<<<<< HEAD
function App() {
=======
function Main() {
>>>>>>> main
  const [message, setMessage] = useState('');

  useEffect(() => {
    // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
<<<<<<< HEAD
    fetch('http://localhost:8080/schedule/hello')
=======
    fetch('http://localhost:8080/main')
>>>>>>> main
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
<<<<<<< HEAD
    <div className="App">
      <h1>{message}</h1>
=======
    <div className="Main">
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
                <div class="content-wrap">
                <ul class="slides">
                    <input type="radio" name="radio-btn" id="img-1" checked />
                    <li class="slide-container">
                    <div class="slide">
                        <img src="/Img/schedulemain.PNG" alt="Busan"/>
                    </div>
                    <div class="nav">
                    <label for="img-6" class="prev">&#x2039;</label>
                    <label for="img-2" class="next">&#x203a;</label>
                    </div>
                    </li>

                    <input type="radio" name="radio-btn" id="img-2" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/schedulemain2.PNG" />
                        </div>
                    <div class="nav">
                        <label for="img-1" class="prev">&#x2039;</label>
                        <label for="img-3" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-3" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/gangwon.PNG" />
                        </div>
                    <div class="nav">
                        <label for="img-2" class="prev">&#x2039;</label>
                        <label for="img-4" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-4" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/seoul.PNG" />
                        </div>
                    <div class="nav">
                        <label for="img-3" class="prev">&#x2039;</label>
                        <label for="img-5" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-5" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/incheon.PNG" />
                        </div>
                    <div class="nav">
                        <label for="img-4" class="prev">&#x2039;</label>
                        <label for="img-6" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-6" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/jeju.PNG" />
                        </div>
                    <div class="nav">
                        <label for="img-5" class="prev">&#x2039;</label>
                        <label for="img-1" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <li class="nav-dots">
                        <label for="img-1" class="nav-dot" id="img-dot-1"></label>
                        <label for="img-2" class="nav-dot" id="img-dot-2"></label>
                        <label for="img-3" class="nav-dot" id="img-dot-3"></label>
                        <label for="img-4" class="nav-dot" id="img-dot-4"></label>
                        <label for="img-5" class="nav-dot" id="img-dot-5"></label>
                        <label for="img-6" class="nav-dot" id="img-dot-6"></label>
                    </li>
                </ul>
                <div class="subtitle">
                    <h2>여행의 모든 것 "트래블 버디"에 오신 것을 환영합니다</h2>
                    <a href="#chat-box">여행계획부터 두근거리는 여행 사이트</a>
                </div>
            </div>
                
            <div class="popular-city-title">
                <i id="location-icon"class="fa-solid fa-location-dot"></i>
                <h3>한국 여행 인기 도시</h3>
            </div>
            <div class="popular-city-list">
                <div class="city-box">
                    <img src="/Img/seoul.PNG"/>
                    <p id="city-title">seoul</p>
                    <p>서울</p>
                </div>
                <div class="city-box">
                    <img src="/Img/busan.PNG"/>
                    
                    <p id="city-title">Busan</p>
                    <p>부산</p>
                </div>
                <div class="city-box">
                    <img src="/Img/jeju.PNG"/>
                    <p id="city-title">Jeju</p>
                    <p>제주</p>
                </div>
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
>>>>>>> main
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default Main;
>>>>>>> main
