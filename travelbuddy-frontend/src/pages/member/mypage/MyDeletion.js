import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { deletionProfileAPI } from '../../../apis/MypageAPICalls';
import { callLogoutAPI } from "../../../apis/MemberAPICalls";
import './MyDeletion.css';

function MyDeletionProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isAgreed, setIsAgreed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCheckboxChange = () => {
        setIsAgreed(!isAgreed);
    };

    // 로그아웃 로직 가져오기 (Header.js 로직 활용)
    const logoutHandler = () => {
        window.localStorage.removeItem("accessToken"); // 토큰 삭제
        dispatch(callLogoutAPI()); // 로그아웃 API 호출
        alert("로그아웃이 되어 메인화면으로 이동합니다.");
        navigate("/", { replace: true });
        window.location.reload(); // 새로고침
    };

    const handleDeleteAccount = () => {
        if (!isAgreed) {
            alert("회원탈퇴 시 처리사항 안내를 확인하고 동의해주세요.");
            return;
        }

        if (isSubmitting) return; // 중복 클릭 방지
        setIsSubmitting(true);

        // 탈퇴 API 호출 후 로그아웃 처리
        dispatch(deletionProfileAPI(navigate)) // navigate 전달
            .then(() => {
                alert("탈퇴 되었습니다.");
                logoutHandler();
            })
            .catch((error) => {
                console.error("회원탈퇴 처리 중 에러:", error);
                alert("회원탈퇴 중 문제가 발생했습니다.");
            })
            .finally(() => setIsSubmitting(false)); // 버튼 다시 활성화
    };

    return (
        <div className="deletion-page">
            <h3 className="buddy-title">회원 탈퇴</h3>
            <div className="deletion-box">
                <h4 className="deletion-subtitle">* 회원탈퇴 전, 유의사항을 확인해 주시기 바랍니다.</h4>
                <ul className="deletion-list">
                    <li>회원탈퇴 시 회원전용 웹 서비스 이용이 불가합니다.</li>
                    <li>회원님의 저장된 여행일정이 모두 삭제됩니다.</li>
                    <li>기존에 버디내역이 모두 삭제되며, 매칭중인 경우 자동 매칭 취소가 됩니다.</li>
                    <li>기존에 문의하신 1:1 문의 내역은 모두 삭제됩니다.</li>
                    <li>
                        회원탈퇴 후 문의사항 및 버디매칭 게시글에 작성된 게시글은 삭제되지 않으며<br/>
                        회원정보 삭제로 인해 작성자 본인을 확인할 수 없어 편집 및 삭제처리가 원천적으로 불가능 합니다.<br/>
                        게시글 삭제를 원하시는 경우에는 먼저 해당 게시물을 삭제하신 후 탈퇴를 신청하시기 바랍니다.<br/>
                    </li>
                </ul>
                <div className="checkbox-container">
                    <input
                        type="checkbox"
                        id="agreement"
                        checked={isAgreed}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="agreement">
                        상기 트래블버디 회원탈퇴 시 처리사항 안내를 확인하였음에 동의합니다.
                    </label>
                </div>
            </div>
            <div className="button-container">
                <button onClick={handleDeleteAccount} disabled={isSubmitting}>
                    탈퇴
                </button>
                <button type="button" onClick={() => navigate('/mypage/myprofile')}>
                    취소
                </button>
            </div>
        </div>
    );
}

export default MyDeletionProfile;
