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
    // const buddyList = useSelector((state) => {
    //     console.log('Redux State:', state); // 전체 Redux 상태 확인
    //     return state.mypageBuddyReducer?.buddyList || [];
    // });
    const [buddyList, setBuddyList] = useState(""); // 상태 정의

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
                console.log('Fetched Data:', data);
                setBuddyList(data.data); // 상태 업데이트
                console.log('setBuddyList 발동', data);
                console.log('buddyList 잘 뜨나',buddyList);
                // dispatch(getBuddyList(data));
                // console.log('Dispatched GET_BUDDYLIST:', data);
            })
            .catch((error) => {
                console.error('Error fetching buddy list:', error);
            });
    }, [dispatch]);

    if (buddyList.length === 0) {
        return <p>No data available</p>;
    }

    // console.log('buddyList:', buddyList);

    return (
        <div>
            <ul>
                {buddyList.map((buddy, index) => (
                    <li key={index}>
                        <h3>{buddy.buddyTitle}</h3>  {/* buddyTitle 출력 */}
                        <p>{buddy.buddyContents}</p> {/* buddyContents 출력 */}
                        <p><strong>참여자 수:</strong> {buddy.buddyCount}</p>  {/* buddyCount 출력 */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MypageBuddyList;

