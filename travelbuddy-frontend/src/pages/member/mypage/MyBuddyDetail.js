// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from 'react-redux';

// function MyBuddyDetail() {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [buddyDetail, setBuddyDetail] = useState("");
//     const [buddyMatch, setBuddyMatch] = useState("");
//     useEffect(
//         () => {
//             fetch('/mypage/mybuddylist/{buddyCode}')
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })   
//             .then((data) => {
//                 console.log('Fetched Data:', data);
//                 setBuddyDetail(data.data); 
//                 console.log('setBuddy 발동', data);
//                 console.log('buddy 잘 뜨나',setBuddyDetail);
//             })
//             .catch((error) => {
//                 console.error('Error fetching buddy:', error);
//             });
//     }, [dispatch]);

//     if (buddyMatch.length === 0) {
//         return <p>신청자 대기 중</p>;
//     }

//     return (
//         <div>
//             <ul>
//                 <li key={buddy}>
//                     <h3>{buddy.buddyTitle}</h3>  {/* buddyTitle 출력 */}
//                     <p>{buddy.buddyContents}</p> {/* buddyContents 출력 */}
//                     <p>{buddy.buddyCreate}</p>  {/* buddyCount 출력 */}
//                 </li>

//                 <li key={buddyMatch}>
//                     <h3>{buddyMatch.matchCode}</h3> 
//                     <p>{buddyMatch.applyId}</p> 
//                     <p>{buddyMatch.buddyApply}</p> 
//                 </li>
//             </ul>
//         </div>
//     );
// }

// export default MyBuddyDetail;

