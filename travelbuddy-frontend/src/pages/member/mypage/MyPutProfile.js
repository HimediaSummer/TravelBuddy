import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callMyProfileAPI, updateProfileAPI } from '../../../apis/MypageAPICalls.js';
import './MyPutProfile.css';

function MyPutProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const profile = useSelector((state) => state.myProfileReducer.profile);
    const [formData, setFormData] = useState({
        memberName: "",
        memberFullName: "",
        memberEmail: "",
        memberPhone: "",
        profileImg: null,
    });
    const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기

    // 회원정보 조회
    useEffect(() => {
        dispatch(callMyProfileAPI());
    }, [dispatch]);

    // Redux 상태가 변경되면 formData에 반영
    useEffect(() => {
        if (profile && profile.length > 0) {
            setFormData({
                memberName: profile[0]?.memberName || "",
                memberFullName: profile[0]?.memberFullName || "",
                memberEmail: profile[0]?.memberEmail || "",
                memberPhone: profile[0]?.memberPhone || "",
                profileImg: null,
            });
        }
    }, [profile]);

    useEffect(() => {
        if (formData.profileImg) {
            const preview = URL.createObjectURL(formData.profileImg);
            setPreviewImage(preview);
            return () => URL.revokeObjectURL(preview);
        } else {
            setPreviewImage(null);
        }
    }, [formData.profileImg]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files && files.length > 0) {
            setFormData((prevFormData) => ({ ...prevFormData, profileImg: files[0] }));
        } else {
            setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });
        dispatch(updateProfileAPI(data, navigate));
    };

    if (!profile || profile.length === 0) {
        return <p>Loading...</p>; // profile 데이터가 없으면 로딩 메시지를 표시
    }

    return (
        <div className="my-put-profile-page">
            <h3 className="buddy-title">내 정보 수정</h3>
            <div className="line">
                <div className="profile-container">
                    <div className="profile-row">
                        {/* 왼쪽 열 */}
                        <div className="profile-left">
                            {previewImage ? (
                                <img src={previewImage} alt="Profile Preview" className="profile-img" />
                            ) : (
                                <img
                                    src={profile[0]?.memberImg}
                                    alt="Profile"
                                    className="profile-img"
                                />
                            )}
                            <input
                                type="file"
                                id="profileImg"
                                name="profileImg"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                            <label htmlFor="profileImg" className="image-profile-upload-button">
                                이미지 수정
                            </label>
                        </div>
                        {/* 오른쪽 열 */}
                        <div className="profile-right">
                            <div className="profile-info">
                                <div className="info-row">
                                    <label className="info-label" htmlFor="memberName">아이디</label>
                                    <input
                                        type="text"
                                        id="memberName"
                                        name="memberName"
                                        className="info-value"
                                        value={formData.memberName || ""}
                                        onChange={handleChange}
                                        disabled
                                    />
                                </div>
                                <div className="info-row">
                                    <label className="info-label" htmlFor="memberFullName">이름</label>
                                    <input
                                        type="text"
                                        id="memberFullName"
                                        name="memberFullName"
                                        className="info-value"
                                        value={formData.memberFullName || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="info-row">
                                    <label className="info-label" htmlFor="memberEmail">이메일</label>
                                    <input
                                        type="email"
                                        id="memberEmail"
                                        name="memberEmail"
                                        className="info-value"
                                        value={formData.memberEmail || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="info-row">
                                    <label className="info-label" htmlFor="memberPhone">전화번호</label>
                                    <input
                                        type="text"
                                        id="memberPhone"
                                        name="memberPhone"
                                        className="info-value"
                                        value={formData.memberPhone || ""}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button-container">
                    <button type="submit" onClick={handleUpdate}>수정완료</button>
                    <button type="button" onClick={() => navigate('/mypage/myprofile')}>취소</button>
                </div>
            </div>
        </div>
    );
}


//             <form className="profile-form" onSubmit={handleUpdate}>
//                 <div className="profile-row">
                    
//                     {/* 왼쪽 열 */}
//                     <div className="profile-left">
//                         {previewImage ? (
//                             <img src={previewImage} alt="Profile Preview" className="profile-img" />
//                         ) : (
//                             <img
//                                 src={profile[0]?.memberImg}
//                                 alt="Profile"
//                                 className="profile-img"
//                             />
//                         )}
//                         <input
//                             type="file"
//                             id="profileImg"
//                             name="profileImg"
//                             accept="image/*"
//                             style={{ display: "none" }} // 숨기기
//                             onChange={handleChange}
//                         />
//                         <label htmlFor="profileImg" className="image-upload-button">
//                             이미지 수정
//                         </label>
//                     </div>
//                     {/* 오른쪽 열 */}
//                     <div className="profile-right">
//                         <div className="profile-info">
//                             <div className="info-row">
//                                 <label className="info-label" htmlFor="memberName">아이디</label>
//                                 <input
//                                     type="text"
//                                     id="memberName"
//                                     name="memberName"
//                                     className="info-value"
//                                     value={formData.memberName || ""}
//                                     onChange={handleChange}
//                                     disabled
//                                 />
//                             </div>
//                             <div className="info-row">
//                                 <label className="info-label" htmlFor="memberFullName">이름</label>
//                                 <input
//                                     type="text"
//                                     id="memberFullName"
//                                     name="memberFullName"
//                                     className="info-value"
//                                     value={formData.memberFullName || ""}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="info-row">
//                                 <label className="info-label" htmlFor="memberEmail">이메일</label>
//                                 <input
//                                     type="email"
//                                     id="memberEmail"
//                                     name="memberEmail"
//                                     className="info-value"
//                                     value={formData.memberEmail || ""}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="info-row">
//                                 <label className="info-label" htmlFor="memberPhone">전화번호</label>
//                                 <input
//                                     type="text"
//                                     id="memberPhone"
//                                     name="memberPhone"
//                                     className="info-value"
//                                     value={formData.memberPhone || ""}
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="button-container">
//                     <button type="submit">수정완료</button>
//                     <button type="button" onClick={() => navigate('/mypage/myprofile')}>취소</button>
//                 </div>
//             </form>
//         </div>
//     );
// }






                    {/* <label htmlFor="memberName">아이디</label>
                        <input
                            type="text"
                            name="memberName"
                            value={formData.memberName || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="memberFullName">이름</label>
                        <input
                            type="text"
                            name="memberFullName"
                            value={formData.memberFullName || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="memberEmail">이메일</label>
                        <input
                            type="email"
                            name="memberEmail"
                            value={formData.memberEmail || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                    <label htmlFor="memberPhone">전화번호</label>
                        <input
                            type="text"
                            name="memberPhone"
                            value={formData.memberPhone || ""}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profileImg">이미지</label>
                        <input
                            type="file"
                            id="profileImg"
                            name="profileImg"
                            accept="image/*"
                            onChange={handleChange}
                        />
                        {previewImage ? (
                            <img src={previewImage} alt="Profile Preview" className="profile-preview" />
                        ) : (
                            profile[0]?.memberImg && (
                                <img src={profile[0].memberImg} alt="Profile" className="profile-preview" />
                            )
                        )}
                    </div> */}
//                     <div className="button-container">
//                         <button type="submit">수정완료</button>
//                         <button type="button" onClick={() => navigate('/mypage/myprofile')}>취소</button>
//                     </div>
//             </form>
//         </div>
//     );
// }

export default MyPutProfile;