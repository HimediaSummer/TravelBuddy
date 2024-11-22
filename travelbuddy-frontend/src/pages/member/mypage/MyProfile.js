import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getProfile } from "../../../modules/mypage/MyProfileModule.js"

function MyProfile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState([]);
    useEffect(
        () => {
            fetch('/mypage/myprofile')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                if (Array.isArray(data)) {
                    setProfile(data);
                console.log('setProfile 제에에에발떠라ㅏ', data);
            } else if (data.data && Array.isArray(data.data)) {
                setProfile(data.data);
            } else {
                console.error('Unexpected data structure:', data);
            }
        })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    useEffect(() => {
        console.log('profile 상태 업데이트:', profile);
    }, [profile]);

    return (
        <div>
            {profile.length > 0 ? (
            <ul>
                 {profile.map((member, index) => (
                <li key={index}>
                    <p>아이디 : {member.memberName}</p>
                    <p>이름 : {member.memberFullName}</p> 
                    <p>생년월일 : {member.memberBirthday}</p>  
                    <p>이메일 : {member.memberEmail}</p>
                    <p>전화번호 : {member.memberPhone}</p>
                    <p>가입날짜 : {member.memberCreate}</p>
                    <p>프로필사진 : {member.memberImg || 'No Image'}</p>
                    <p>좋아요 : {member.memberLike}</p>
                </li>
                 ))}
            </ul>
            ) : (<p>Loading...</p>)}
            
            <button onClick={() => navigate('/mypage/updatemyprofile')}>
                수정하기
            </button>
            <button onClick={() => navigate('/mypage/deletion')}>
                탈퇴
            </button>
        </div>
    );
}

export default MyProfile;

