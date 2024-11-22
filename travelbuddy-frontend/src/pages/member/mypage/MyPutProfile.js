import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { putProfile } from '../../../modules/mypage/MyProfileModule';

function MyPutProfile() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true); 
    const [profile, setProfile] = useState({});
    const [formData, setFormData] = useState({
        memberName: "",
        memberPassword: "",
        memberFullName: "",
        memberEmail: "",
        memberPhone: "",
        memberImg: null,
    });

    // 데이터 가져오기
    useEffect(() => {
        fetch('/mypage/myprofile')
            .then((response) => {
                
                console.log("Response status:", response.status);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {

                console.log("Fetched data 대답 대답 대답 대답 대답 대답:", data);

                if (data) {
                    setProfile(data);
                    setFormData({
                        memberName: data.memberName || "",
                        memberPassword: "", // 비밀번호는 초기화
                        memberFullName: data.memberFullName || "",
                        memberEmail: data.memberEmail || "",
                        memberPhone: data.memberPhone || "",
                        memberImg: null, // 이미지는 초기화
                    });
                }
                setLoading(false); // 로딩 완료
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    console.log('formData 이야아아아아아',formData);
    console.log('profile 이야아아아아아',profile);

    // 입력 필드 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // 파일 변경 핸들러
    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            memberImg: e.target.files[0],
        });
    };

    // 수정 요청 전송
    const handleUpdate = (e) => {
        e.preventDefault();

         // 수정하지 않은 필드는 기존 데이터(profile)의 값을 유지
        const updatedData = {
            memberName: formData.memberName && formData.memberName.trim() !== "" ? formData.memberName : profile.memberName,
            memberPassword: formData.memberPassword && formData.memberPassword.trim() !== "" ? formData.memberPassword : profile.memberPassword,
            memberFullName: formData.memberFullName && formData.memberFullName.trim() !== "" ? formData.memberFullName : profile.memberFullName,
            memberEmail: formData.memberEmail && formData.memberEmail.trim() !== "" ? formData.memberEmail : profile.memberEmail,
            memberPhone: formData.memberPhone && formData.memberPhone.trim() !== "" ? formData.memberPhone : profile.memberPhone,
            memberImg: formData.memberImg || profile.memberImg, // 이미지 파일 처리
        };

        console.log('updatedData 너빈칸이냐',updatedData);

        // FormData 객체 생성
        const data = new FormData();
        Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== undefined && updatedData[key] !== null && updatedData[key] !== "") {
                data.append(key, updatedData[key]);
            }
        });

        for (let pair of data.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        fetch('/mypage/updatemyprofile', {
            method: "PUT",
            body: data,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update profile");
                }
                return response.json();
            })
            .then(() => {
                alert("회원정보가 수정되었습니다.");
                navigate('/mypage'); 
            })
            .catch((error) => console.error("Error updating profile:", error));
    };

    return (
        <div>
            <h3>회원 정보 수정</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleUpdate}>
                    <label>
                        아이디:
                        <input
                            type="text"
                            name="memberName"
                            value={formData.memberName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        비밀번호:
                        <input
                            type="password"
                            name="memberPassword"
                            value={formData.memberPassword}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        이름:
                        <input
                            type="text"
                            name="memberFullName"
                            value={formData.memberFullName}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        이메일:
                        <input
                            type="email"
                            name="memberEmail"
                            value={formData.memberEmail}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        전화번호:
                        <input
                            type="text"
                            name="memberPhone"
                            value={formData.memberPhone}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        이미지:
                        <input
                            type="file"
                            name="memberImg"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                    </label>
                    <br/>
                    <button type="submit">수정완료</button>
                    <button type="button" onClick={() => navigate('/mypage/myprofile')}>취소</button>
                </form>
            )}
        </div>
    );
}

export default MyPutProfile;
