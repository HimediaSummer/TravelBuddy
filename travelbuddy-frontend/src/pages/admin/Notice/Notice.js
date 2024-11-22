import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { insertNoticeAPI } from "../../../apis/NoticeAPICalls";

function Notice() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const imageInput = useRef();
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();

    const [noticeDTO, setNoticeDTO] = useState({
        noticeTitle: '',
        noticeContents: '',
        noticeCreate: '',
        noticeCount: 0,
        noticeAt: ''
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
            alert('이미지 크기는 10MB 이하여야 합니다.');
            e.target.value = ''; // 입력 초기화
            return;
        }
        setImage(image);
        console.log('이 이미지는?', image);
    };

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

            const formData = new FormData();

            formData.append('noticeTitle', noticeDTO.noticeTitle);
            formData.append('noticeContents', noticeDTO.noticeContents);
            formData.append('noticeCreate', formattedDate);
            formData.append('noticeCount', noticeDTO.noticeCount);
            formData.append('noticeAt', noticeDTO.noticeAt);
            
            if (image) {formData.append('noticeImage', image);}
            console.log('이미지가 있으면 이거 있어야 돼',image)

            dispatch(insertNoticeAPI({noticeDTO: formData}));    

            alert("공지사항이 등록되었습니다.");
            navigate(`/Notices`);
        };

    return (
        <div>
            <h2>공지사항</h2>
            <button onClick={cancleNoticeInsert}>취소</button>
            <button onClick={insertNotice}>작성완료</button>
            <table>
                <thead>
                    <tr></tr>
                </thead>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
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
                        </td>
                        <td>은폐여부</td>
                        <td>
                            <select
                                name="noticeAt"
                                value={noticeDTO.noticeAt}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">선택</option>
                                <option value={"N"}>공개</option>
                                <option value={"Y"}>비공개</option>
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td colSpan={3}>
                            <input
                                type="text"
                                name="noticeContents"
                                value={noticeDTO.noticeContents}
                                placeholder="내용을 입력하세요."
                                onChange={handleInputChange}
                                required
                                maxLength={500}
                                style={{ width: "600px" }}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>이미지</td>
                            <img
                            src={imageUrl}
                            alt="preview"
                            style={{ maxWidth: '200px' }} 
							/>
                        <td>
                            <input 
                            style={{ display: 'none' }}
							type="file"
							name="noticeImg"
							accept="image/jpg,image/png,image/jpeg,image/gif"
							onChange={onChangeImageUpload}
							ref={imageInput} />
                        </td>
                        <td>
                            <button 
                            onClick={onClickImageUpload}>
                                첨부
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            ☑️ 이미지첨부는 최대 10MB입니다.
                            <br />
                            PNG,JPG,JPEG만 가능합니다.
                        </td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Notice;
