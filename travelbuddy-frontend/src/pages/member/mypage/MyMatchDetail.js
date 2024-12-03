import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callMyMatchDetailsAPI, cancelMatchAPI } from '../../../apis/MypageAPICalls';
import { useParams } from 'react-router-dom';
import './MyMatchDetail.css';

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
        <div className="page-container">
            <h3 className="buddy-title">MY신청</h3>
            {buddyList.length > 0 ? (
                <table className="main-table">
                <thead>
                    <tr>
                        <td>제목</td>
                        <td>
                            <div className="buddyDetail-title">
                                <p>
                                    {buddyList[0].buddyTitle &&
                                    buddyList[0].buddyTitle.length > 20
                                        ? `${buddyList[0].buddyTitle.slice(0, 20)}...`
                                        : buddyList[0].buddyTitle}
                                </p>
                            </div>
                        </td>
                        <td>버디 유형</td>
                        <td>
                            <div className="buddy-typeName">
                                <p>{buddyList[0].buddyType?.buddyTypeName || "버디 유형 없음"}</p>
                            </div>
                        </td>
                        <td>지역</td>
                        <td>
                            <div className="buddy-regionName">
                                <p>{buddyList[0].region?.regionName || "지역 없음"}</p>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="left-cell" colSpan="6">
                            <div className="buddy-img">
                                {buddyList[0].buddyImg ? (
                                    <img
                                        src={buddyList[0].buddyImg}
                                        alt="Buddy Image"
                                    />
                                ) : null}
                            </div>
                            <div className="buddy-contents">
                                <p>{buddyList[0].buddyContents}</p>
                            </div>
                            {/* ApplyId 및 ApplyStatus */}
                            <div className="match-info">
                                    <ul>
                                        {buddyMatchDataList
                                            .filter((match) => match.buddyCode === buddyList[0].buddyCode)
                                            .map((match, matchIndex) => (
                                                <li key={matchIndex}>
                                                    <p>
                                                        <span className="label">ApplyId:</span>{" "}
                                                        {match.applyId}
                                                    </p>
                                                    <p>
                                                        <span className="label">ApplyStatus:</span>{" "}
                                                        {match.applyStatus === 1
                                                            ? "대기중"
                                                            : match.applyStatus === 2
                                                            ? "수락"
                                                            : "거절"}
                                                    </p>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            <button
                                className="cancel-button"
                                onClick={() => handleCancel(buddyList[0].buddyCode)}
                            >
                                신청 취소
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
                // <ul>
                //     {buddyList.map((buddy, index) => (
                //         <li key={index}>
                //             <p>제목 : {buddy.buddyTitle}</p>
                //             <p>내용 : {buddy.buddyContents}</p>
                //             {/* <p>이미지 : {buddy.buddyImg}</p> */}
                //             <p>지역 : {buddy.region.regionName}</p>
                //             <p>작성일자 : {buddy.buddyCreate}</p>
                //             <p>작성자 : {buddy.account.memberName}</p>
                //             <p>버디유형 : {buddy.buddyType.buddyTypeName}</p>
                //             <ul>
                //                 {buddyMatchDataList
                //                     .filter((match) => match.buddyCode === buddy.buddyCode)
                //                     .map((match, matchIndex) => (
                //                         <li key={matchIndex}>
                //                             <p>ApplyId: {match.applyId}</p>
                //                             <p>
                //                                 ApplyStatus:{' '}
                //                                 {match.applyStatus === 1
                //                                     ? '대기중'
                //                                     : match.applyStatus === 2
                //                                     ? '수락'
                //                                     : '거절'}
                //                             </p>
                //                             <button onClick={() => handleCancel(match.buddyMatchCode)}>
                //                                 신청취소
                //                             </button>
                //                         </li>
                //                     ))}
                //             </ul>
                //         </li>
                //     ))}
                // </ul>
            ) : (
                <p>신청한 버디가 없습니다.</p>
            )}
        </div>
    );
}

export default MyMatchDetail;
