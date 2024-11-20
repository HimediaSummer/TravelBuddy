import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callMemberDetailForAdminAPI
} from '../../apis/MemberAPICalls';
import {
    toggleMemberSuspensionAPI} from '../../apis/MemberAPICalls';
import {
    toggleMemberDeletionAPI} from '../../apis/MemberAPICalls';

function MemberDetail () {

    const [memberSuspension, setIsMemberSuspension] = useState('N');
    const [memberDeletion, setIsMemberDeletion] = useState('N');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const memberData = useSelector((state) => state.memberReducer);
    const {data: member} = memberData;
 
    useEffect (
        () => {
            dispatch(callMemberDetailForAdminAPI(params))
            
        } , []
    );

    useEffect (
        () => {
            if (member) {
                setIsMemberSuspension(member.memberSuspension);
                setIsMemberDeletion(member.memberDeletion); 
            }
        }, [member.memberCode]
    );

    const onClickChangeHandlerSus = () => {
        const newSuspensionStatus = (memberSuspension === 'Y' ? 'Y':'N');
        dispatch(toggleMemberSuspensionAPI(params))
        .then(
        () => {
            setIsMemberSuspension(newSuspensionStatus);
            if (newSuspensionStatus !== 'Y') {
                alert("계정을 정지상태로 변경합니다.");
                navigate(`/members`);
            } else {
                alert("정지 상태를 해제합니다.");
                navigate(`/members`);
            }
        })
        .catch(error => {
            console.error('정지 버튼이 정상작동하지 않습니다.:', error);
        }); 
    };

    const onClickChangeHandlerDel = () => {
        const newDeletionStatus = (memberDeletion === 'Y' ? 'Y' : 'N');
        dispatch(toggleMemberDeletionAPI(params))
        .then(
        () => {
            setIsMemberDeletion(newDeletionStatus);
            if (newDeletionStatus !== 'Y') {
                alert("계정을 삭제상태로 변경합니다.");
                navigate(`/members`);
            } else {
                alert("삭제 상태를 해제합니다.");
                navigate(`/members`);
            }
        })
        .catch(error => {
            console.error('삭제 버튼이 정상작동하지 않습니다.:', error);
        }); 
    };

    return (
        <div>
        <table>
            <thead>
                <th>회원정보</th>
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