import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

import { insertNoticeAPI } from "../../../apis/NoticeAPICalls";

function Notice() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const imageInput = useRef();
    const editorRef = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();

    const [noticeDTO, setNoticeDTO] = useState({
        noticeTitle: '',
        noticeContents: '',
        noticeCreate: '',
        noticeCount: 0,
        noticeAt: ''
    });

    // useEffect(() => {
    //     /* 이미지 업로드시 미리보기 세팅 */
    //     if (image) {
    //         const fileReader = new FileReader();
    //         fileReader.onload = (e) => {
    //             const { result } = e.target;
    //             if (result) {
    //                 setImageUrl(result);
    //             }
    //         };
    //         fileReader.readAsDataURL(image);
    //     }
    // }, [image]);

    // const onChangeImageUpload = (e) => {
    //     const image = e.target.files[0];
    //     if (image && image.size > 10048576) {
    //         alert('이미지 크기는 10MB 이하여야 합니다.');
    //         e.target.value = ''; // 입력 초기화
    //         return;
    //     }
    //     setImage(image);
    //     console.log('이 이미지는?', image);
    // };

    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    const cancleNoticeInsert = () => {
        navigate(`/Notices`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setNoticeDTO({ ...noticeDTO, [name]: value });
    };

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setNoticeDTO( (state) => ({...state, noticeContents: data}));
        console.log(data);
    };

    useEffect (
        () => {
            if (editorRef.current) {
                const editorInstance = editorRef.current.getInstance();
                editorInstance.removeHook('addImageBlobHook');
                editorInstance.addHook('addImageBlobHook', async (blob, callback) => {
                    setImage(blob);
        
                      // 로컬 미리보기 URL 생성
                    const previewUrl = URL.createObjectURL(blob);
                    callback(previewUrl, 'image');
                });
            }
        }, []);

    const insertNotice = () => {
        const now = new Date();
        const formattedDate = now
            .toLocaleString("ko-KR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            })
            .replace(/\. /g, "-")
            .replace(",", "");
        const viewAt = 'N';

            const formData = new FormData();

            formData.append('noticeTitle', noticeDTO.noticeTitle);
            formData.append('noticeContents', editorRef.current.getInstance().getHTML());
            formData.append('noticeCreate', formattedDate);
            formData.append('noticeCount', noticeDTO.noticeCount);
            formData.append('noticeAt', viewAt);
            
            if (image) {formData.append('noticeImage', image)}
            console.log('이미지가 있으면 이거 있어야 돼',image)

            try {
                dispatch(insertNoticeAPI({ noticeDTO: formData }));
                alert("공지사항이 등록되었습니다.");
                navigate(`/Notices`);
            } catch (error) {
                console.error("공지사항 등록 실패", error);
            }
        };


    return (
        <>
            <button onClick={cancleNoticeInsert}>취소</button>
            <button onClick={insertNotice}>작성완료</button>
                        <input
                                type="text"
                                name="noticeTitle"
                                value={noticeDTO.noticeTitle}
                                placeholder="제목을 입력하세요"
                                onChange={handleInputChange}
                                required
                                maxLength={100}
                                style={{ width: "350px" }}
                            />
        <Editor
        initialValue=" "
        placeholder="내용을 입력하세요."
        previewStyle="vertical"
        height="600px"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        hideModeSwitch={true}
        ref={editorRef}
        onChange={onChange}
        autofocus={true}
        />
        </>
    );
}

export default Notice;
