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
            setMessage(`찾은 아이디: ${foundId}`); // 아이디 찾기 성공 메시지
        } catch (error) {
            setMessage(error.message); // 에러 메시지
        }

		// const foundId = await dispatch(callFindIdAPI({ memberEmail })); // API 호출
        //     setMessage(`찾은 아이디: ${foundId}`); // 아이디 찾기 성공 메시지
    };

    return (
        <div className="backgroundDiv">
            <div className="findIdDiv">
                <h1>
                    <div class="header-click">
                        {/* <i class="fa-solid fa-globe"></i> */}
                        <a href="http://localhost:3000"><img src="/Img/TravelBuddy(256).png" alt="Main logo" style={{marginLeft: '20px'}}/></a>
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
                    {message && <p>{message}</p>}
                    <button onClick={onClickFindIdHandler}>아이디 찾기</button>
                </div>
            </div>
        </div>
    );
}

export default FindId;