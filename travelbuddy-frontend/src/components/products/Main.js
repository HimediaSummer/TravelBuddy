import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import LoginModal from '../common/LoginModal';
import { NavLink } from 'react-router-dom';

function Main() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch(); // Redux dispatch
  const loginMember = useSelector((state) => state.memberReducer); // 저장소에서 가져온 loginMember 정보
  const isLogin = window.localStorage.getItem('accessToken');
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
    fetch('http://localhost:8080/main')
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  //로그인
  const handleLoginClick = () => {
    navigate('/login');
  }

  //로그아웃
  const onClickLogoutHandler = () => {
    window.localStorage.removeItem('accessToken');
    dispatch(callLogoutAPI());

    alert('로그아웃이 되어 메인화면으로 이동합니다.');
    navigate('/', { replace: true });
    window.location.reload();
    };

    
	function BeforeLogin() {
		return (
			<div>
				<NavLink to="/login">로그인</NavLink> 
			</div>
		);
	}

	function AfterLogin() {
		return (
			<div>
				<button
                    
					onClick={onClickLogoutHandler}
				>
					로그아웃
				</button>
			</div>
		);
	}

  return (
    <div className="Main">
        {/* <head>
            <meta charset="UTF-8" />
            <script src="https://kit.fontawesome.com/9e9931aed0.js" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="/CSS/media.css"/>
            <link rel="stylesheet" href="/CSS/menu.css"/>
            <link rel="stylesheet" href="/CSS/slide.css"/>
            <link rel="stylesheet" href="/CSS/style.css"/>
            <title>Travel Buddy</title>
        </head> */}

        {loginModal ? <LoginModal setLoginModal={setLoginModal} /> : null}
        <body>
            <header className="header">
                <h1>
                    <div className="header-click">
                        <i className="fa-solid fa-globe"></i>
                            <a href="http://travel-buddy.me/">Travel Buddy</a>
                    </div>
                </h1>
                    <ul className="menu">
                        <li>마이페이지</li>
                        <li>
                        {/* <li onClick={handleLoginClick}>로그인</li> */}
                        {isLogin == null || isLogin == undefined ? (
                            <BeforeLogin />
                        ) : (
                            <AfterLogin />
                        )}
                        </li>
                        <li>이용 방법</li>
                        <li>커뮤니티</li>
                        
                    </ul>
                    <button className="header_toogleBtn">
                        <i className="fas fa-bars"></i>
                    </button>
            </header>
            
            {/* main */}
            <main className="wrap">
                <div class="content-wrap">
                <ul className="slides">
                    <input type="radio" name="radio-btn" id="img-1" checked />
                    <li className="slide-container">
                    <div className="slide">
                        <img src="/Img/schedulemain.PNG" alt="Busan"/>
                    </div>
                    <div className="nav">
                    <label for="img-6" class="prev">&#x2039;</label>
                    <label for="img-2" class="next">&#x203a;</label>
                    </div>
                    </li>

                    <input type="radio" name="radio-btn" id="img-2" />
                    <li className="slide-container">
                        <div className="slide">
                            <img src="/Img/schedulemain2.PNG" />
                        </div>
                    <div className="nav">
                        <label for="img-1" class="prev">&#x2039;</label>
                        <label for="img-3" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-3" />
                    <li className="slide-container">
                        <div className="slide">
                            <img src="/Img/gangwon.PNG" />
                        </div>
                    <div className="nav">
                        <label for="img-2" class="prev">&#x2039;</label>
                        <label for="img-4" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-4" />
                    <li className="slide-container">
                        <div className="slide">
                            <img src="/Img/seoul.PNG" />
                        </div>
                    <div className="nav">
                        <label for="img-3" class="prev">&#x2039;</label>
                        <label for="img-5" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-5" />
                    <li className="slide-container">
                        <div class="slide">
                            <img src="/Img/incheon.PNG" />
                        </div>
                    <div className="nav">
                        <label for="img-4" class="prev">&#x2039;</label>
                        <label for="img-6" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-6" />
                    <li className="slide-container">
                        <div class="slide">
                            <img src="/Img/jeju.PNG" />
                        </div>
                    <div className="nav">
                        <label for="img-5" class="prev">&#x2039;</label>
                        <label for="img-1" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <li className="nav-dots">
                        <label for="img-1" class="nav-dot" id="img-dot-1"></label>
                        <label for="img-2" class="nav-dot" id="img-dot-2"></label>
                        <label for="img-3" class="nav-dot" id="img-dot-3"></label>
                        <label for="img-4" class="nav-dot" id="img-dot-4"></label>
                        <label for="img-5" class="nav-dot" id="img-dot-5"></label>
                        <label for="img-6" class="nav-dot" id="img-dot-6"></label>
                    </li>
                </ul>
                <div className="subtitle">
                    <h2>여행의 모든 것 "트래블 버디"에 오신 것을 환영합니다</h2>
                    <a href="#chat-box">여행계획부터 두근거리는 여행 사이트</a>
                </div>
            </div>
                
            <div className="popular-city-title">
                <i id="location-icon"className="fa-solid fa-location-dot"></i>
                <h3>한국 여행 인기 도시</h3>
            </div>
            <div className="popular-city-list">
                <div className="city-box">
                    <img src="/Img/seoul.PNG"/>
                    <p id="city-title">seoul</p>
                    <p>서울</p>
                </div>
                <div className="city-box">
                    <img src="/Img/busan.PNG"/>
                    
                    <p id="city-title">Busan</p>
                    <p>부산</p>
                </div>
                <div className="city-box">
                    <img src="/Img/jeju.PNG"/>
                    <p id="city-title">Jeju</p>
                    <p>제주</p>
                </div>
            </div>
            </main>
            {/* Footer */}
            <footer className="footer">
                <div>
                    <div className="icon">
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

export default Main;
