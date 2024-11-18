// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { getBuddyList } from "../../modules/MypageBuddyModule.js"
// import {
//     callMypageBuddyAPI
// } from '../../apis/MypageBuddyAPICalls.js'
// import MypageBuddy from '../../pages/member/mypage/MypageBuddyPage.js';

// function MypageBuddyList() {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const buddyList = useSelector((state) => {
//         console.log('Redux State:', state); // 전체 Redux 상태 확인
//         return state.mypageBuddyReducer?.buddyList || [];
//     });

//     useEffect(
//         () => {
//             fetch('/mypage/mybuddylist')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })   
//             .then((data) => {
//                 console.log('Fetched Data:', data);
//             dispatch(getBuddyList(data));
//             console.log('Dispatched GET_BUDDYLIST:', data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching buddy list:', error);
//             });
//     }, [dispatch]);

//     if (buddyList.length === 0) {
//         return <p>No data available</p>;
//     }

//     console.log('buddyList:', buddyList);

//     return (
//         <div>
//             {buddyList.map((buddy) => (
//                 <div key={buddy.buddyCode}>
//                     <h5>{buddy.buddyTitle}</h5>
//                 </div>
//             ))}
//         </div>
//     );
// }

// export default MypageBuddyList;

