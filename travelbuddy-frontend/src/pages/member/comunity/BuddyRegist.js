import { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { callBuddyRegistAPI } from "../../../apis/BuddyAPICalls";
import { decodeJwt } from '../../../utils/tokenUtils';
import { callGetMemberAPI } from '../../../apis/MemberAPICalls';
import BuddyRegistCSS from'./BuddyRegist.css';

function BuddyRegist() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const member = useSelector(state => state.memberReducer);
    const token = decodeJwt(window.localStorage.getItem("accessToken"));

    useEffect(() => {
        if(token) {
            dispatch(callGetMemberAPI({ 
                memberName: token.sub 
            }));
        }
    }, []);

    console.log("member =" , member);
    console.log("member type", typeof member);

    console.log("token = ", token)
    console.log("token type", typeof token);

    useEffect(() => {
        // 로그인 상태 확인
        const token = window.localStorage.getItem('accessToken');
        if (!token) {
            alert('로그인이 필요한 서비스입니다.');
            navigate('/login');
            return;
        }
    }, []);

    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState();
    const imageInput = useRef();

    const [form, setForm] = useState(
        {
        buddyTitle: "",
        buddyContents: "",
        buddyTypeCode: "",
        regionCode: "", 
        buddyStatus: "",
        buddyCreate: ""
    }
    );

    console.log("form = ", form);

    // useEffect(() => {
    //     if(buddy.status == 201) {
    //         console.log("[Buddy] Register SUCCESS {}", buddy);
    //         navigate("/buddies", { replace: true })
    //     }
    // }, [buddy]);



    //이미지 업로드 시 미리보기 세팅
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

        if (!form.buddyTitle.trim() || !form.buddyContents.trim() || 
        !form.buddyTypeCode || !form.regionCode || !form.buddyStatus) {
        alert("이미지를 제외한 모든 칸을 입력해주세요.");
        return; // 조건을 만족하지 않으면 함수 종료
    }
        
        // const now = new Date();
        // const formattedDate = now.toLocaleString('ko-KR', {
        //     year: 'numeric',
        //     month: "2-digit",
        //     day: "2-digit",
        //     hour: "2-digit",
        //     minute: "2-digit",
        //     second: "2-digit",
        //     hour12: false
        // }).replace(/\./g,'-').replace(',','');

        // const updateForm = {...form, buddyCreate: formattedDate};

        const formData = new FormData();

        formData.append('memberCode', member.data.memberCode);
        formData.append("buddyTitle", form.buddyTitle);
        formData.append("buddyContents", form.buddyContents);
        formData.append("buddyTypeCode", form.buddyTypeCode);
        formData.append("regionCode", form.regionCode);
        formData.append("buddyCreate", form.buddyCreate);

        if(image) {
            formData.append("buddyImage", image)
        }

        dispatch(callBuddyRegistAPI( formData));

        console.log("전송 데이터", formData);
        alert("완료")
        navigate('/cm/buddies', { replace: true});
        window.location.reload();
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
        <div className="buddy-regist-container">
            <div className="buddy-detail-author-buttons">
                <button className="back-button" onClick={() => navigate(-1)}>돌아가기</button>
                <button className="write-button" onClick={onClickBuddyRegistactionHandler}>작성 완료</button>                
            </div>
            <div className="BuddyRegistHeader">
                <h2>게시글 작성</h2>
            </div>
            <div>
                <div className="buddy-regist-table">
                    <table>
                        <tbody>
                            <tr className="tableHead">
                                <td>
                                    <label className="buddy-regist-title">게시글 제목</label>
                                </td>
                                <td >
                                    <input
                                        name="buddyTitle"
                                        placeholder="게시글 제목"
                                        onChange={onChangeHandler}
                                    />
                                </td>
                                <td>
                                    <label>버디 유형</label>
                                </td>
                                <td>
                                    <select
                                        name="buddyTypeCode"
                                        onChange={onChangeHandler}
                                        value={form.buddyTypeCode}
                                    >
                                        <option value="">선택</option>
                                        <option value="1">버디</option>
                                        <option value="2">여행객</option>
                                    </select>
                                </td>
                                <td>
                                    <label>지역 선택</label>
                                </td>
                                <td>
                                    <select
                                        name="regionCode"
                                        onChange={onChangeHandler}
                                        value={form.regionCode}
                                    >
                                        <option value="">선택</option>
                                        <option value="101">서울</option>
                                        <option value="102">경기도</option>
                                        <option value="103">인천</option>
                                        <option value="104">강원도</option>
                                        <option value="105">충청북도</option>
                                        <option value="106">충청남도</option>
                                        <option value="107">대전</option>
                                        <option value="108">세종</option>
                                        <option value="109">전라북도</option>
                                        <option value="110">전라남도</option>
                                        <option value="111">광주</option>
                                        <option value="112">경상북도</option>
                                        <option value="113">경상남도</option>
                                        <option value="114">부산</option>
                                        <option value="115">대구</option>
                                        <option value="116">울산</option>
                                        <option value="117">제주도</option>
                                    </select>
                                </td>
                                <td>
                                    <label>신청 활성화 여부</label>
                                </td>
                                <td>
                                    <select
                                        name="buddyStatus"
                                        onChange={onChangeHandler}
                                        value={form.buddyStatus}
                                    >
                                        <option value="">선택</option>
                                        <option value="Y">Y</option>
                                        <option value="N">N</option>
                                    </select>
                                </td>
                            </tr>
                            {/* <tr>
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
                            </tr> */}
                            {/* <tr>
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
                                    <select
                                        name="regionCode"
                                        onChange={onChangeHandler}
                                        value={form.regionCode}
                                    >
                                        <option value="">선택</option>
                                        <option value="101">서울</option>
                                        <option value="102">경기도</option>
                                        <option value="103">인천</option>
                                        <option value="104">강원도</option>
                                    </select>
                                </td>
                            </tr> */}
                            {/* <tr>
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
                            </tr> */}
                            <tr>
                                {/* <td>
                                    <label>게시글 내용</label>
                                </td> */}
                                <td colSpan="8">
                                    <textarea
                                        name="buddyContents"
                                        placeholder="내용을 입력하세요"
                                        onChange={onChangeHandler}
                                        rows="5" cols="40"
                                    />
                                    {imageUrl && (
                                        <div className="image-preview-container">
                                            <img
                                            src={imageUrl}
                                            alt="미리보기"
                                            className="image-preview"
                                            />
                                        </div>
                                        )}
                                </td>
                            </tr>
                                {/* <div>
                                    <div className="image-upload-container">
                                        {imageUrl && (
                                            <img
                                                src={imageUrl}
                                                alt="preview"
                                                style={{ width: "100px", height: "100px", borderRadius: "10px" }}
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
                                            className="image-upload-button"
                                            onClick={onClickImageUpload}
                                        >
                                            이미지 업로드
                                        </button>
                                    </div>
                                </div> */}
                                <tr>
                                    <td colSpan="8" className="image-upload-area">
                                        <input
                                            type="file"
                                            name="buddyImg"
                                            accept="image/jpg, image/png, image/jpeg, image/gif"
                                            onChange={onChangeImageUpload}
                                            ref={imageInput}
                                            className="image-upload-input"
                                        />
                                        <button
                                            className="image-upload-button"
                                            onClick={onClickImageUpload}
                                        >
                                            이미지 업로드
                                        </button>
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