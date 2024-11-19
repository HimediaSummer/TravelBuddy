import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { callBuddyDetailAPI } from '../../../apis/BuddyAPICalls';
import { callGetMemberAPI } from '../../../apis/MemberAPICalls';
import { decodeJwt } from '../../../utils/tokenUtils';

function BuddyDetail () {

    const dispatch = useDispatch();
    const params = useParams();

    const buddyData = useSelector((state) => state.buddiesReducer);
    const member = useSelector(state => state.memberReducer); 
    console.log("member =" , member);
    console.log("member type", typeof member);

    const token = decodeJwt(window.localStorage.getItem("accessToken"));
    console.log("token = ", token)
    console.log("token type", typeof token);
    

    const {data} = buddyData;
    console.log('data 가 가지고있는것',data);
    console.log("data type",typeof data);

    useEffect(() => {
        dispatch(callBuddyDetailAPI(params));
    }, []);

    useEffect(() => {
        dispatch(callBuddyDetailAPI(params));
    }, [dispatch, params]);


    useEffect(() => {
        dispatch(callGetMemberAPI({ memberName: token.sub }));
    }, []);

    useEffect(() => {
        dispatch(callGetMemberAPI({ memberName: token.sub }));
    }, [dispatch, token.sub]);

    console.log("token.sub", token?.sub);
    console.log("token.sub type", typeof token?.sub);

    const isAuthor = data?.memberCode === token.sub;
    console.log("data?.memberName", data?.memberName);
    console.log("isAuthor = ", isAuthor);
    console.log("isAuthor type = ", typeof isAuthor);


    return (
        
        <div>
            <table>
                <thead>
                    <tr>
                        <th>버디매칭</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? (
                        <>
                            <tr>
                                <td>제목</td>
                                <td>{data.buddyTitle}</td>
                                <td>유형</td>
                                <td>{data.buddyTypeCode}</td>
                            </tr>

                            <tr>
                                <td colSpan={4}>{data.buddyContents}</td>
                            </tr>

                        {isAuthor && (
                            <tr>
                                <td></td>
                                <td></td>
                                    <>
                                        <td><button>게시글 수정</button></td>
                                        <td><button>게시글 삭제</button></td>
                                    </>
                            </tr>
                            )}
                        </>
                    ) : (
                        <tr>
                            <td colSpan="2">로딩 중...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    );
}

export default BuddyDetail;