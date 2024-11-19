import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";
import { POST_SIGNUP } from '../../modules/MemberModule';
import {
    callLoginAPI
} from '../../apis/MemberAPICalls'
import { POST_LOGIN } from '../../modules/MemberModule';

function Login() {
        
    const navigate = useNavigate();

    /* 리덕스를 이용하기 위한 디스패처, 셀렉터 선언 */
    const dispatch = useDispatch();
    const loginMember = useSelector(state => state.memberReducer);  // API 요청하여 가져온 loginMember 정보
    
    /* 폼 데이터 한번에 변경 및 State에 저장 */   
    const [form, setForm] = useState({
        memberName: '',
        memberPassword: ''
    });

    useEffect(() => {
        if (loginMember.status === 200) {
            console.log("[Login] Login SUCCESS", loginMember);
            navigate("/", { replace: true });
        }

        if (loginMember.status === 201) {
            dispatch({ type: POST_SIGNUP, payload: loginMember });
        }  
    }, [loginMember, navigate, dispatch]);
    
    if (loginMember.status === 200) {
        console.log("[Login] Login is already authenticated by the server");        
        return <Navigate to="/" />;
    }

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onClickRegisterHandler = () => { 
        navigate("/signup", { replace: true });
    }

    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    return (
        <div >
            <div >
                <h1>로그인</h1>
                <input 
                    type="text" 
                    name='memberName'
                    placeholder="아이디" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <input 
                    type="password"
                    name='memberPassword' 
                    placeholder="패스워드" 
                    autoComplete='off'
                    onChange={ onChangeHandler }
                />
                <button
                    onClick={ onClickLoginHandler }
                >
                    로그인
                </button>
                <button
                    style={ { border: 'none', margin: 0, fontSize: '10px', height: '10px' } }
                    onClick={ onClickRegisterHandler }
                >
                    회원가입
                </button>
            </div>
        </div>
    );
}

export default Login;