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
        regionName: "",
        buddyTypeName: "",
        buddyImg: null,
        buddyCreate: "",
    });

    const [regions, setRegions] = useState([]);
    const [buddyTypes, setBuddyTypes] = useState([]);

    // 데이터 가져오기
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. 게시글 데이터 가져오기
                const [buddyResponse, regionResponse, buddyTypeResponse] = await Promise.all([
                    fetch(`/mypage/mybuddy/${buddyCode}`),
                    fetch(`/api/regions`),
                    fetch(`/api/buddytypes`),
                ]);

                if (!buddyResponse.ok || !regionResponse.ok || !buddyTypeResponse.ok) {
                    throw new Error("Failed to fetch data from one or more APIs");
                }

                const buddyData = await buddyResponse.json();
                const regionData = await regionResponse.json();
                const buddyTypeData = await buddyTypeResponse.json();
                const buddyDetail = buddyData.data.getBuddyDetail;

    
                 // 상태 업데이트
                setFormData({
                    buddyTitle: buddyData.data.getBuddyDetail.buddyTitle || "",
                    buddyContents: buddyData.data.getBuddyDetail.buddyContents || "",
                    regionName: buddyData.data.getBuddyDetail.regionName || "",
                    buddyTypeName: buddyData.data.getBuddyDetail.buddyTypeName || "",
                    buddyImg: buddyData.data.getBuddyDetail.buddyImg || "",
                    buddyCreate: null,
                });
                setRegions(regionData); // 지역 목록 업데이트
                setBuddyTypes(buddyTypeData); // 버디 유형 목록 업데이트
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchData();
    }, [buddyCode]);




    // useEffect(
    //     () => {
    //         fetch(`/mypage/mybuddy/${buddyCode}`)
    //         .then((response) => {
    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }
    //             return response.json();
    //         })   
    //         .then((data) => {
    //             console.log('Fetched Data:', data);
    //             console.log("getBuddyDetail111111111:", data.data.getBuddyDetail);
    //             console.log("data.data.buddyTitle:", data.data.getBuddyDetail.buddyTitle);

    //             // setBuddyDetail(data.data.getBuddyDetail || {}); 

    //             console.log("Before setting formData22222222222222:", data.data.getBuddyDetail);
                                                    
    //             setFormData({
    //                 buddyTitle: data.data.getBuddyDetail.buddyTitle || "",
    //                 buddyContents: data.data.getBuddyDetail.buddyContents || "",
    //                 regionName: data.data.getBuddyDetail.regionName || "",
    //                 buddyTypeName: data.data.getBuddyDetail.buddyTypeName || "",
    //                 buddyImg: data.data.getBuddyDetail.buddyImg || "",
    //                 buddyCreate: null,
    //             });
    //             console.log('setBuddyDetail 발동', data.data);
    //             console.log('Fetched Data:야ㅑㅑㅑㅑㅑㅑㅑㅑ', FormData);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching buddy:', error);
    //         });
    // }, [buddyCode]);

    console.log('formData 버럭코',formData);
    console.log('buddyDetail 꾸짖을갈',buddyDetail);

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
            buddyImg: e.target.files[0],
        });
    };

    // 수정 요청 전송
    const handleUpdate = (e) => {
        e.preventDefault();

         // 유효성 검사: 필수 필드가 모두 비어 있으면 수정 불가
        if (
            !formData.buddyTitle.trim() ||
            !formData.buddyContents.trim() ||
            !formData.regionName.trim() ||
            !formData.buddyTypeName.trim()
        ) {
            alert("내용을 입력하세요.");
            return; // 수정 요청 중단
        }

        // FormData 생성
        const updatedData = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null && formData[key] !== "") {
                updatedData.append(key, formData[key]);
            }
        });
        
         // 수정하지 않은 필드는 기존 데이터(buddy)의 값을 유지
        //  const updatedData = {
        //     buddyTitle: formData.buddyTitle && formData.buddyTitle.trim() !== "" ? formData.buddyTitle : buddyDetail.buddyTitle,
        //     buddyContents: formData.buddyContents && formData.buddyContents.trim() !== "" ? formData.buddyContents : buddyDetail.buddyContents,
        //     buddyTypeName: formData.buddyTypeName && formData.buddyTypeName.trim() !== "" ? formData.buddyTypeName : buddyDetail.buddyTypeName,
        //     regionName: formData.regionName && formData.regionName.trim() !== "" ? formData.regionName : buddyDetail.regionName,
        //     buddyImg: formData.buddyImg || buddyDetail.buddyImg, // 이미지 파일 처리
        //     buddyCreate: formData.buddyCreate || buddyDetail.buddyCreate, 
        // };

        console.log('updatedData 너빈칸이냐',updatedData);

        // FormData 객체 생성
        // const data = new FormData();
        // Object.keys(updatedData).forEach((key) => {
        //     if (updatedData[key] !== undefined && updatedData[key] !== null && updatedData[key] !== "") {
        //         if (key === "buddyImg" && formData.buddyImg instanceof File) {
        //             // 파일 데이터가 있을 경우에만 추가
        //             data.append("buddyImg", formData.buddyImg);
        //         } else if (key !== "buddyImg") {
        //             // 일반 데이터 추가
        //             data.append(key, updatedData[key]);
        //         }
        //     }
        // });

        for (let pair of updatedData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        // 수정 요청
        fetch(`/mypage/mybuddy/${buddyCode}/update`, {
            method: "PUT",
            body: updatedData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to update buddy");
                }
                return response.json();
            })
            .then(() => {
                alert("게시글이 수정되었습니다.");
                navigate('/mypage/mybuddy'); 
            })
            .catch((error) => {
                console.error("Error updating buddy우쒸:", error);
                alert("수정 중 오류가 발생했습니다.");
            });
    };

    return (
        <div>
            <h3>게시글 수정</h3>
            <form onSubmit={handleUpdate}>
                    <label>
                        제목:
                        <input
                            type="text"
                            name="buddyTitle"
                            value={formData.buddyTitle || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        내용:
                        <input
                            type="text"
                            name="buddyContents"
                            value={formData.buddyContents || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        지역:
                        <input
                            type="text"
                            name="regionName"
                            value={formData.regionName || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        버디유형:
                        <input
                            type="text"
                            name="buddyTypeName"
                            value={formData.buddyTypeName || ""}
                            onChange={handleInputChange}
                        />
                    </label>
                    <br/>
                    <label>
                        이미지:
                        <input
                            type="file"
                            name="buddyImg"
                            accept="image/*"
                            onChange={handleFileChange || ""}
                        />
                    </label>
                    <br/>
                    <button type="submit">수정완료</button>
                    <button type="button" onClick={() => navigate('/mypage/mybuddy')}>취소</button>
                </form>
        </div>
    );
}

export default MyPutBuddy;

