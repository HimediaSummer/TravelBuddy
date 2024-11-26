import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import { callNoticeDetailForAdminAPI } from "../../../apis/NoticeAPICalls";
import { updateNoticeAPI } from "../../../apis/NoticeAPICalls";
import { deleteNoticeAPI } from "../../../apis/NoticeAPICalls";

function NoticeDetail() {
    const [noticeContents, setNoticeContents] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const params = useParams();
    const { noticeCode } = params;
    const noticeData = useSelector((state) => state.noticeReducer) || {};
    const notice = noticeData.data;

    useEffect( () => {
         dispatch(callNoticeDetailForAdminAPI(noticeCode));
    }, [noticeCode]
);

    useEffect(() => {
        if (notice && notice.noticeImg) {
            const updatedContents = notice.noticeContents
                ? 
                `<img src="${notice.noticeImg}" alt="공지 이미지" style="max-width:100%; height:auto;" />${notice.noticeContents}`
                : 
                `<img src="${notice.noticeImg}" alt="공지 이미지" style="max-width:100%; height:auto;" />`;
                setNoticeContents(updatedContents);
        } else if (notice) {
                setNoticeContents(notice.noticeContents || "");
        }
    }, [notice]);

    const onClickChangeHandlerDelete = () => {
        dispatch(deleteNoticeAPI(noticeCode));
        alert("공지사항을 삭제하였습니다.");
        navigate(`/admin/notices`);
    };

    useEffect(() => {
        return () => {
            if (editorRef.current && editorRef.current.getInstance()) {
                try {
                    editorRef.current.getInstance().destroy();
                } catch (error) {
                    console.log('에디터 정리 중 오류 발생:', error);
                }
            }
        };
    }, []);

    // 데이터가 없을 경우 로딩 메시지 렌더링
    if (!notice) {
        return <div>로딩 중입니다...</div>;
    }

    
    return (
        <>
            <td style={{width:'50px'}}>제목</td>
            <td style={{width:'350px'}}>{notice.noticeTitle}</td>
            <td style={{width:'80px'}}>글번호</td>
            <td style={{width:'50px'}}>{notice.noticeCode}</td> 
            <td><button onClick={onClickChangeHandlerDelete}>삭제</button></td><br/>
            <td style={{width:'80px'}}>작성일</td>
            <td style={{width:'180px'}}>{notice.noticeCreate}</td>
            <td style={{width:'80px'}}>조회수</td> 
            <td style={{width:'80px'}}>{notice.noticeCount}</td>
            <hr/>
            <div>
                <Viewer
                    initialValue={noticeContents || notice.noticeContents}
                    key={noticeCode}
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wysiwyg"
                    ref={editorRef}
                />
            </div>
        </>
    );
}

export default NoticeDetail;
