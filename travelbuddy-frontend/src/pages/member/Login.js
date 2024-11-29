import  LoginCSS  from "./Login.css";
// import backgroundImage from ("../../../public/Img/schedulemain.PNG");
import { Link, useNavigate } from 'react-router-dom';
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

    const onClickFindIdHandler = () => {
        navigate("/findid", { replace: true });
    }

    const onClickFindPwHandler = () => {
        navigate("/findpw", { replace: true })
    }

    // const googleLogin = () => {
    //     window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?
	// 	client_id=${ process.env.REACT_APP_GOOGLE_CLIENT_ID }
	// 	&redirect_uri=${ process.env.REACT_APP_GOOGLE_REDIRECT_URL }
	// 	&response_type=token
	// 	&scope=email profile`;
    // };


    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => { 
        dispatch(callLoginAPI({	// 로그인
            form: form
        }));
    }

    return (
        <div className="backgroundDiv">
            <div className= "loginDiv">
                <h1>
                    <div class="header-click">
                        {/* <i class="fa-solid fa-globe"></i> */}
                        <a href="http://localhost:3000"><img src="/Img/TravelBuddy(256).png" alt="Main logo" style={{marginLeft: '20px'}}/></a>
                    </div>
                </h1>
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
                <div className="footer">
                   
                    {/* <button
                        onClick={ onClickRegisterHandler }
                    >
                        회원가입
                    </button> */}
                    <a
                        onClick={ onClickRegisterHandler }
                    >
                        회원가입
                    </a>
                    |
                    {/* <button
                        onClick={ onClickFindIdHandler }
                    >
                        아이디 찾기
                    </button> */}
                    <a
                        onClick={ onClickFindIdHandler }
                    >
                        아이디 찾기
                    </a>
                    |
                    {/* <button
                        onClick={ onClickFindPwHandler }
                    >
                        비밀번호 찾기
                    </button> */}
                    <a
                        onClick={ onClickFindPwHandler }
                    >
                        비밀번호 찾기
                    </a>
                </div>
                {/* <button
                    onClick={ googleLogin }
                >
                    구글 로그인
                </button> */}
            </div>
        </div>
    );
}

export default Login;