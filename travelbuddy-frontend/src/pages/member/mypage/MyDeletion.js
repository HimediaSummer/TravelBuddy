import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { deletionProfile } from '../../../modules/mypage/MyProfileModule';

function MyDeletionProfile() {
    const navigate = useNavigate();
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profile, setProfile] = useState({});
    const [memberCode, setMemberCode] = useState(null);


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
                console.log("Fetched data 탈퇴대답:", data);
                
                if (Array.isArray(data.data) && data.data.length > 0) {
                    const extractedMemberCode = data.data[0].memberCode; 
                    setMemberCode(extractedMemberCode);
                    console.log("Extracted memberCode:", extractedMemberCode);
                } else {
                    console.error("Expected array in data.data, but found:", data.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
            });
    }, []);

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
    };

     // 탈퇴 요청 핸들러
     const handleDeleteAccount = () => {
        console.log("memberCode 값:", memberCode); // 값 확인
        if (!memberCode) {
            alert("회원 식별자가 존재하지 않습니다.");
            return;
        }

        if (!isAgreed) {
        alert("회원탈퇴 시 처리사항 안내를 확인하고 동의해주세요.");
        return;
        }

        if (isSubmitting) return; // 중복 클릭 방지
        setIsSubmitting(true);

        fetch('/mypage/deletion', {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({memberCode}),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("탈퇴 처리에 실패왜안돼왜안돼왜안돼왜안돼.");
                }
                return response.json();
            })
            .then(() => {
                alert("회원탈퇴가 완료되었습니다.");
                navigate("/"); 
            })
            .catch((error) => {
                console.error("Error deleting account:", error);
                alert("탈퇴 처리 중 문제가 발생했습니다. 다시 시도해주세요.");
            })
            .finally(() => {
                setIsSubmitting(false); // 버튼 다시 활성화
            });
    };

    return (
        <div>
            <h3>회원 탈퇴</h3>
                    <h4>*  회원탈퇴 전, 유의사항을 확인해 주시기 바랍니다.</h4>
                        <li>회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</li>
                        <li>회원님의 저장된 여행일정이 모두 삭제됩니다.</li>
                        <li>기존에 버디내역이 모두 삭제되며, 매칭중인 경우 자동 매칭 취소가 됩니다.</li>
                        <li>기존에 문의하신 1:1 문의 내역은 모두 삭제됩니다.</li>
                        <li>회원탈퇴 후 문의사항 및 버디매칭 게시글에 작성된 게시글은 삭제되지 않으며 
                            회원정보 삭제로 인해 작성자 본인을 확인할 수 없어 편집 및 삭제처리가 원천적으로 불가능 합니다.
                            게시글 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제하신 후 탈퇴를 신청하시기 바랍니다.
                        </li>
                    <div>
                        <input type="checkbox" id="agreement" checked={isAgreed} onChange={handleCheckboxChange}></input>
                        <label htmlFor="agreement">상기 트래블버디 회원탈퇴 시 처리사항 안내를 확인하였음에 동의합니다.</label>
                    </div>  
                    <br/>
                    <button onClick={handleDeleteAccount} disabled={isSubmitting}>탈퇴</button>
                    <button type="button" onClick={() => navigate('/mypage/myprofile')}>취소</button>
        </div>
    );
}
export default MyDeletionProfile;
