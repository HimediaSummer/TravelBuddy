import { putProfile, getProfile } from '../modules/MypageModule';
import { getMyBuddy, deleteMyBuddy } from '../modules/MypageModule';
import { getMyMatch, deleteMyMatch } from '../modules/MypageModule';

// 회원정보부분
export const callMyProfileAPI = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('/mypage/myprofile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Fetched Data from API!!!!!!!!!!!!!!!!!!!!!!!:', data);

            if (Array.isArray(data)) {
                dispatch(getProfile(data)); // Redux 액션 디스패치
            } else if (data.data && Array.isArray(data.data)) {
                dispatch(getProfile(data.data)); // Redux 액션 디스패치
            } else {
                throw new Error('Unexpected data structure');
            }
        } catch (error) {
            console.error('Error fetching profile data:', error);
            // 에러 상태 관리가 필요하면 여기서 별도 디스패치 가능
        }
    };
};

// 회원정보 수정 API
export const updateProfileAPI = (formData, navigate) => {
    return async (dispatch) => {
        try {
            console.log("FormData to be sent:", formData);
            console.log("FormData entries열받아서오락실에들어가!!!!!!!!!:");
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value); // 모든 키와 값을 출력
            }

            const response = await fetch('/mypage/updatemyprofile', {
                method: "PUT",
                body: formData,
                headers: {
                    // 'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization:
					'Bearer ' + window.localStorage.getItem('accessToken')
                },
            });
            if (!response.ok) {
                throw new Error("Failed to update profile");
            }

            const data = await response.json();
            console.log("Updated profile data열받아서오락실에들어갔어:", data);

            dispatch(putProfile(data));
            alert("회원정보가 수정되었습니다.");
            navigate('/mypage/myprofile');
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
};

export const deletionProfileAPI = (navigate) => {

    return async (dispatch) => {
        try {
            const response = await fetch('/mypage/deletion', {
                method: "PUT",
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                },
            });

            if (!response.ok) {
                throw new Error("회원탈퇴 요청 실패!");
            }

            const data = await response.json();
            console.log("회원탈퇴 성공 응답:", data);

            alert("회원탈퇴가 완료되었습니다.");
            navigate('/'); // 메인 페이지로 이동
        } catch (error) {
            console.error("회원탈퇴 실패:", error);
            alert("회원탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
        }
    };

};





// 게시글 부분
// 내가 쓴 게시글 목록 조회 API
export const callMyBuddyListAPI = (page) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`/mypage/mybuddy?offset=${page}`, {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });

            if (!response.ok) {
                throw new Error("게시글 목록 조회 실패");
            }

            const data = await response.json();
            dispatch(getMyBuddy(data.data));
        } catch (error) {
            console.error("Error fetching buddy list:", error);
        }
    };
};

// 내가 쓴 게시글 삭제 API
export const deleteBuddyAPI = (selectedRows, callback) => {
    return async () => {
        try {
            const response = await fetch(`/mypage/mybuddy/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(selectedRows),
            });

            if (!response.ok) {
                throw new Error("게시글 삭제 실패");
            }

            return await response.json();
            callback(); // 성공 후 콜백 실행
        } catch (error) {
            console.error("Error deleting buddy:", error);
        }
    };
};

// 내가 신청한 매칭 게시글 조회 API
export const callMyMatchDetailsAPI = () => {
    return async (dispatch) => {
        try {
            const response = await fetch('/mypage/mymatch', {
                method: 'GET',
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch match details');
            }

            const data = await response.json();
            console.log('Fetched My Match Details:', data);

            dispatch(getMyMatch(data.data));
        } catch (error) {
            console.error('Error fetching match details:', error);
        }
    };
};

// 매칭 신청 취소 API
export const cancelMatchAPI = (buddyMatchCode) => {
    return async (dispatch) => {
        try {
            const response = await fetch('/mypage/mymatch', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify({ buddyMatchCode }),
            });

            if (!response.ok) {
                throw new Error('Failed to cancel match');
            }

            alert('신청이 취소되었습니다.');
            dispatch(deleteMyMatch(buddyMatchCode));
        } catch (error) {
            console.error('Error cancelling match:', error);
            alert('신청 취소 중 오류가 발생했습니다.');
        }
    };
};

