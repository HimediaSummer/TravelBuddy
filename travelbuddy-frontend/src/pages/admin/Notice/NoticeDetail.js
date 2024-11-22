import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
    callNoticeDetailForAdminAPI
} from '../../../apis/NoticeAPICalls';
import { updateNoticeAPI } from '../../../apis/NoticeAPICalls';
import { deleteNoticeAPI } from '../../../apis/NoticeAPICalls';

function NoticeDetail () {

    const [noticeContents, setNoticeContents] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {noticeCode} = params;
    const noticeData = useSelector((state) => state.noticeReducer) || {};
    const notice = noticeData.data;

    useEffect (
        () => {
            dispatch(callNoticeDetailForAdminAPI(noticeCode))
        } , []
    );

    useEffect(() => {
        if (notice) {
            setNoticeContents(notice.noticeContents || ""); // API 데이터 로드 후 상태 초기화
        }
    }, [notice]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setNoticeContents((state) => (value));
    }

    const onClickChangeHandlerUpdate = () => {
        const updateData = { noticeContents };
        dispatch(updateNoticeAPI(noticeCode, updateData));
        alert('내용을 수정하였습니다.');
        navigate(`/notices`);
    };

    const onClickChangeHandlerDelete = () => {
        dispatch(deleteNoticeAPI(noticeCode));
        alert('공지사항을 삭제하였습니다.');
        navigate(`/notices`);
    };

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
                </tr>123

                <tr>
                    <td>공지 내용</td>
                <td colSpan={5}>
                <input
                    type="text"
                    style={{width: '500px', height: '100px'}}
                    onChange={handleInputChange}
                    name='noticeContents'
                    value={ noticeContents || notice.noticeContents } />
                    </td>
                </tr>
                
                <tr>
                    <td></td>
                    <td></td>
                    <td><button onClick={onClickChangeHandlerUpdate}>수정</button></td>
                    <td><button onClick={onClickChangeHandlerDelete}>삭제</button></td>
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

export default NoticeDetail;