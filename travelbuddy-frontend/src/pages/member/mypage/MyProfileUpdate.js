import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBuddy } from "../../../modules/mypage/MyBuddyModule.js"

function MypageProfile() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState("");
    useEffect(
        () => {
            fetch('/mypage')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
                console.log('Fetched Data:', data);
                setProfile(data.data); 
                console.log('setProfile 제에에에발떠라ㅏ', data);
                console.log('profile 떠주세요떠주세요떠주세요',profile);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, [dispatch]);

    return (
        <div>
            <ul>
                <li key={profile}>
                    <p>{profile.memberName}</p>
                    <p>{profile.memberFullName}</p> 
                    <p>{profile.memberBirthday}</p>  
                    <p>{profile.memberEmail}</p>
                    <p>{profile.memberPhone}</p>
                    <p>{profile.memberCreate}</p>
                    <p>{profile.memberLike}</p>
                    <p>{profile.memberImg}</p>
                </li>
            </ul>
        </div>
    );
}

export default MypageBuddy;

