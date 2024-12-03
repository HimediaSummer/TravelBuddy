import { putProfile, getProfile } from '../modules/MypageModule';
import { getMyBuddy} from '../modules/MypageModule';
import { getMyMatch, deleteMyMatch } from '../modules/MypageModule';
import { getSchedule, deleteSchedule } from '../modules/MypageModule';

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

            for (let [key, value] of formData.entries()) {

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

            dispatch(putProfile(data));
            alert("회원정보가 수정되었습니다.");
            navigate('/mypage/myprofile');
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };
};

// 회원탈퇴(숨김)
export const deletionProfileAPI = (navigate) => {

    return async (dispatch) => {
        try {
            if (typeof navigate !== 'function') {
                console.error('navigate가 함수가 아닙니다:', navigate);
                throw new Error('navigate가 올바르지 않습니다.');
            }

            const response = await fetch('/mypage/deletion', {
                method: "PUT",
                headers: {
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                },
            });

            // 1. 상태 코드 확인
            if (!response.ok) {
                console.error("API 호출 실패:", response.status, response.statusText);
                const errorText = await response.text();
                console.error("API 실패 응답 본문:", errorText);
                alert("회원탈퇴 요청 실패. 상태코드: " + response.status);
                return;
            }

             // 2. 응답 데이터 확인
            let data = null;
            try {
                const responseBody = await response.text();

                if (responseBody.trim()) {
                    data = JSON.parse(responseBody);
                } else {
                    console.warn("응답 본문이 비어 있습니다.");
                    data = { message: "회원탈퇴가 완료되었습니다." };
                }
            } catch (jsonError) {
                console.error("JSON 파싱 오류:", jsonError);
                throw new Error("JSON 응답을 파싱하는 동안 오류가 발생했습니다.");
            }

            // 3. 성공 처리
            alert(data.message || "회원탈퇴가 완료되었습니다.");
            navigate('/'); // 메인 페이지로 이동

            // Redux Dispatch 호출
            try {
                dispatch({ type: "USER_DELETION_SUCCESS" }); // 예시 액션
            } catch (dispatchError) {
                console.error("Redux Dispatch 중 에러 발생:", dispatchError);
                throw new Error("Redux 처리 중 문제가 발생했습니다.");
            }

        } catch (error) {
            // 5. catch 블록에서 에러 메시지 출력
            console.error("회원탈퇴 중 예기치 않은 에러 발생:", error);

            // 에러 메시지에 구체적인 정보 출력
            if (error.message) {
                alert("오류 메시지: " + error.message);
            } else {
                alert("회원탈퇴 중 문제가 발생했습니다. 다시 시도해주세요.");
            }
        }
    };

};

// 일정조회
export const callMyScheduleAPI = (currentPage = 1) => async (dispatch) => {
    try {
        const response = await fetch(`/mypage/myschedule?offset=${currentPage}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        });
        const result = await response.json();


        dispatch(getSchedule(result.data)); // Redux 상태에 데이터 저장
    } catch (error) {
        console.error("Error fetching schedule data:", error);
    }
};
// 일정삭제
export const deleteMyScheduleAPI = (selectedRows) => {
    return async (dispatch) => {
        try {
            const response = await fetch(`/mypage/myschedule/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(selectedRows),
            });

            if (!response.ok) {
                throw new Error('Failed to delete schedules');
            }

            const data = await response.json();

            dispatch(deleteSchedule(selectedRows));
            alert('일정이 삭제되었습니다.');
        } catch (error) {
            console.error('Error deleting schedules:', error);
            alert('일정 삭제 중 오류가 발생했습니다.');
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

