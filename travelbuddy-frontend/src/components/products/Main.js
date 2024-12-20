import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { callLogoutAPI } from '../../apis/MemberAPICalls';
import LoginModal from '../common/LoginModal';

function Main() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
	const [region, setRegion] = useState([]);

  const dispatch = useDispatch(); // Redux dispatch
  const loginMember = useSelector((state) => state.memberReducer); // 저장소에서 가져온 loginMember 정보
  console.log("메인 페이지loginMember = ", loginMember);
  const isLogin = window.localStorage.getItem('accessToken');
  console.log("메인페이지 isLogin", isLogin);
  const [loginModal, setLoginModal] = useState(false);

  useEffect(() => {
    // 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
    fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/main`)
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  	// 장소 전체
	useEffect(() => {
		// 스프링에서 쏴준 URL을 리액트가 잡는곳 fetch로 잡아서 return을 화면에 message출력
		fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/schedule/region`)
			.then(response => response.json())
			.then(data => {
				const regions = data.data.regions.map(region => ({
					regionCode: region.regionCode,
					regionName: region.regionName,
					regionDescription: region.regionDescription,
					regionImg: region.regionImg,
					regionThumbnailImg: region.regionThumbnailImg,
					regionUserDetail: region.regionUserDetail
				}));
				console.log("가져왓냐?", data);
				setRegion(regions);
			})
			.catch(error => console.error('Error fetching data:', error));
	}, []);

	// 메인으로
	const onClickMain = () => {
		navigate('/');
	};

  return (
    <div className="Main">
        <body>
            {/* main */}
            <main class="wrap">
                <div class="content-wrap">
                <ul class="slides">
                    <input type="radio" name="radio-btn" id="img-1" checked />
                    <li class="slide-container">
                    <div class="slide">
                        <img src="/Img/schedulemain.PNG" alt="Busan"/>
						{/* <button type='button' id='button' onClick={() => window.location.href='http://localhost:3000/schedule'} style={{position: 'absolute', top: '80%', left: '20%', transform: 'translate(-50%, -50%)', padding: '10px 20px', zindex:20, cursor: 'pointer' }}>시작하기</button> */}
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
                            <img src="/Img/gangwon.jpg" />
                        </div>
                    <div class="nav">
                        <label for="img-2" class="prev">&#x2039;</label>
                        <label for="img-4" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-4" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/seoul.jpg" />
                        </div>
                    <div class="nav">
                        <label for="img-3" class="prev">&#x2039;</label>
                        <label for="img-5" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-5" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/incheon.jpg" />
                        </div>
                    <div class="nav">
                        <label for="img-4" class="prev">&#x2039;</label>
                        <label for="img-6" class="next">&#x203a;</label>
                    </div>
                    </li>
                    <input type="radio" name="radio-btn" id="img-6" />
                    <li class="slide-container">
                        <div class="slide">
                            <img src="/Img/jeju.jpg" />
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
                    <h2>여행의 모든 것 '트래블 버디'에 오신 것을 환영합니다</h2>
                    {/* <a href="#chat-box">여행계획부터 두근거리는 여행 사이트</a> */}
                    <h4>여행계획부터 두근거리는 여행 사이트</h4>
                </div>
					<button type='button' id='button' onClick={() => window.location.href=`http://${process.env.REACT_APP_RESTAPI_IP}/schedule`} style={{position: 'absolute', top: '80%', left: '20%', transform: 'translate(-50%, -50%)', padding: '10px 20px', zindex:20, cursor: 'pointer' }}>시작하기</button>
            </div>
			<br/>
			<hr/>
			<div class="intro">
				<div class="intro-content">
				<h2>여행의 모든 걸 한 번에!</h2>
				<h3>
					원하는 여행 타입을 입력하면<br/>
					완벽한 여행 일정을 생성해주는 서비스!
					</h3>
					<h3>
					친구와의 특별한 여행부터 혼자만의 힐링 여행까지,<br/>
					맞춤형으로 제안해줘.
					</h3>
					<h3>
					새롭고 신나는 여행이 너를 기다리고 있어!<br/>
					준비 됐어? 떠나보자!
				</h3>
				</div>
				<div class="intro-image">
					<img src="/Img/intro-image.png" alt='인트로이미지' width={'600px'} height={'300px'} />
				</div>
			</div>
			<hr/>
            <div class="popular-city-title">
                <i id="location-icon"class="fa-solid fa-location-dot"></i>
                <h3>한국 여행 인기 도시</h3>
            </div>
            <div class="popular-city-list">
                {/* <div class="city-box">
                    <img src="/Img/seoul.jpg"/>
                    <p id="city-title">seoul</p>
                    <p>서울</p>
                </div>
                <div class="city-box">
                    <img src="/Img/busan.jpg"/>
                    
                    <p id="city-title">Busan</p>
                    <p>부산</p>
                </div>
                <div class="city-box">
                    <img src="/Img/jeju.jpg"/>
                    <p id="city-title">Jeju</p>
                    <p>제주</p>
                </div> */}
				{region.map((region) => (
					<div className='city-box' key={region.regionCode}>
						<div>
							<img src={`/Img/${region.regionThumbnailImg}`} alt={region.regionName} style={{borderRadius: '15px'}}/>
						</div>
						<div>
							<br/>
							{region.regionName}
						</div>
					</div>
				))}
            </div>
            </main>
            {/* Footer */}
            <footer class="footer">
                <div>
                    <div class="icon">
                        <a href="https://github.com/HimediaSummer/TravelBuddy"><i id="icon"class="fa-brands fa-github"></i></a>
                        <i id="icon" class="fa-solid fa-blog" onClick={onClickMain} style={{cursor: 'pointer'}}></i>
                    </div>
                    Copyright 2024. Travel Buddy All rights reserved
                </div>
            </footer>
        </body>
    </div>
  );
}

export default Main;
