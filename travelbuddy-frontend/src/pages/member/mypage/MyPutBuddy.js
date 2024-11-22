import { useNavigate } from 'react-router-dom';import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { putBuddy } from "../../../modules/mypage/MyBuddyModule.js"

function MyPutBuddy() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { buddyCode } = useParams(); 
    const [buddyDetail, setBuddyDetail] = useState({});
    const [formData, setFormData] = useState({
        buddyTitle: "",
        buddyContents: "",
        regionCode: "",
        buddyTypeCode: "",
        buddyImg: null,
        buddyCreate: "",
    });

    const [regions, setRegions] = useState([]);
    const [buddyTypes, setBuddyTypes] = useState([]);

    // 데이터 로드 (게시글 상세 조회)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/mypage/mybuddy/${buddyCode}/update`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const { getBuddyDetail, regions, buddyTypes } = data.data;

                console.log("getBuddyDetailllllll:", getBuddyDetail);
                console.log("Regions from APIIIIIIII:", regions);
                console.log("BuddyTypes from APIIIIIIII:", buddyTypes);

                console.log("Fetched data:꾸짖을갈!!!!!!!", data);

                // 폼 데이터 설정
                setFormData({
                    buddyTitle: getBuddyDetail.buddyTitle,
                    buddyContents: getBuddyDetail.buddyContents,
                    regionCode: getBuddyDetail.regionCode,
                    buddyTypeCode: getBuddyDetail.buddyTypeCode,
                    buddyImg: null,
                });

                // 목록 데이터 설정
                setRegions(regions || []);
                setBuddyTypes(buddyTypes || []);

                console.log('setFormData 붙어라붙어라붙어라붙어라붙어라', formData);
                console.log('regions 너빈칸이냐', regions);
                console.log('buddyTypes 너빈칸이냐', buddyTypes);

            } catch (error) {
                console.error("Error fetching data:", error);
                alert('데이터를 불러오는 중 오류가 발생했습니다.');
            }
        };
        fetchData();
    }, [buddyCode]);

    // 입력 필드 변경 핸들러
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 파일 변경 핸들러
    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            buddyImg: e.target.files[0],
        }));
    };

    // 폼 제출 핸들러
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = new FormData();
        for (let key in formData) {
            if (formData[key] !== null && formData[key] !== "") {
                updatedData.append(key, formData[key]);
            }
        }

        try {
            const response = await fetch(`/mypage/mybuddy/${buddyCode}/update`, {
                method: "PUT",
                body: updatedData,
            });

            if (!response.ok) throw new Error("Failed to update buddy");

            alert("게시글이 수정되었습니다.");
            navigate('/mypage/mybuddy');
        } catch (error) {
            console.error("Error updating buddy:", error);
            alert("수정 중 오류가 발생했습니다.");
        }
    };

    return (
        <div>
            <h3>게시글 수정</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    제목:
                    <input
                        type="text"
                        name="buddyTitle"
                        value={formData.buddyTitle || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    내용:
                    <textarea
                        name="buddyContents"
                        value={formData.buddyContents || ""}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    지역:
                    <select
                        name="regionCode"
                        value={formData.regionCode || ""}
                        onChange={handleInputChange}
                    >
                        <option value="">선택하세요</option>
                        {regions && regions.length > 0 && regions.map((region) => (
                            <option key={region.regionCode} value={region.regionCode}>
                                {region.regionName}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    버디 유형:
                    <select
                        name="buddyTypeCode"
                        value={formData.buddyTypeCode || ""}
                        onChange={handleInputChange}
                    >
                        <option value="">선택하세요</option>
                        {buddyTypes && buddyTypes.length > 0 && buddyTypes.map((type) => (
                            <option key={type.buddyTypeCode} value={type.buddyTypeCode}>
                                {type.buddyTypeName}
                            </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    이미지:
                    <input
                        type="file"
                        name="buddyImg"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </label>
                <br />
                <button type="submit">수정 완료</button>
                <button type="button" onClick={() => navigate('/mypage/mybuddy')}>
                    취소
                </button>
            </form>
        </div>
    );
}
export default MyPutBuddy;