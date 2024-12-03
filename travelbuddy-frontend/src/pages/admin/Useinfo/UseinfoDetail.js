import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import {
    callUseinfoDetailForAdminAPI
} from '../../../apis/UseinfoAPICalls';
import { updateUseinfoAPI } from '../../../apis/UseinfoAPICalls';
import { deleteUseinfoAPI } from '../../../apis/UseinfoAPICalls';

function UseinfoDetail () {

    const [useinfoContents, setUseinfoContents] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const editorRef = useRef(null);
    const params = useParams();
    const {useinfoCode} = params;
    const useinfoData = useSelector((state) => state.useinfoReducer) || {};
    const useinfo = useinfoData.data;

    useEffect (
        () => {
            dispatch(callUseinfoDetailForAdminAPI(useinfoCode))
        } , [useinfoCode]
    );

    useEffect(() => {
        if (useinfo && useinfo.useinfoImg) {
            const updatedContents = useinfo.useinfoContents
                ? 
                `<img src="${useinfo.useinfoImg}" alt="공지 이미지" style="max-width:800px; height:auto;" />${useinfo.useinfoContents}`
                : 
                `<img src="${useinfo.useinfoImg}" alt="공지 이미지" style="max-width:800px%; height:auto;" />`;
            setUseinfoContents(updatedContents);
        } else if (useinfo) {
            setUseinfoContents(useinfo.useinfoContents || "");
        }
    }, [useinfo]);

    const onClickChangeHandlerUpdate = () => {
        alert('수정기능 개발중입니다.');
        // navigate(`/admin/useinfos`);
    };
    const onClickChangeHandlerDelete = () => {
        dispatch(deleteUseinfoAPI(useinfoCode));
        alert('사용설명서를 삭제하였습니다.');
        navigate(`/admin/useinfos`);
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
        if (!useinfo) {
            return <div>로딩 중입니다...</div>;
        }

    return (
        <>
        <div className='UseinfoDetailContainer'>
            <div className='useinfoDetailHeader'>
            <p>사용설명서</p>
            <td><button onClick={onClickChangeHandlerUpdate}>수정</button></td>
            <td><button onClick={onClickChangeHandlerDelete}>삭제</button></td>
            </div>
            <tr>
            <td className='td1useinfoD'>제목</td>
            <td className='td2useinfoD'>{useinfo.useinfoTitle}</td>
            <td className='td3useinfoD'></td>
            {/* <td>글번호</td>
            <td>{useinfo.useinfoCode}</td>
            <td>작성일</td>
            <td>{useinfo.useinfoCreate}</td>
            <td>조회수</td> 
            <td>{useinfo.useinfoCount}</td>
            <td>은폐여부</td> 
            <td>{useinfo.useinfoAt}</td> */}
            </tr>
            </div>
                <div className='UseinfoDetailViewer'>
                <Viewer
                    initialValue={useinfoContents || useinfo.useinfoContents}
                    key={useinfoContents}
                    previewStyle="vertical"
                    initialEditType="wysiwyg"
                    ref={editorRef}
                />
            </div>
    </>
);
}

export default UseinfoDetail;