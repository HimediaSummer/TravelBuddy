import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { callMyBuddyListAPI, deleteBuddyAPI } from '../../../apis/MypageAPICalls.js';

function MyBuddy() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const buddyList = useSelector(state => state.myBuddyReducer.buddy); // Redux 상태에서 buddy 목록 가져오기
    
    const itemsPerPage = 10; // 페이지당 항목 수
    const totalItems = buddyList?.pageInfo?.total || 0; // 전체 게시글 수
    const totalPages = Math.ceil(totalItems / itemsPerPage); // 총 페이지 수 계산
    
    const [selectedRows, setSelectedRows] = useState([]); // 선택된 행
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
   

    // API로 목록 가져오기
    useEffect(() => {
        console.log("현재 페이지:", currentPage);
        dispatch(callMyBuddyListAPI(currentPage)); // 현재 페이지로 API 호출
    }, [dispatch, currentPage]);

    // 데이터 상태 확인 로그
    useEffect(() => {
        console.log("Redux 상태에서 가져온 buddyList:", buddyList);
    }, [buddyList]);

    // 전체 체크박스 선택
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            const allRowIds = buddyList.map(item => item.buddyCode);
            setSelectedRows(allRowIds);
        } else {
            setSelectedRows([]);
        }
    };

    // 개별 체크박스 선택
    const handleSelectRow = (buddyCode) => {
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = prevSelectedRows.includes(buddyCode)
                ? prevSelectedRows.filter(code => code !== buddyCode)
                : [...prevSelectedRows, buddyCode];
            return newSelectedRows;
        });
    };

    // 행 클릭 이벤트
    const handleRowClick = (buddyCode, e) => {
        if (e.target.type === 'checkbox') return; // 체크박스 클릭 시 이벤트 무시
        navigate(`/mypage/mybuddy/${buddyCode}`);
    };

    // 선택된 행 삭제
    const handleDeleteSelected = () => {
        if (selectedRows.length === 0) {
            alert("삭제할 항목을 선택해주세요.");
            return;
        }

        // API로 삭제 요청
        dispatch(deleteBuddyAPI(selectedRows)).then(() => {
            alert("삭제되었습니다.");
            setSelectedRows([]);
            dispatch(callMyBuddyListAPI(currentPage)); // 삭제 후 목록 갱신
        }).catch(error => {
            console.error("Error deleting buddy:", error);
            alert("문제가 발생했습니다. 다시 시도해주세요.");
        });
    };

    // 총 페이지 수 계산
    // const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                onChange={handleSelectAll}
                                checked={selectedRows.length === (buddyList?.data?.length || 0) && buddyList?.data?.length > 0}
                            />
                        </th>
                        <th>버디</th>
                        <th>지역</th>
                        <th>제목</th>
                        <th>작성일</th>
                        <th>상태</th>
                    </tr>
                </thead>
                <tbody>
                    {buddyList?.data?.length > 0 ? (
                        buddyList.data.map((item, index) => (
                        <tr
                            key={index}
                            onClick={(e) => handleRowClick(item.buddyCode, e)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedRows.includes(item.buddyCode)}
                                    onChange={() => handleSelectRow(item.buddyCode)}
                                />
                            </td>
                            <td>{item.buddyTypeName}</td>
                            <td>{item.regionName}</td>
                            <td>{item.buddyTitle}</td>
                            <td>{item.buddyCreate}</td>
                            <td>{item.buddyStatus}</td>
                        </tr>
                    ))
                    ) : (
                        <tr>
                            <td colSpan="6">게시글을 작성해 주세요</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={handleDeleteSelected}>삭제</button>
            <br />
            {/* 페이지네이션 */}
            <div style={{ marginTop: "20px" }}>
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    {"<"}
                </button>
                {[...Array(totalPages).keys()].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    {">"}
                </button>
            </div>
        </div>
    );
}

export default MyBuddy;









// function MyBuddy() {

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const [buddy, setBuddy] = useState([]);
//     const [selectedRows, setSelectedRows] = useState([]); // 선택된 행
//     const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
//     const [totalItems, setTotalItems] = useState(0); // 전체 게시글 수
//     const itemsPerPage = 10; // 페이지당 항목 수

//     // 데이터 가져오기
//     const fetchBuddyList = async (page) => {
//         try {
//             const response = await fetch(`/mypage/mybuddy?offset=${page}`);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();

//             // 데이터를 state에 설정
//             setBuddy(data.data.data || []); // 게시글 목록
//             setTotalItems(data.data.pageInfo.total || 0); // 전체 게시글 수
//             console.log("전체 게시글 수:", data.data.pageInfo.total);
//             console.log("현재 페이지 데이터:", data.data.data);
//         } catch (error) {
//             console.error("Error fetching buddy list:", error);
//             alert("데이터를 가져오는 중 오류뿅콩뿅콩뿅콩뿅콩뿅콩뿅콩");
//         }
//     };

//       useEffect(() => {
//         fetchBuddyList(currentPage);
//       }, [currentPage]);


//     // 전체 체크박스 선택
//     const handleSelectAll = (e) => {
//         if (e.target.checked) {
//             const allRowIds = buddy.map(item => item.buddyCode);
//             setSelectedRows(allRowIds);
//         } else {
//             setSelectedRows([]);
//         }
//     };

//     // 개별 체크박스 선택
//     const handleSelectRow = (buddyCode) => {
//         setSelectedRows(prevSelectedRows => {
//             const newSelectedRows = prevSelectedRows.includes(buddyCode)
//                 ? prevSelectedRows.filter(code => code !== buddyCode)
//                 : [...prevSelectedRows, buddyCode];

//             console.log(
//                 "Current selected rows:",
//                 buddy.filter(item => newSelectedRows.includes(item.buddyCode))
//             );
//             return newSelectedRows;
//         });
//     };

//     // 행 클릭 이벤트
//     const handleRowClick = (buddyCode, e) => {
//         if (e.target.type === 'checkbox') return; // 체크박스 클릭 시 이벤트 무시
//         navigate(`/mypage/mybuddy/${buddyCode}`);
//     };

//      // 선택된 행 삭제
//      const handleDeleteSelected = () => {
//         if (selectedRows.length === 0) {
//             alert("삭제할 항목을 선택해주세요.");
//             return;

//         }

//         // 서버에 삭제 요청 보내기
//         fetch('/mypage/mybuddy/delete', {
//             method: "DELETE",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(selectedRows), 
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("삭제 요청 실패");
//                 }
//                 return response.json();
//             })
//             .then(() => {
//                 alert("삭제되었습니다.");
//                 setBuddy(buddy.filter(item => !selectedRows.includes(item.buddyCode)));
//                 setSelectedRows([]); 
//                 console.log("Sending request with body뒤진다:", JSON.stringify(selectedRows));
//             })
//             .catch((error) => {
//                 console.error("Error deleting buddy:", error);
//                 alert("문제가 발생했습니다. 다시 시도해주세요.");
//                 console.log("Deleting buddy with IDs:욕나와", selectedRows);
//             });
//         };

//     // 총 페이지 수 계산
//     const totalPages = Math.ceil(totalItems / itemsPerPage);

//     return (
//         <div>
//             <table>
//                     <thead>
//                         <input 
//                             type="checkbox" 
//                             onChange={handleSelectAll} 
//                             checked={selectedRows.length === buddy.length && buddy.length > 0} 
//                         />
//                         <th>버디</th>
//                         <th>지역</th>
//                         <th>제목</th>
//                         <th>작성일</th>
//                         <th>상태</th>
//                     </thead>
//                     <tbody>
//                         {buddy.map((item, index) => (
//                             <tr 
//                             key={index} 
//                             onClick={(e) => handleRowClick(item.buddyCode, e)}
//                             style={{ cursor: 'pointer' }}
//                             >
//                                 <td>
//                                     <input 
//                                         type="checkbox" 
//                                         checked={selectedRows.includes(item.buddyCode)} 
//                                         onChange={() => handleSelectRow(item.buddyCode)} 
//                                     />
//                                 </td>
//                                 <td>{item.buddyTypeName}</td>
//                                 <td>{item.regionName}</td>
//                                 <td>{item.buddyTitle}</td>
//                                 <td>{item.buddyCreate}</td>
//                                 <td>{item.buddyStatus}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//             </table>
//             <button onClick={handleDeleteSelected}>삭제</button>
//             <br/>
//             {/* 페이지네이션 */}
//             <div style={{ marginTop: "20px" }}>
//                 <button
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 >
//                 {"<"}
//                 </button>
//                 {[...Array(totalPages).keys()].map((_, index) => (
//                 <button
//                     key={index}
//                     onClick={() => setCurrentPage(index + 1)}
//                     disabled={currentPage === index + 1}
//                 >
//                     {index + 1}
//                 </button>
//                 ))}
//                 <button
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 >
//                 {">"}
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default MyBuddy;

