import  LoginCSS  from "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navigate } from "react-router-dom";


function Success() {
        
    const navigate = useNavigate();


    /* 로그인 버튼 클릭시 디스패처 실행 및 메인 페이지로 이동 */
    const onClickLoginHandler = () => { 
        navigate("/login", { replace: true });
    }

    return (
        <div className="backgroundDiv">
            <div className= "loginDiv">
                <h1>
                    <div className="check">
                        {/* <i class="fa-solid fa-globe"></i> */}
                        <img src="/Img/check-icon.png" alt="Check logo" style={{marginLeft: '20px'}}/>
                    </div>
                </h1>
				<div>
                <button
                        onClick={ onClickLoginHandler }
                    >
                        로그인
				</button>
				</div>
            </div>
        </div>
    );
}

export default Success;