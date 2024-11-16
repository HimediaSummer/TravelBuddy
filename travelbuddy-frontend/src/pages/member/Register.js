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
        memberName: '',
        memberEmail: ''
    });
    useEffect(() => {
        if(member.status == 201){
            console.log("[Login] Register SUCCESS {}", member);
            navigate("/login", { replace: true })
        }
    },
    [member]);

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };    

    const onClickBackHandler = () => {

        /* 돌아가기 클릭시 메인 페이지로 이동 */
        navigate("/", { replace: true })
    }
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
    }

    return (
        <div >
            <div >
                <h1>회원가입</h1>
                <input 
                    type="text" 
                    name="memberName"
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="password"
                    name="memberPassword" 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="email" 
                    name="memberEmail"
                    placeholder="이메일" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="text" 
                    name="memberFullName"
                    placeholder="이름" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="date" 
                    name="memberBirthday"
                    placeholder="생일" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                    required
                />
                <input 
                    type="tel" 
                    name="memberPhone"
                    placeholder="ex)01012345678" 
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
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick = { onClickBackHandler }
                >
                    돌아가기
                </button>
            </div>
        </div>
    );
}

export default Register;