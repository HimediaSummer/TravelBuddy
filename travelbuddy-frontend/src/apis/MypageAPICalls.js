import { putProfile, getProfile } from '../modules/mypage/MyProfileModule';

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
