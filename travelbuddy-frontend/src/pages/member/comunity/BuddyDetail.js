import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { callBuddyDetailAPI, callBuddyDeleteAPI, callApplyBuddyAPI } from '../../../apis/BuddyAPICalls';
import { callGetMemberAPI } from '../../../apis/MemberAPICalls';
import { decodeJwt } from '../../../utils/tokenUtils';
import BuddyDetailCSS from "./BuddyDetail.css";

function BuddyDetail () {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [isApplied, setIsApplied] = useState(false);
    console.log("isAPPlied = ", isApplied);

    const buddyData = useSelector((state) => state.buddiesReducer);
    const member = useSelector(state => state.memberReducer); 
    console.log("member =" , member);
    console.log("member type", typeof member);

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log("token = ", token)
    console.log("token type", typeof token);

    useEffect(() => {
        if(token) {
            dispatch(callGetMemberAPI({ 
                memberName: token.sub 
            }));
        }
    }, []);
    

    const {data} = buddyData;

    console.log('data 가 가지고있는것',data);
    console.log("data type",typeof data);

    const [isLoading, setIsLoading] = useState(true); // 데이터 로딩 상태 관리

    // useEffect(() => {
    //     dispatch(callBuddyDetailAPI(params));
    // }, []);

    useEffect(() => {
        dispatch(callBuddyDetailAPI(params))
        .then(() => {
            setIsLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching buddy details:", error);
            setIsLoading(false);
        });
    }, [dispatch, params]);

    if (isLoading) {
        return <div>로딩 중...</div>;
    }


    // useEffect(() => {
    //     dispatch(callGetMemberAPI({ memberName: token.sub }));
    // }, []);

    // useEffect(() => {
    //     dispatch(callGetMemberAPI({ memberName: token.sub }));
    // }, [dispatch, token.sub]);

    console.log("token.sub = ", token?.sub);
    console.log("token.sub type = ", typeof token?.sub);

    // const memberCode = data?.account?.memberCode; // Account의 memberCode
    // const memberName = data?.account?.memberName;

    // const isAuthor = memberCode === parseInt(token?.sub);

    // const isAuthor = member?.data?.memberName === data?.account.memberName;
    const isAuthor = member?.data?.memberCode && data?.account.memberCode && member.data.memberCode === data.account.memberCode;

    const onClickBuddyUpdate = () => {
        alert("개발중 입니다.");
        // navigate(`/buddyUpdate/${data.buddyCode}`, {replace: false})
    };

    const onClickBuddyDelete = () => {
        if (isAuthor) {
            if (window.confirm("게시글을 삭제하시겠습니까?")) {
                dispatch(callBuddyDeleteAPI(data.buddyCode))
                    .then(() => {
                        alert("게시글이 삭제되었습니다.");
                        // navigate('/buddyBoard/buddies'); // 삭제 후 목록 페이지로 이동
                        navigate('/cm/buddies', { replace: true});
                        window.location.reload();
                    })
                    .catch((error) => {
                        console.error("Error deleting buddy:", error);
                        alert("게시글 삭제 중 오류가 발생했습니다.");
                    });
            }
        } else {
            alert("삭제 권한이 없습니다.");
        }
    };


    const onClickApplyButton = () => {
        // alert("개발 중입니다.");
        const applyData = {
            "buddyCode": data.buddyCode,
            "memberCode": member.data.memberCode,
            "applyId": member.data.memberName, // 또는 다른 식별자
            "applyStatus": 1 // 신청 상태 (1: 신청),
        };

        console.log("applyData = ", applyData)
    
        dispatch(callApplyBuddyAPI(applyData))
            .then(() => {
                alert("신청이 완료되었습니다.");
                // 버튼 상태 업데이트
                setIsApplied(true); // 상태를 업데이트하여 UI에서 신청 완료로 표시
                navigate('/cm/buddies', { replace: true});
                window.location.reload();
            })
            .catch((error) => {
                console.error("신청 중 오류 발생:", error);
                alert("신청 중 오류가 발생했습니다.");
            });        
    };


    return (
        
        <div className="buddy-detail-container">
            <div className="buddy-detail-header">
                <h2>버디매칭</h2>
            </div>
            <div className="buddy-detail-table">
                <table>
                    <thead>
                        {/* <tr>
                            <th colSpan="4">버디매칭</th>
                        </tr> */}
                        <tr>
                            {/* <th>제목</th>
                            <th>유형</th>
                            <th>지역</th>
                            <th>작성자</th> */}
                            <td>제목</td>
                            <td>{data.buddyTitle}</td>
                            <td>유형</td>
                            <td>{data.buddyType ? data.buddyType.buddyTypeName : "없음"}</td>
                            <td>지역</td>
                            <td>{data.region ? data.region.regionName : "없음"}</td>
                            <td>작성자</td>
                            <td>{data.account ? data.account.memberName : "없음"}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data ? (
                            <>
                                <tr>
                                    <td>제목</td>
                                    <td>{data.buddyTitle}</td>
                                    <td>유형</td>
                                    <td>{data.buddyType ? data.buddyType.buddyTypeName : "없음"}</td>
                                    <td>지역</td>
                                    <td>{data.region ? data.region.regionName : "없음"}</td>
                                    <td>작성자</td>
                                    <td>{data.account ? data.account.memberName : "없음"}</td>
                                </tr>

                                <tr>
                                    <td colSpan="4">
                                        <div className="buddy-description">
                                            {/* 본문 내용 */}
                                            <div dangerouslySetInnerHTML={{ __html: data.buddyContents }} />
                                            {/* 이미지가 있을 경우 본문에 포함되게 표시 */}
                                            {data.buddyImg && (
                                                <img
                                                    src={data.buddyImg}
                                                    alt='게시글 이미지'
                                                    // style={{
                                                    //     maxWidth: '400px',
                                                    //     height: 'auto',
                                                    //     margin: '10px 0'
                                                    // }}
                                                    className="buddy-img" 
                                                />
                                                )}
                                    {/* </td> */}
                                    {/* <td colSpan={data.buddyImg ? 4 : 5}>{data.buddyContents}</td> */}
                                    {/* <td colSpan="4"> */}
                                        {/* <div className="buddy-description">{data.buddyContents}</div> */}
                                        </div>
                                    </td>
                                </tr>

                                <tr>
                                    <td colSpan="4">
                                        <div className="apply-button-container">
                                            <button className="apply-button" onClick={onClickApplyButton} disabled={isApplied}>
                                                {isApplied ? "신청완료" : "신청하기"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                                        <>
                                            {isAuthor && (
                                                <tr>
                                                    <td colSpan="4">
                                                        <div>
                                                            <button onClick={onClickBuddyUpdate} className="update-button">수정</button>
                                                        {/* </td>
                                                    )}
                                                    {isAuthor && (
                                                        <td> */}
                                                            <button onClick={onClickBuddyDelete} className="delete-button">삭제</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </>
                                
                            </>
                        ) : (
                            <tr>
                                <td colSpan="2">로딩 중...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default BuddyDetail;