import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callMyMatchDetailsAPI, cancelMatchAPI } from '../../../apis/MypageAPICalls';
import { useParams } from 'react-router-dom';

function MyMatchDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { buddyList = [], buddyMatchDataList = [] } = useSelector(
        (state) => state.myMatchReducer.matchDetails || {}
    );

    // 매칭 게시글 데이터 로드
    useEffect(() => {
        dispatch(callMyMatchDetailsAPI());
    }, [dispatch]);

    // 매칭 신청 취소 핸들러
    const handleCancel = (buddyMatchCode) => {
        if (!window.confirm('신청을 취소하시겠습니까?')) {
            return;
        }
        dispatch(cancelMatchAPI(buddyMatchCode));
    };

    return (
        <div>
            <h3>내가 신청한 글 상세조회</h3>
            {buddyList.length > 0 ? (
                <ul>
                    {buddyList.map((buddy, index) => (
                        <li key={index}>
                            <p>제목 : {buddy.buddyTitle}</p>
                            <p>내용 : {buddy.buddyContents}</p>
                            {/* <p>이미지 : {buddy.buddyImg}</p> */}
                            <p>지역 : {buddy.region.regionName}</p>
                            <p>작성일자 : {buddy.buddyCreate}</p>
                            <p>작성자 : {buddy.account.memberName}</p>
                            <p>버디유형 : {buddy.buddyType.buddyTypeName}</p>
                            <ul>
                                {buddyMatchDataList
                                    .filter((match) => match.buddyCode === buddy.buddyCode)
                                    .map((match, matchIndex) => (
                                        <li key={matchIndex}>
                                            <p>ApplyId: {match.applyId}</p>
                                            <p>
                                                ApplyStatus:{' '}
                                                {match.applyStatus === 1
                                                    ? '대기중'
                                                    : match.applyStatus === 2
                                                    ? '수락'
                                                    : '거절'}
                                            </p>
                                            <button onClick={() => handleCancel(match.buddyMatchCode)}>
                                                신청취소
                                            </button>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>신청한 버디가 없습니다.</p>
            )}
        </div>
    );
}

export default MyMatchDetail;
