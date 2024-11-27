import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import{callMyProfileAPI,updateProfileAPI } from '../../../apis/MypageAPICalls.js';

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
        console.log("Redux에서 가져온 profile:", profile);
        if (profile) {
            const FormData = {
                memberName: profile[0].memberName || "",
                memberFullName: profile[0].memberFullName || "",
                memberEmail: profile[0].memberEmail || "",
                memberPhone: profile[0].memberPhone || "",
                profileImg: null,
            };
            console.log("기존 formData:", FormData); // formData 상태 확인
            setFormData(FormData);
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


    console.log("Input name시험을망쳤어 오 집에가기싫었어:", name); // 어떤 input 필드인지 확인
    console.log("Input value시험을망쳤어 오 집에가기싫었어:", value); // 입력된 값 확인
    console.log("Input files시험을망쳤어 오 집에가기싫었어:", files); // 파일 입력 여부 확인

        if (files) {
            const profileImg = files[0];
            const allowedExtensions = ["png", "jpg", "jpeg"];
            const fileExtension = profileImg.name.split(".").pop().toLowerCase();
    
            console.log("Uploaded file시험을망쳤어 오 집에가기싫었어:", profileImg);

            if (!allowedExtensions.includes(fileExtension)) {
                alert("이미지는 .png, .jpg, .jpeg만 가능합니다.");
                e.target.value = null;
                return;
            }
            if (profileImg.size > 1048576) {
                alert("이미지는 최대 1MB까지 첨부 가능합니다.");
                e.target.value = null;

                
                return;
            }
    
            setFormData((prevFormData) => {
                const updatedFormData = {
                    ...prevFormData,
                    profileImg,
                };
                console.log("Updated formData after file upload시험을망쳤어 오 집에가기싫었어:", updatedFormData); // 업데이트된 상태 확인
                return updatedFormData;
        });
        } else {
           // 텍스트 입력일 경우
            setFormData((prevFormData) => {
                const updatedFormData = {
                    ...prevFormData,
                    [name]: value, // name 속성을 키로 사용
                };
                console.log("Updated formData after text input시험을망쳤어 오 집에가기싫었어:", updatedFormData); // 업데이트된 상태 확인
                return updatedFormData;
            });
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key !== "profileImg" && formData[key]) {
                data.append(key, formData[key]);
            }
        });
        if (formData.profileImg) {
            data.append("profileImg", formData.profileImg);
        } else if (profile.memberImg) {
            data.append("profileImg", profile.memberImg);
        } else {
            data.append("profileImg", "default.png");
        }

        dispatch(updateProfileAPI(data, navigate));
        
    };

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h3>회원 정보 수정</h3>
            <form onSubmit={handleUpdate}>
                <label>
                    아이디:
                    <input
                        type="text"
                        name="memberName"
                        value={formData.memberName || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    이름:
                    <input
                        type="text"
                        name="memberFullName"
                        value={formData.memberFullName || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    이메일:
                    <input
                        type="email"
                        name="memberEmail"
                        value={formData.memberEmail || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    전화번호:
                    <input
                        type="text"
                        name="memberPhone"
                        value={formData.memberPhone || ""}
                        onChange={handleChange}
                    />
                </label>
                <br />
                <label>
                    이미지:
                    <input
                        type="file"
                        name="profileImg"
                        accept="image/*"
                        onChange={handleChange}
                    />
                    <br />
                    <small>이미지는 최대 1MB까지 첨부 가능합니다. (.png, .jpg, .jpeg만 허용)</small>
                    {previewImage ? (
                        <img src={previewImage} alt="Profile Preview" style={{ width: "100px", height: "100px" }} />
                    ) : profile.memberImg && (
                        <img src={profile.memberImg} alt="Profile" style={{ width: "100px", height: "100px" }} />
                    )}
                </label>
                <br />
                <button type="submit">수정완료</button>
                <button type="button" onClick={() => navigate('/mypage/myprofile')}>취소</button>
            </form>
        </div>
    );
}

export default MyPutProfile;













// function MyPutProfile() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true); 
//     const [profile, setProfile] = useState({});
//     const [formData, setFormData] = useState({
//         memberName: "",
//         memberFullName: "",
//         memberEmail: "",
//         memberPhone: "",
//         profileImg: null,
//     });
//     const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기

//     // 데이터 가져오기
//     useEffect(() => {
//         async function fetchProfile() {
//             try {
//                 const response = await fetch('/mypage/myprofile');
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 const responseData = await response.json();
//                 console.log("Fetched profile data:", responseData);

//                 const data = responseData.data[0]; // 첫 번째 데이터만 추출
//                 setProfile(data);
//                 setFormData({
//                     memberName: data.memberName || "",
//                     memberFullName: data.memberFullName || "",
//                     memberEmail: data.memberEmail || "",
//                     memberPhone: data.memberPhone || "",
//                     profileImg: null,
//                 });
//                 setLoading(false);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//         }

//         fetchProfile();
//     }, []);

//     useEffect(() => {
//         if (formData.profileImg) {
//             const preview = URL.createObjectURL(formData.profileImg);
//             setPreviewImage(preview);
//             return () => URL.revokeObjectURL(preview);
//         } else {
//             setPreviewImage(null);
//         }
//     }, [formData.profileImg]);

//     if (loading) {
//         return <p>Loading...</p>;
//     }

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         const profileImg = e.target.files[0];
//         if (profileImg) {
//             const allowedExtensions = ["png", "jpg", "jpeg"];
//             const fileExtension = profileImg.name.split(".").pop().toLowerCase();
//             if (!allowedExtensions.includes(fileExtension)) {
//                 alert("이미지는 .png, .jpg, .jpeg만 가능합니다.");
//                 e.target.value = null;
//                 return;
//             }
//             if (profileImg.size > 1048576) {
//                 alert("이미지는 최대 1MB까지 첨부 가능합니다.");
//                 e.target.value = null;
//                 return;
//             }
//             setFormData((prevFormData) => ({
//                 ...prevFormData,
//                 profileImg,
//             }));
//         }
//     };

//     const handleUpdate = (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         Object.keys(formData).forEach((key) => {
//             if (key !== "profileImg" && formData[key]) {
//                 data.append(key, formData[key]);
//             }
//         });
//         if (formData.profileImg) {
//             data.append("profileImg", formData.profileImg);
//         } else {
//             data.append("profileImg", profile.memberImg || "default.png");
//         }

//         fetch('/mypage/updatemyprofile', {
//             method: "PUT",
//             body: data,
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to update profile");
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 alert("회원정보가 수정되었습니다.");
//                 navigate('/mypage');
//             })
//             .catch((error) => console.error("Error updating profile:", error));
//     };

//     return (
//         <div>
//             <h3>회원 정보 수정</h3>
//             <form onSubmit={handleUpdate}>
//                 <label>
//                     아이디:
//                     <input
//                         type="text"
//                         name="memberName"
//                         value={formData.memberName || ""}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     이름:
//                     <input
//                         type="text"
//                         name="memberFullName"
//                         value={formData.memberFullName || ""}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     이메일:
//                     <input
//                         type="email"
//                         name="memberEmail"
//                         value={formData.memberEmail || ""}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     전화번호:
//                     <input
//                         type="text"
//                         name="memberPhone"
//                         value={formData.memberPhone || ""}
//                         onChange={handleInputChange}
//                     />
//                 </label>
//                 <br />
//                 <label>
//                     이미지:
//                     <input
//                         type="file"
//                         name="profileImg"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                     />
//                     <br />
//                     <small>이미지는 최대 1MB까지 첨부 가능합니다. (.png, .jpg, .jpeg만 허용)</small>
//                     {previewImage ? (
//                         <img src={previewImage} alt="Profile Preview" style={{ width: "100px", height: "100px" }} />
//                     ) : profile.memberImg && (
//                         <img src={profile.memberImg} alt="Profile" style={{ width: "100px", height: "100px" }} />
//                     )}
//                 </label>
//                 <br />
//                 <button type="submit">수정완료</button>
//                 <button type="button" onClick={() => navigate('/mypage/myprofile')}>취소</button>
//             </form>
//         </div>
//     );
// }

// export default MyPutProfile;