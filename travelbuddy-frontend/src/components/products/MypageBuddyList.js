import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getBuddyList } from "../../modules/MypageBuddyModule.js"
import {
    callMypageBuddyAPI
} from '../../apis/MypageBuddyAPICalls.js'
import MypageBuddy from '../../pages/member/mypage/MypageBuddyPage.js';

function MypageBuddyList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buddyList = useSelector((state) => state.mypageBuddyReducer?.buddyList || []); 

    useEffect(
        () => {
            fetch('/mypage/mybuddylist')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })   
            .then((data) => {
            dispatch(getBuddyList(data));
            })
            .catch((error) => {
            console.error('Error fetching buddy list:', error);
            });
    }, [dispatch]);

    if (buddyList.length === 0) {
        return <p>No data available</p>;
    }

    console.log('buddyList:', buddyList);

    return (
        <div>
            {buddyList.map((buddy) => (
                <div key={buddy.buddyCode}>
                    <h5>{buddy.buddyName}</h5>
                </div>
            ))}
        </div>
    );
}

export default MypageBuddyList;

