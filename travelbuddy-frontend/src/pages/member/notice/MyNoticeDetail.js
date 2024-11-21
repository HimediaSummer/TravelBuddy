import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callNoticeDetailAPI
} from '../../../apis/NoticeAPICalls';

function MyNoticeDetail () {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {noticeCode} = params;
    const noticeData = useSelector((state) => state.noticeReducer) || {};
    const notice = noticeData.data;

    useEffect (
        () => {
            dispatch(callNoticeDetailAPI(noticeCode))
        } , []
    );

    return (
        <div>
        <table>
            <thead>
                <tr>
                <th>공지사항</th>
                </tr>
            </thead>
            <tbody>
                {notice ? (
                    <>
                <tr>
                <td>제목</td>
                <td>{notice.noticeTitle}</td>
                <td>게시글번호</td>
                <td>{notice.noticeCode}</td>
                </tr>

                <tr>
                    <td>공지 내용</td>
                <td colSpan={5}>
                {notice.noticeContents}</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                </tr>
                </>
                ) : (
                    <tr>
                            <td colSpan="2">로딩 중...</td> {/* 데이터가 없을 때 로딩 메시지 */}
                        </tr>
                )}
            </tbody>
        </table>
        </div>
    );
}

export default MyNoticeDetail;