import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{callMyProfileAPI} from '../../../apis/MypageAPICalls.js';
import './MyProfile.css';

function MyProfile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.myProfileReducer.profile);

    useEffect(() => {
        dispatch(callMyProfileAPI()); // Redux 디스패치
    }, [dispatch]);

    return (
                <div className="profile-container">
                    {profile.length > 0 ? (
                        <ul>
                            {profile.map((member, index) => (
                                <li key={index}>
                                    {/* 이미지 추가 */}
                                    {member.memberImg ? (
                                        <img 
                                            src={member.memberImg} 
                                            alt={`${member.memberName}의 프로필 이미지`} 
                                            style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
                                        />
                                    ) : (
                                        <p>No Image</p>
                                    )}
                                     <div className="profile-info">
                                        <p>아이디 : {member.memberName}</p>
                                        <p>이름 : {member.memberFullName}</p> 
                                        <p>생년월일 : {member.memberBirthday}</p>  
                                        <p>이메일 : {member.memberEmail}</p>
                                        <p>전화번호 : {member.memberPhone}</p>
                                        <p>가입날짜 : {member.memberCreate}</p>
                                        <p>좋아요 : {member.memberLike}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <div className="button-container">
                        <button onClick={() => navigate('/mypage/updatemyprofile')}>
                            수정하기
                        </button>
                        <button onClick={() => navigate('/mypage/deletion')}>
                            탈퇴
                        </button>
                    </div>
                </div>
            );
        }
export default MyProfile;