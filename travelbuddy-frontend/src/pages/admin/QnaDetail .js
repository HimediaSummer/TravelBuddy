import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callQnaDetailForAdminAPI
} from '../../apis/QnaAPICalls';
import {
    insertQnaAnswerAPI} from '../../apis/QnaAPICalls';
import {
    updateQnaAnswerAPI} from '../../apis/QnaAPICalls';
import {
    deleteQnaAnswerAPI} from '../../apis/QnaAPICalls';

function QnaDetail () {

    // const [qnaContents, setQnaContents] = useState('');
    const dispatch = useDispatch();
    const params = useParams();
    const qnaData = useSelector((state) => state.qnaReducer);
    const {data: member} = memberData;
 
    useEffect (
        () => {
            dispatch(callQnaDetailForAdminAPI(params))
        } , []
    );

    useEffect (
        () => {
            if (qna) {
                setQnaContents();
            }
        }, [qna]
    );

    // 필요없을지도 ===========================================================

    // const onClickChangeHandlerSus = () => {
    //     const newSuspensionStatus = memberSuspension === 'N' ? 'Y' : 'N';
    //     dispatch(toggleMemberSuspensionAPI(params,newSuspensionStatus))
    //     .then(
    //     () => {
    //         setIsMemberSuspension(newSuspensionStatus);
    //         if (memberSuspension !== 'Y') {
    //             alert("계정을 정지상태로 변경합니다.");
    //         } else {
    //             alert("정지 상태를 해제합니다.");
    //         }
    //     })
    //     .catch(error => {
    //         console.error('정지 버튼이 정상작동하지 않습니다.:', error);
    //     }); 
    // };

    // const onClickChangeHandlerDel = () => {
    //     const newDeletionStatus = memberDeletion === 'N' ? 'Y' : 'N';
    //     dispatch(toggleMemberDeletionAPI(params,newDeletionStatus))
    //     .then(
    //     () => {
    //         setIsMemberDeletion(newDeletionStatus);
    //         if (memberDeletion !== 'N') {
    //             alert("계정을 삭제상태로 변경합니다.");
    //         } else {
    //             alert("삭제 상태를 해제합니다.");
    //         }
    //     })
    //     .catch(error => {
    //         console.error('삭제 버튼이 정상작동하지 않습니다.:', error);
    //     }); 
    // };

    // 필요없을지도 ===========================================================

    return (
        <div>
        <table>
            <thead>
                <th>문의(Q&A)</th>
                {/* <th><input type={{select}}></input></th> */}
            </thead>
            <tbody>
                <tr>
                <td rowSpan="7" >썸네일</td>
                <td >아이디</td>
                <td>{member.memberName}</td>
                </tr>
                <tr>
                <td>이름</td>
                <td>{member.memberFullName}</td>
                </tr>
                <tr>
                <td>생년월일</td>
                <td>{member.memberBirthday}</td>
                </tr>
                <tr>
                <td>연락처</td>
                <td>{member.memberPhone}</td>
                </tr>
                <tr>
                <td>이메일</td>
                <td>{member.memberEmail}</td>
                </tr>
                <tr>
                <td>가입일</td>
                <td>{member.memberCreate}</td>
                </tr>
                <tr>
                    <td>임시정지상태확인 : {member.memberSuspension}</td>
                    <td>임시탈퇴상태확인 : {member.memberDeletion}</td>
                    <td><button onClick={onClickChangeHandlerSus}>정지</button></td>
                    <td><button onClick={onClickChangeHandlerDel}>정보삭제</button></td>
                </tr>
            </tbody>
        </table>
        </div>
    ) 
}

export default MemberDetail