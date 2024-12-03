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
        dispatch(cancelMatchAPI(buddyMatchCode)).then(() => {
            // 신청 취소 성공 후 새로고침
            window.location.reload();
        });
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
                            <div className="buddyMatch-title">
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
                            <div className="buddyMatch-typeName">
                                <p>{buddyList[0].buddyType?.buddyTypeName || "버디 유형 없음"}</p>
                            </div>
                        </td>
                        <td>지역</td>
                        <td>
                            <div className="buddyMatch-regionName">
                                <p>{buddyList[0].region?.regionName || "지역 없음"}</p>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="2" className="image-cell">
                            <div className="buddy-img">
                                {buddyList[0].buddyImg ? (
                                    <img
                                        src={buddyList[0].buddyImg}
                                        alt="Buddy Image"
                                    />
                                ) : null}
                            </div>
                        </td>
                        <td colSpan="3" className="contents">
                            <div className="buddyMatch-contents">
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
                                                        <span className="label">신청아이디 :</span>{" "}
                                                        {match.applyId}
                                                    </p>
                                                    <p>
                                                        <span className="label">상태 :</span>{" "}
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
            ) : (
                <div className='buddyMatch-none'>신청한 버디가 없습니다.</div>
            )}
        </div>
    );
}

export default MyMatchDetail;
