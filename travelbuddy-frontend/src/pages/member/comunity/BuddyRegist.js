import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { callBuddyRegistAPI } from "../../../apis/BuddyAPICalls";

function BuddyRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const buddy = useSelector(state => state.buddiesReducer);

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();

    const [form, setForm] = useState(
        // buddyTitle: "",
        // buddyContents: "",
        // buddyTypeCode: "",
        // regionCode: "", 
        // buddyStatus: "",
        // buddyImg: ""
    );

    console.log("form = ", form);

    // useEffect(() => {
    //     if(buddy.status == 201) {
    //         console.log("[Buddy] Register SUCCESS {}", buddy);
    //         navigate("/buddies", { replace: true })
    //     }
    // }, [buddy]);

    useEffect(() => {
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

        setImage(image);
    };

    const onClickImageUpload = () => {
        imageInput.current.click();
    };

    const onChangeHandler = (e) => {
        setForm({
            ...form, 
            [e.target.name]: e.target.value});
    };
    console.log("onChangeHandler =" + onChangeHandler)


    const onClickBuddyRegistactionHandler = () => {
        const now = new Date();
        const formattedDate = now.toLocaleString('ko-KR', {
            year: 'numeric',
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        }).replace(/\./g,'-').replace(',','');

        const updateForm = {...form, buddyCreate: formattedDate};
        dispatch(callBuddyRegistAPI(updateForm));

        console.log("전송 데이터", updateForm);
        alert("완료")
        navigate('/buddies');
    }

    // const onClickBuddyRegistactionHandler = () => {

        // if(!form.buddyTitle || !form.buddyContent || !form.buddyStatus || form.regionName ) {
        //     alert("이미지를 제외한 모든 칸을 입력해주세요.");
        //     return;
        // }
        // console.log("[BuddyRegist] onClickBuddyRegistactionHandler", onClickBuddyRegistactionHandler);

        // const formData = new FormData();
        // const formData = useSelector((state) => state.buddiesReducer);

        // formData.append("buddyTitle", form.buddyTitle);
        // formData.append("buddyContent", form.buddyContent);
        // formData.append("regionName", form.regionName);
        // formData.append("buddyTypeName", form.buddyTypeName);
        // formData.append("buddyStatus", form.buddyStatus)

        // if(image) {
        //     formData.append("buddyImage", image)
        // }
        

    //     dispatch(
    //         callBuddyRegistAPI({
    //             form: form
    //         })
    //     );

    //     alert("게시글 작성 완료");
    //     // navigate("/buddies", { replace: true });
    //     // window.location.reload();
    // };

    return(
        <div>
            <div>
                <button onClick={() => navigate(-1)}>돌아가기</button>
                <button onClick={onClickBuddyRegistactionHandler}>게시글 등록</button>                
            </div>
            <div>
                <div>
                    <div>
                        {imageUrl && (
                            <img
                                src={imageUrl}
                                alt="preview"
                            />
                        )}
                        <input
                            type="file"
                            name="buddyImg"
                            accept="image/jpg, image/png, image/jpeg, image/gif"
                            onChange={onChangeImageUpload}
                            ref={imageInput}
                        />
                        <button
                            onClick={onClickImageUpload}
                        >
                            이미지 업로드
                        </button>
                    </div>
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <input
                                    name="memberCode"
                                    value={1001}
                                    readOnly
                                    />
                                </td>
                                <td>
                                    <label>게시글 제목</label>
                                </td>
                                <td>
                                    <input
                                        name="buddyTitle"
                                        placeholder="게시글 제목"
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>버디 유형</label>
                                </td>
                                <td>
                                    <label>
                                        <input
                                        // buddypTypeCode = 1: 버디, 2: 여행객
                                            type="radio"
                                            name="buddyTypeCode"
                                            placeholder="버디타입"
                                            onChange={onChangeHandler}
                                            value="1"
                                        />{' '}
                                        버디
                                    </label>{' '}
                                    &nbsp;
                                    <label>
                                        <input
                                        // buddypTypeCode = 1: 버디, 2: 여행객
                                            type="radio"
                                            name="buddyTypeCode"
                                            placeholder="버디타입"
                                            onChange={onChangeHandler}
                                            value="2"
                                        />{' '}
                                        여행객
                                    </label>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>지역 선택</label>
                                </td>
                                <td>
                                    <label>
                                        <input
                                            type="radio"
                                            name="regionCode"
                                            placeholder="서울"
                                            onChange={onChangeHandler}
                                            value="101"
                                        />{' '}
                                        서울
                                    </label>{' '}
                                    &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="regionCode"
                                            placeholder="경기도"
                                            onChange={onChangeHandler}
                                            value="102"
                                        />{' '}
                                        경기도
                                    </label>{' '}
                                    &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="regionCode"
                                            placeholder="인천"
                                            onChange={onChangeHandler}
                                            value="103"
                                        />{' '}
                                        인천
                                    </label>{' '}
                                    &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="regionCode"
                                            placeholder="강원도"
                                            onChange={onChangeHandler}
                                            value="104"
                                        />{' '}
                                        강원도
                                    </label>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>신청 활성화 여부</label>
                                </td>
                                <td>
                                    <label>
                                        <input
                                            type="radio"
                                            name="buddyStatus"
                                            onChange={onChangeHandler}
                                            value="Y"
                                        />{' '}
                                        Y
                                    </label>{' '}
                                    &nbsp;
                                    <label>
                                        <input
                                            type="radio"
                                            name="buddyStatus"
                                            onChange={onChangeHandler}
                                            value="N"
                                        />{' '}
                                        N
                                    </label>{' '}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <label>게시글 내용</label>
                                </td>
                                <td>
                                    <input
                                        name="buddyContents"
                                        placeholder="내용을 입력하세요"
                                        onChange={onChangeHandler}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default BuddyRegist;