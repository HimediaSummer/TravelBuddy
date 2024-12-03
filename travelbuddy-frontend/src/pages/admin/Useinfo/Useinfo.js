import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";

import { insertUseinfoAPI } from "../../../apis/UseinfoAPICalls";

function Useinfo() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const imageInput = useRef(null);
    const editorRef = useRef(null);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();

    const [useinfoDTO, setUseinfoDTO] = useState({
        useinfoTitle: "",
        useinfoContents: "",
        useinfoCreate: "",
        useinfoCount: 0,
        useinfoAt: "",
    });

    useEffect(() => {
        /* 이미지 업로드시 미리보기 세팅 */
        if (image) {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result) {
                    setImageUrl(result);
                }
            };
            fileReader.readAsDataURL(image);
        }
    }, [image]);

    const onChangeImageUpload = (e) => {
        const image = e.target.files[0];
        if (image && image.size > 10048576) {
            alert("이미지 크기는 10MB 이하여야 합니다.");
            e.target.value = ""; // 입력 초기화
            return;
        }
        setImage(image);
        console.log("이 이미지는?", image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    const cancleQnaInsert = () => {
        navigate(`/admin/Useinfos`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        console.log(`${name}:${value}`);
        setUseinfoDTO({...useinfoDTO, [name]: value});
    };

    const onChange = () => {
        const data = editorRef.current.getInstance().getHTML();
        setUseinfoDTO((state) => ({ ...state, useinfoContents: data }));
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

    const inserUseinfo = () => {
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

        const viewAt = "N";

        const formData = new FormData();

        formData.append("useinfoTitle", useinfoDTO.useinfoTitle);
        formData.append(
            "useinfoContents",
            editorRef.current.getInstance().getHTML()
        );
        formData.append("useinfoCreate", formattedDate);
        formData.append("useinfoCount", useinfoDTO.useinfoCount);
        formData.append("useinfoAt", viewAt);

        if (image) {
            formData.append("useinfoImage", image);
        }
        console.log("이미지가 있으면 이거 있어야 돼", image);

        try {
            dispatch(insertUseinfoAPI({ useinfoDTO: formData }));
            alert("사용설명서가 등록되었습니다.");
            navigate(`/admin/Useinfos`);
        } catch (error) {
            console.error("사용설명서 등록 실패", error);
        }
    };

    return (
        <>
        <div className="useinfoCreate">
            <button onClick={cancleQnaInsert}>취소</button>
            <button onClick={inserUseinfo}>작성완료</button>
            <input
                type="text"
                name="useinfoTitle"
                value={useinfoDTO.useinfoTitle}
                placeholder="제목을 입력하세요"
                onChange={handleInputChange}
                required
                maxLength={100}
                style={{ width: "400px" }}
            />
            <button onClick={onClickImageUpload}>이미지첨부</button>
            <br />
            <img 
            src={imageUrl} 
            alt="useinfoImg" 
            style={{ maxWidth: "400px" }} 
            />
            <input
                style={{ display: "none" }}
                type="file"
                name="useinfoImg"
                accept="image/jpg,image/png,image/jpeg,image/gif"
                onChange={onChangeImageUpload}
                ref={imageInput}
            />
            </div>
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
                toolbarItems={[
                    ["heading", "bold", "italic", "strike"],
                    ["hr", "quote"],
                    ["ul", "ol", "task", "indent", "outdent"],
                    ["table", "link"],
                    ["code", "codeblock"],
                    ["scrollSync"],
                ]}
            />
        </>
    );
}

export default Useinfo;
