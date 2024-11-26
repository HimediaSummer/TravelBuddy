import { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import {
    callUseinfoDetailAPI
} from '../../../apis/UseinfoAPICalls';


function MyUseinfoDetail () {

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
            dispatch(callUseinfoDetailAPI(useinfoCode))
        } , [useinfoCode]
    );

    useEffect(() => {
        if (useinfo && useinfo.useinfoImg) {
            const updatedContents = useinfo.useinfoContents
                ? 
                `${useinfo.useinfoContents}
                <img src="${useinfo.useinfoImg}" alt="공지 이미지" style="max-width:800px; height:auto;" />`
                : 
                `<img src="${useinfo.useinfoImg}" alt="공지 이미지" style="max-width:800px%; height:auto;" />`;
            setUseinfoContents(updatedContents);
        } else if (useinfo) {
            setUseinfoContents(useinfo.useinfoContents || "");
        }
    }, [useinfo]);

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
            <td style={{width:'50px'}}>제목</td>
            <td style={{width:'350px'}}>{useinfo.useinfoTitle}</td>
            <td style={{width:'80px'}}>글번호</td>
            <td style={{width:'50px'}}>{useinfo.useinfoCode}</td>
            <td style={{width:'80px'}}>작성일</td>
            <td style={{width:'180px'}}>{useinfo.useinfoCreate}</td>
            <td style={{width:'80px'}}>조회수</td> 
            <td style={{width:'80px'}}>{useinfo.useinfoCount}</td>
            <hr/>
                <div>
                <Viewer
                    initialValue={useinfoContents || useinfo.useinfoContents}
                    key={useinfoCode}
                    previewStyle="vertical"
                    height="600px"
                    initialEditType="wysiwyg"
                    ref={editorRef}
                />
            </div>
    </>
    );
}

export default MyUseinfoDetail;