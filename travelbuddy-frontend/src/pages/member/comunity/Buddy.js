import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import BuddiesCSS from "./Buddies.css";

import { callBuddiesListAPI, callSearchBuddyListAPI, callBuddyRegionAPI } from "../../../apis/BuddyAPICalls";

function Buddies() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const buddy = useSelector((state) => state.buddiesReducer) || {};
	console.log("buddy에 뭐가 담김?", buddy)

    const buddyList = buddy.data || {};
	console.log("buddyList에 뭐가 담김?", buddyList)
    const pageInfo = buddy.pageInfo || {};

    // const region = useSelector(state => state.regionBuddyTypeReducer) || {};
    // console.log("region에 뭐가 담김? ", region);

    // const regionList = region.data || {};
    // console.log("regionList에 뭐가 담김?", regionList);


    // const { data = {}, pageInfo = {} } = buddyList;
    // console.log("한번에 하나만 담기나?", data);

    // const [start, setStart] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageEnd, setPageEnd] = useState(1);
    const [filteredBuddyList, setFiterBuddyList] = useState([]);
    // const [regionMap, setRegionMap] = useState({});

    

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        // setStart((currentPage - 1) * 5);
        dispatch(
			callBuddiesListAPI({ 
				currentPage
			})
		);
    }, [currentPage, dispatch]);

    // useEffect(() => {
    //     const fetchRegion = async () => {
    //         try {
    //             const response = await dispatch(callBuddyRegionAPI());
    //             const mappedRegion = response.reduce((acc, item) => {
    //                 acc[item.regionCode] = item.regionName;
    //                 return acc;
    //             }, {});
    //             setRegionMap(mappedRegion);
    //             console.log("mappedRegion", mappedRegion);
    //         } catch(error) {
    //             console.error("Region 유형 데이터 로드 오류", error);
    //         }
    //     };
    //     fetchRegion();
    // },[]);

    // useEffect(() => {
    //     console.log("regionList 업데이트 됨 : ", regionList);
    //     if (Array.isArray(regionList)) {
    //         setFiterRegionList(regionList);
    //     }else if (Array.isArray(regionList.data)) {
    //         setFiterRegionList(regionList.data);
    //     }
    // }, [regionList]);

    // 디버깅을 위한 useEffect
    // useEffect(() => {
    //     console.log("filteredRegionList 업데이트됨 : ", filteredRegionList);
    // }, [filteredRegionList]);


    const onClickTableTr = (buddyCode) => {
        navigate(`/cm/buddyDetail/${buddyCode}`, { replace: false });
    };

    const onClickBuddyRegist = () => {
        navigate("/cm/buddyRegist", {replace: false})
    };

    const [search, setSearch] = useState("");

    // useEffect(() => {
    //     if (!search.trim()) {
    //         dispatch(callSearchBuddyListAPI({ currentPage: currentPage }));
    //     }
    // }, [currentPage, dispatch]);

    // const onClickSearch = async () => {
    //     if (search.trim()) {
    //         try {
    //             // 검색 API 호출 결과를 기다림
    //             const searchResult = await dispatch(callSearchBuddyListAPI(search));
                
    //             // 검색 후 페이지 초기화
    //             setCurrentPage(1);
    //         } catch (error) {
    //             console.error("검색 중 오류 발생:", error);
    //         }
    //     }
    //   };

    //   const onChangeHandler = (e) => {
    //     setSearch(e.target.value);
    //     if (!e.target.value.trim()) {
    //       dispatch(callSearchBuddyListAPI({ currentPage: currentPage }));
    //   }
    //   if (e.key === 'Enter') {
    //     e.preventDefault();
    //     onClickSearch();
    // }
    // };


    return (
        <>
            <div className="BuddyContainer">
                <div className="BuddyHeader">
                    <h2>버디매칭</h2>
                </div>
                {/* <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    // onChange={onChangeHandler}
                    // onKeyDown={onChangeHandler}
                ></input>
                <button onClick={onClickSearch}>검색</button> */}
                {/* <div>
                    <label>지역 선택:</label>
                    <select onChange={(e) => setSelectedRegion(e.target.value)}>
                        <option value="">전체</option>
                        <option value="101">서울</option>
                        <option value="102">경기도</option>
                        <option value="103">인천</option>
                        <option value="104">강원도</option>
                    </select>
                    <label>버디 유형 선택:</label>
                    <select onChange={(e) => setSelectedBuddyType(e.target.value)}>
                        <option value="">전체</option>
                        <option value="1">버디</option>
                        <option value="2">여행객</option>
                    </select>
                </div> */}
                <div className="TableWrapper">
                <table >
                    <thead>
                        <tr className="tableTitle">
                            <th className="th1buddy">번호</th>
                            <th className="th2buddy">유형</th>
                            <th className="th3buddy">지역</th>
                            <th className="th4buddy">제목</th>
                            <th className="th5buddy">작성자</th>
                            {/* <th>좋아요</th> */}
                            <th className="th6buddy">신청여부</th>
                            <th className="th7buddy">작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(buddyList.data) && 
                            buddyList.data.map((b) => {
                                return(
                                <tr
                                    key={b.buddyCode}
                                    onClick={() =>
                                        onClickTableTr(b.buddyCode)
                                    }
                                >
                                    <td className="td1buddy">{b.buddyCode}</td>
                                    <td className="td2buddy">{b.buddyType ?b.buddyType.buddyTypeName :'유형없음'}</td>
                                    <td className="td3buddy">{b.region ? b.region.regionName : "지역없음"}</td>
                                    <td className="td4buddy">{b.buddyTitle}</td>
                                    <td className="td5buddy">{b.account? b.account.memberName : "작성자없음"}</td>
                                    {/* <td>{b.buddyCount}</td> */}
                                    <td className="td6buddy">{b.buddyStatus}</td>
                                    <td className="td7buddy">{b.buddyCreate}</td>
                                </tr>
                            )})}
                    </tbody>

                    {/* <div className="ButtonWrapper" > */}
                        <button className="writeButton" onClick={onClickBuddyRegist}>게시글 작성</button>
                    {/* </div> */}
                </table>
                </div>

                <div className="Pagination"
                    // style={{
                    //     listStyleType: "none",
                    //     display: "flex",
                    //     justifyContent: "center",
                    // }}
                >
                    {Array.isArray(buddyList.data) && (
                        <button
                            onClick={() => setCurrentPage(currentPage - 1)}
                            disabled={currentPage === 1}
                            
                        >
                            &lt;
                        </button>
                    )}
                    {pageNumber.map((num) => (
                        <li key={num} onClick={() => setCurrentPage(num)}>
                            <button
                                style={
                                    currentPage === num
                                        ? { backgroundColor: "skyBlue" }
                                        : null
                                }
                                
                            >
                                {num}
                            </button>
                        </li>
                    ))}
                    {Array.isArray(buddyList.data) && (
                        <button
                            
                            onClick={() => setCurrentPage(currentPage + 1)}
                            disabled={
                                currentPage === pageInfo.pageEnd ||
                                pageInfo.total === 0
                            }
                        >
                            &gt;
                        </button>
                    )}
                    
                </div>
            </div>
        </>
    );
}

export default Buddies;
