import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{callMyProfileAPI} from '../../../apis/MypageAPICalls.js';
import './MyProfile.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function MyProfile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.myProfileReducer.profile);

    useEffect(() => {
        dispatch(callMyProfileAPI()); // Redux 디스패치
    }, [dispatch]);

    return (
            <div className="my-profile-page">
                <h3 className="buddy-title">내 정보</h3>
                <div className="line">
                        <div className="profile-container">
                        {profile.length > 0 ? (
                            <div className="profile-table">
                                {profile.map((member, index) => (
                                    <div key={index} className="profile-row">
                                        {/* 왼쪽 열 */}
                                        <div className="profile-left">
                                            {member.memberImg ? (
                                                <img 
                                                    src={member.memberImg} 
                                                    alt={`${member.memberName}의 프로필 이미지`} 
                                                    className='profile-img' 
                                                />
                                            ) : (
                                                <p>No Image</p>
                                            )}
                                            <div className="like-count">
                                            <FontAwesomeIcon icon={faHeart} style={{ color: '#fffff', marginRight: '5px' }} />
                                                {member.memberLike}
                                            </div>
                                        </div>
                                            {/* 오른쪽열 */}
                                            <div className="profile-right">
                                                <div className="profile-info">
                                                    <div className="info-row">
                                                        <p className="info-label">아이디</p>
                                                        <p className="info-value">{member.memberName}</p>
                                                    </div>
                                                    <div className="info-row">
                                                        <p className="info-label">이름</p>
                                                        <p className="info-value">{member.memberFullName}</p>
                                                    </div>
                                                    <div className="info-row">
                                                        <p className="info-label">생년월일</p>
                                                        <p className="info-value">{member.memberBirthday}</p>
                                                    </div>
                                                    <div className="info-row">
                                                        <p className="info-label">이메일</p>
                                                        <p className="info-value">{member.memberEmail}</p>
                                                    </div>
                                                    <div className="info-row">
                                                        <p className="info-label">전화번호</p>
                                                        <p className="info-value">{member.memberPhone}</p>
                                                    </div>
                                                    <div className="info-row">
                                                        <p className="info-label">가입날짜</p>
                                                        <p className="info-value">{member.memberCreate.slice(0, 10)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                
                        <div className="button-container">
                            <button onClick={() => navigate('/mypage/updatemyprofile')}>
                                수정하기
                            </button>
                            <button onClick={() => navigate('/mypage/deletion')}>
                                탈퇴
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
export default MyProfile;