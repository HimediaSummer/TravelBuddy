import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import './MyPutBuddy.css';

function MyPutBuddy() {

    const navigate = useNavigate();
    const { buddyCode } = useParams(); 
      // Quill 에디터 내용 상태 관리
    // const editorRef = useRef();

    const [formData, setFormData] = useState({
        buddyTitle: "",
        buddyContents: "",
        regionCode: "",
        buddyTypeCode: "",
        postImg: [],
        buddyCreate: "",
    });

    const [regions, setRegions] = useState([]);
    const [buddyTypes, setBuddyTypes] = useState([]);
    const [previewImage, setPreviewImage] = useState([]);

    // 데이터 로드 (게시글 상세 조회)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/mypage/mybuddy/${buddyCode}/update`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const { getBuddyDetail, regions, buddyTypes } = data.data;

                console.log("getBuddyDetailllllll:", getBuddyDetail);
                console.log("Regions from APIIIIIIII:", regions);
                console.log("BuddyTypes from APIIIIIIII:", buddyTypes);

                console.log("Fetched data:꾸짖을갈!!!!!!!", data);

                // 폼 데이터 설정
                setFormData({
                    buddyTitle: getBuddyDetail.buddyTitle,
                    buddyContents: getBuddyDetail.buddyContents,
                    regionCode: getBuddyDetail.regionCode,
                    buddyTypeCode: getBuddyDetail.buddyTypeCode,
                    postImg: [],
                });

                // 목록 데이터 설정
                setRegions(regions || []);
                setBuddyTypes(buddyTypes || []);

                console.log('setFormData 붙어라붙어라붙어라붙어라붙어라', formData);
                console.log('regions 너빈칸이냐', regions);
                console.log('buddyTypes 너빈칸이냐', buddyTypes);

            } catch (error) {
                console.error("Error fetching data:", error);
                alert('데이터를 불러오는 중 오류가 발생했습니다.');
            }
        };
        fetchData();
    }, [buddyCode]);


    // Quill 에디터 변경 핸들러
    // const handleEditorChange = (content) => {
    //     console.log("변경 핸들러 작동");
    //     setFormData((prev) => ({
    //         ...prev,
    //         buddyContents: content,
    //     }));
    // };

    // Quill 드롭다운 문제 해결
    // useEffect(() => {
    //     if (editorRef.current) {
    //         const editor = editorRef.current.getEditor();
    //         const toolbar = editor.root.parentNode.querySelector(".ql-toolbar");

    //         if (toolbar) {
    //             toolbar.addEventListener("mousedown", (e) => {
    //                 const target = e.target;
    //                 if (target && target.closest(".ql-picker-options")) {
    //                     e.stopPropagation();
    //                 }
    //             });

    //             return () => {
    //                 toolbar.removeEventListener("mousedown", (e) => {
    //                     const target = e.target;
    //                     if (target && target.closest(".ql-picker-options")) {
    //                         e.stopPropagation();
    //                     }
    //                 });
    //             };
    //         }
    //     }
    // }, []);

    // 입력 필드 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    
    // 파일 변경 핸들러
    const handleFileChange = (e) => {

        const files = Array.from(e.target.files);
        let totalSize = files.reduce((acc, file) => acc + file.size, 0);
        
        // 크기 검사 (1MB = 1048576 bytes)
        if (totalSize > 1048576) {
            alert("이미지의 총 용량은 최대 1MB까지 허용됩니다.");
            e.target.value = null; // 파일 선택 초기화
            setFormData((prev) => ({
                ...prev,
                postImg: [], // 선택된 파일 초기화
            }));
            setPreviewImage([]); // 미리보기 초기화
            return;
        }

        // 확장자 검사
        const allowedExtensions = ["png", "jpg", "jpeg"];
        for (let file of files) {
            const fileExtension = file.name.split(".").pop().toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                alert("이미지는 .png, .jpg, .jpeg만 가능합니다.");
                e.target.value = null; // 파일 선택 초기화
                setFormData((prev) => ({
                    ...prev,
                    postImg: [], // 선택된 파일 초기화
                }));
                setPreviewImage([]); // 미리보기 초기화
                return;
            }
        }

        setFormData((prev) => ({
            ...prev,
            postImg: [...prev.postImg, ...files], // 기존 이미지에 새로 선택한 이미지 추가
        }));
            
        // 미리보기 이미지 생성
        const previewUrls = files.map((file) => URL.createObjectURL(file));
        setPreviewImage((prev) => [...prev, ...previewUrls]);
        
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = new FormData();
        updatedData.append("buddyTitle", formData.buddyTitle);

        // const editorContent = editorRef.current.getEditor().root.innerHTML;
        // updatedData.append('buddyContents', editorContent);
        updatedData.append("buddyContents", formData.buddyContents);
        updatedData.append("regionCode", formData.regionCode);
        updatedData.append("buddyTypeCode", formData.buddyTypeCode);
        
        // 여러 파일 추가
        formData.postImg.forEach((file) => {
            updatedData.append("postImg", file);
        });

        try {
            const response = await fetch(`/mypage/mybuddy/${buddyCode}/update`, {
                method: "PUT",
                body: updatedData,
            });

            if (!response.ok) throw new Error("Failed to update buddy");

            alert("게시글이 수정되었습니다.");
            navigate(`/mypage/mybuddy/${buddyCode}`);
        } catch (error) {
            console.error("Error updating buddy:", error);
            alert("수정 중 오류가 발생했습니다.");
        }
    };


    return (
        <div>
            <h3>게시글 수정</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    제목:
                    <input
                        type="text"
                        name="buddyTitle"
                        value={formData.buddyTitle || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    지역:
                    <select
                        name="regionCode"
                        value={formData.regionCode || ""}
                        onChange={handleInputChange}
                    >
                        <option value="">선택하세요</option>
                        {regions && regions.length > 0 && regions.map((region) => (
                            <option key={region.regionCode} value={region.regionCode}>
                                {region.regionName}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    버디 유형:
                    <select
                        name="buddyTypeCode"
                        value={formData.buddyTypeCode || ""}
                        onChange={handleInputChange}
                    >
                        <option value="">선택하세요</option>
                        {buddyTypes && buddyTypes.length > 0 && buddyTypes.map((type) => (
                            <option key={type.buddyTypeCode} value={type.buddyTypeCode}>
                                {type.buddyTypeName}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    내용:
                    <input
                        type="text"
                        name="buddyContents"
                        value={formData.buddyContents || ""}
                        onChange={handleInputChange}
                    />

                {/* <ReactQuill
                    ref={editorRef}
                    value={formData.buddyContents } // 초기값
                    onChange={handleEditorChange}
                    theme="snow" // Quill 테마
                    modules={{
                        toolbar: [
                            ["bold", "italic", "underline", "strike"],
                            [{ header: [1, 2, 3, false] }],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["image"],
                        ]
                    }}
                    formats={[
                        "header",
                        "bold", "italic", "underline", "strike",
                        "list", "bullet",
                        "image",
                    ]}
                /> */}
                </label>
                <br />
                <label>
                    이미지:
                    <input
                        type="file"
                        name="postImg"
                        accept="image/*"
                        multiple
                        onChange={handleFileChange}
                    />
                     <br />
                     <small>이미지의 총 용량은 최대 1MB까지 첨부 가능합니다. (.png, .jpg, .jpeg만 허용)</small>
                </label>
                <br/>
                {/* 이미지 미리보기 */}
                {previewImage.length > 0 && (
                    <div>
                        {previewImage.map((image, index) => (
                            <img 
                            key={index}
                            src={image}
                            alt={`Preview ${index}`}
                            style={{ width: "100px", height: "auto" }}
                            />
                        ))}
                    </div>
                )}
                <br/>
                <button type="submit">수정 완료</button>
                <button type="button" onClick={() => navigate(`/mypage/mybuddy/${buddyCode}`)}>
                    취소
                </button>
            </form>
        </div>
    );
}
export default MyPutBuddy;