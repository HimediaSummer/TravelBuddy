import  FindPwCSS  from "./FindPw.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { callFindPwAPI, callResetPwAPI } from '../../apis/MemberAPICalls';


function FindPw() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [Email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const onChangeHandler = (e) => {
        setEmail(e.target.value);  // 이메일 값을 직접 업데이트
    };

	const isValidEmail = (email) => {
		const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
		return emailPattern.test(email);
	};

	const isValidPassword = (newPassword) => {
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*].{6,}$/;
        return passwordPattern.test(newPassword);
    };

    const onClickFindPwHandler = async () => {

		if (!Email) {
            alert('이메일을 입력해주세요.');
            return;
        }

		if (!isValidEmail(Email)) {
            alert('유효한 이메일 주소를 입력해주세요. 예: user03@naver.com');
            return;
        }

		

        try {
            const verificationCode = await dispatch(callFindPwAPI({ Email })); 
            setMessage(`인증번호 코드 ${verificationCode}`);
            setIsCodeSent(true);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const onResetPasswordHandler = async () => {
        if(!newPassword) {
            setMessage("새로운 비밀번호를 입력해주세요.");
            return;
        }

		if (!isValidPassword(newPassword)) {
            alert('비밀번호는 특수문자와 숫자를 조합한 최소 6자리 이상이어야 합니다.');
            return;
        }

        try {
            await dispatch(callResetPwAPI({ Email, verificationCode, newPassword })); 
            alert("비밀번호 변경이 완료되었습니다.");
            navigate('/login');
        } catch (error) {
            setMessage(error.message);
        }
    };

		// 메인으로
		const onClickMain = () => {
			navigate('/');
		};


    return (
        <div className="findPwBackgroundDiv">
            <div className="findPwDiv">
                <h1>
                    <div class="header-click">
                        {/* <i class="fa-solid fa-globe"></i> */}
                        {/* <a href="http://travel-buddy5.site:3000"> */}
						<img src="/Img/TravelBuddy(256).png" alt="Main logo" style={{marginLeft: '20px', cursor: 'pointer'}} onClick={onClickMain}/>
                    </div>
                </h1>
                <h2>비밀번호 찾기</h2>
                <div >
                    <input
                        type="email"
                        placeholder="이메일"
                        value={Email}
                        onChange={onChangeHandler}
                    />
                </div>
                <div >
                    <button onClick={onClickFindPwHandler}>비밀번호 찾기</button>
                </div>
                {isCodeSent && (
                    <div className="varifyCode">
                        <input
                            type="text"
                            placeholder="인증 코드 입력"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                        />
                    </div>
                )}
                <div>
                    {message && <p>{message}</p>}
                </div>
                {isCodeSent && (
                    <div>
                        <div className="newPw">
                            <input
                                type="password"
                                placeholder="새로운 비밀번호 입력"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <button onClick={onResetPasswordHandler}>비밀번호 변경</button>
                        </div>
                    </div>
                )}
                {/* <div>
                    {message && <p>{message}</p>}
                </div> */}
            </div>
        </div>
    );
}

export default FindPw;