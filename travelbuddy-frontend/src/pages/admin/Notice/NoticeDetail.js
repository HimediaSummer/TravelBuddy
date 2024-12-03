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
    }, []
);

    useEffect(() => {
        if (notice && notice.noticeImg) {
            const updatedContents = notice.noticeContents
                ? 
                `<img src="${notice.noticeImg}" alt="공지 이미지" style="max-width:800px; height:auto;" />${notice.noticeContents}`
                : 
                `<img src="${notice.noticeImg}" alt="공지 이미지" style="max-width:800px; height:auto;" />`;

                setNoticeContents(updatedContents);

        } else if (notice) {
                setNoticeContents(notice.noticeContents);
        }
    }, [notice]);

    const onClickChangeHandlerUpdate = () => {
        alert("수정기능 개발중입니다.");
        // navigate(`/admin/notices`);
    };
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
        <div className='UseinfoDetailContainer'>
            <div className='useinfoDetailHeader'>
            <p>공지사항</p>
            <td><button onClick={onClickChangeHandlerUpdate}>수정</button></td>
            <td><button onClick={onClickChangeHandlerDelete}>삭제</button></td>
        </div>
        <tr>
            <td className='td1useinfoD'>제목</td>
            <td className='td2useinfoD'>{notice.noticeTitle}</td>
            <td className='td3useinfoD'></td>
            {/* <td style={{width:'60px'}}>글번호</td>
            <td style={{width:'50px'}}>{notice.noticeCode}</td> 
            <td style={{width:'60px'}}>작성일</td>
            <td style={{width:'200px'}}>{notice.noticeCreate}</td>
            <td style={{width:'60px'}}>조회수</td> 
            <td style={{width:'80px'}}>{notice.noticeCount}</td> */}
            </tr>
            </div>
            <div className='UseinfoDetailViewer'>
                <Viewer
                    initialValue={noticeContents || notice.noticeContents}
                    key={noticeContents}
                    previewStyle="vertical"
                    initialEditType="wysiwyg"
                    ref={editorRef}
                />
            </div>
        </>
    );
}

export default NoticeDetail;
