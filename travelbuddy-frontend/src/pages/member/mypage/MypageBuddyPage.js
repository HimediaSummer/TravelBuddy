
// import { useNavigate } from "react-router-dom";

// function MypageBuddy({
//     mypageBuddyList: { buddyCode, memberCode, regionCode, buddyTypeCode, buddyTitle, buddyCreate, buddyStatus, buddyAt }

// }) {
//     const navigate = useNavigate();

//     const onClickHandler = (buddyCode) => {
//         navigate(`/mypage/mybuddylist/${buddyCode}`, {replace:false});
//     };

//     return (
//         <div>
//             <h3>마이페이지내가쓴버디글목록조회</h3>
//             <div onClick={() => onClickHandler(buddyCode)}>
//             <h5>{regionCode}</h5>
//             <h5>{buddyTypeCode}</h5>
//             <h5>{buddyTitle}</h5>
//             <h5>{buddyCreate}</h5>
//             <h5>{buddyStatus}</h5>
//             <h5>{buddyAt}</h5>
//             </div>
//         </div>
//     );
// }
// export default MypageBuddy;