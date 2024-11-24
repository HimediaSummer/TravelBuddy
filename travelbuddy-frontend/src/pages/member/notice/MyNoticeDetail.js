import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

import {
    callNoticeDetailAPI
} from '../../../apis/NoticeAPICalls';

function MyNoticeDetail () {

    const [noticeContents, setNoticeContents] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const {noticeCode} = params;
    const noticeData = useSelector((state) => state.noticeReducer) || {};
    const notice = noticeData.data;

    useEffect (
        () => {
            dispatch(callNoticeDetailAPI(noticeCode))
        } , [noticeCode]
    );

    useEffect(() => {
        if (notice) {
            const updatedContents = notice.noticeContents 
            ? 
            `${notice.noticeContents}
            <img src="${notice.noticeImg}" alt="공지 이미지" style="max-width:100%; height:auto;" />`
            : 
            `<img src="${notice.noticeImg}" alt="공지 이미지" style="max-width:100%; height:auto;" />`;

            setNoticeContents(updatedContents || "");

        }
    }, [notice]);

    // 데이터가 없을 경우 로딩 메시지 렌더링
    if (!notice) {
        return <div>로딩 중입니다...</div>;
    }

    return ( 
        <>
            제목 :
            {notice.noticeTitle} |
            게시글번호 :
            {notice.noticeCode} 
            <br/>
            <br/>
            작성일 : {notice.noticeCreate} | 조회수 {notice.noticeCount}
            <br/>
            <hr/>
        <div>
            <Viewer 
            initialValue={noticeContents || notice.noticeContents}
            key={noticeContents}
            previewStyle="vertical"
            height="600px"
            initialEditType="wysiwyg"
        />
        </div>
        </>
    );
}

export default MyNoticeDetail;