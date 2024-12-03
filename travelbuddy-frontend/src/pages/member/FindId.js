import  FindIdCSS  from "./FindId.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callFindIdAPI } from '../../apis/MemberAPICalls';

function FindId() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [buttonLabel, setButtonLabel] = useState('아이디 찾기'); // 버튼 라벨 상태 관리

	const isValidEmail = (Email) => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(Email);
	};

	const onChangeHandler = (e) => {
        setEmail(e.target.value);  // 이메일 값을 직접 업데이트
    };

    const onClickFindIdHandler = async () => {
		if (!Email) {
            alert('입력하지 않은 빈칸이 있습니다.');
            return;
        }

		if (!isValidEmail(Email)) {
            alert('유효한 이메일 주소를 입력해주세요. 예: user03@naver.com');
            return;
        }

        try {
            const foundId = await dispatch(callFindIdAPI({ Email })); // API 호출
            setMessage(`해당 이메일의 아이디는 ${foundId} 입니다`); // 아이디 찾기 성공 메시지
            setButtonLabel('돌아가기'); // 버튼 라벨 변경
            // alert(`찾은 아이디: ${foundId}`)
            // navigate("/login", { replace: true })
        } catch (error) {
            setMessage(error.message); // 에러 메시지
        }

		// const foundId = await dispatch(callFindIdAPI({ memberEmail })); // API 호출
        //     setMessage(`찾은 아이디: ${foundId}`); // 아이디 찾기 성공 메시지
    };

    const onClickBackHandler = () => {
        navigate('/login',{ replace: true }); // 메인 페이지로 이동
    };

	// 메인으로
	const onClickMain = () => {
		navigate('/');
	};

    return (
        <div className="backgroundDiv">
            <div className="findIdDiv">
                <h1>
                    <div class="header-click">
                        {/* <i class="fa-solid fa-globe"></i> */}
                        {/* <a href="http://travel-buddy5.site:3000"> */}
						<img src="/Img/TravelBuddy(256).png" alt="Main logo" style={{marginLeft: '20px', cursor: 'pointer'}} onClick={onClickMain}/>
                    </div>
                </h1>
                <h2>아이디 찾기</h2>
                
                <div >
                    <input
                        type="email"
                        placeholder="이메일"
                        value={Email}
                        onChange={onChangeHandler}
                    />
                </div>
                    {message && <p>{message}</p>}
                <div>
                <button
                        onClick={buttonLabel === '아이디 찾기' ? onClickFindIdHandler : onClickBackHandler}
                    >
                        {buttonLabel}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default FindId;