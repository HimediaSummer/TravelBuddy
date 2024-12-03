import  RegistCSS  from "./Register.css";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";

import {
    callRegisterAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function Register() {

    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const member = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    const [form, setForm] = useState({
        memberName: '',
        memberPassword: '',
        memberFullName: '',
        memberEmail: ''
    });
    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            // navigate("/login", { replace: true })
        }
    },
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    // const onClickBackHandler = () => {

    //     /* 돌아가기 클릭시 메인 페이지로 이동 */
    //     navigate("/", { replace: true })
    // }
    //  이메일 가입 양식
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };

    const isValidPhone = (phone) => {
        const phonePattern = /^[0]{1}[1]{1}[0]{1}[0-9]{4}[0-9]{4}$/;
        return phonePattern.test(phone);
    }

    const isValidPassword = (password) => {
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-z0-9!@#$%^&*].{6,}$/;
        return passwordPattern.test(password);
    };

    const onClickRegisterHandler = () => {
        if (!form.memberName || !form.memberPassword || !form.memberEmail || !form.memberFullName || !form.memberPhone) {
            alert('모든 칸을 입력해주세요.');
            return;
        }

        if (!isValidEmail(form.memberEmail)) {
            alert('유효한 이메일 주소를 입력해주세요. 예: user03@naver.com');
            return;
        }

        if (!isValidPhone(form.memberPhone)) {
            alert('전화번호는 01012345678 형식으로 입력해야 합니다.');
            return;
        }

        if (!isValidPassword(form.memberPassword)) {
            alert('비밀번호는 특수문자와 숫자를 조합한 최소 6자리 이상이어야 합니다.');
            return;
        }

        dispatch(callRegisterAPI({
            form: form
        }));
        navigate("/success", { replace: true })
    }

				// 메인으로
				const onClickMain = () => {
					navigate('/');
				};
		
	

    return (
        <div className='backgroundDiv'>
            <div className='registDiv'>
                <h1>
                    <div class="header-click">
                        {/* <i class="fa-solid fa-globe"></i> */}
                        {/* <a href="http://travel-buddy5.site:3000"> */}
						<img src="/Img/TravelBuddy(256).png" alt="Main logo" style={{marginLeft: '20px', cursor: 'pointer'}} onClick={onClickMain}/>
                    </div>
                </h1>
                <h2>회원가입</h2>
                <p>
                    회원가입을 위한 정보를 입력해주세요.
                    <br></br>
                    *는 필수 입력사항입니다.
                </p>
                <input 
                    type="text" 
                    name="memberName"
                    placeholder="아이디*" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="password"
                    name="memberPassword" 
                    placeholder="패스워드*" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <div className="pwText">* 최소 6자의 영문/숫자/특수문자를 사용해 주세요.</div>
                <input 
                    type="email" 
                    name="memberEmail"
                    placeholder="이메일*" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="text" 
                    name="memberFullName"
                    placeholder="이름*" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="date" 
                    name="memberBirthday"
                    placeholder="생일*" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="tel" 
                    name="memberPhone"
                    placeholder="ex)01012345678(*)" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    pattern='[0-1]{3}[0-9]{4}[0-9]{4}'
                    minLength={11}
                    maxLength={11}
                    required
                />
                <button
                    onClick = { onClickRegisterHandler }
                >   
                    회원가입
                </button>
                {/* <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button> */}
            </div>
        </div>
    );
}

export default Register;