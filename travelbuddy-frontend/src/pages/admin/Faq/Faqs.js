import MyFaqsCSS from "../../member/faq/MyFaqsCSS.css";
import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { callFaqListForAdminAPI } from "../../../apis/FaqAPICalls";
import { callSearchFaqListAPI } from "../../../apis/FaqAPICalls";
import { callFqTypeNameAPI } from "../../../apis/FqTypeAPICalls";

function Faqs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const faq = useSelector((state) => state.faqReducer) || {};
    const fqType = useSelector( (state) => state.fqTypeReducer) || {};
    const fqTypeList = fqType.data || {};
    const faqList = faq.data || {};
    const { data = {}, pageInfo = {} } = faqList;

    console.log('나 또 다른 리듀서!',fqTypeList);
    console.log('나 faqList 리듀서!',faqList);


    // 상태관리
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filteredFaqList, setFilteredFaqList] = useState([]);
    const [faqTypeMap, setFaqTypeMap] = useState([]);



    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    // fAQ 목록 API 전체 리스트 호출
    useEffect(() => {
        if (!search.trim()) {
            dispatch(
                callFaqListForAdminAPI({
                    currentPage: currentPage,
                }));
        }
    }, [currentPage,dispatch]);


    useEffect(() => {
        const fetchFaqTypes = async () => {
            console.log('fqTypeMap 을 위한 여행')
            try {
                const response = await dispatch(callFqTypeNameAPI());
                console.log('나 뭐야',response);
                const mappedTypes = response.reduce((acc, item) => {
                    acc[item.fqTypeCode] = item.fqTypeName;
                    return acc;
                }, {});
                setFaqTypeMap(mappedTypes);
            } catch (error) {
                console.error("FAQ 유형 데이터 로드 오류:", error);
            }
        };
        fetchFaqTypes();
    }, [dispatch]);

    
    useEffect(() => {
        if (Array.isArray(faqList)) {
            setFilteredFaqList(faqList);
      } else if (Array.isArray(faqList.data)) {
        setFilteredFaqList(faqList.data);
      }
      console.log('필터faq리스트에 담겼나!',filteredFaqList);
      }, [faqList]);

      useEffect(() => {
        if (Array.isArray(fqTypeList)) {
            setFaqTypeMap(fqTypeList);
      } else if (Array.isArray(fqTypeList.data)) {
        setFaqTypeMap(fqTypeList.data);
      }
      console.log('faqTypeMap에 담겼나!@',faqTypeMap);
      }, [setFaqTypeMap]);

          // 디버깅을 위한 useEffect 추가
    useEffect(() => {
        console.log('updated filteredFaqList',filteredFaqList);
  }, [filteredFaqList]);

//   상태정보 확인을 위한 useEffect 추가
  useEffect(() => {
    console.log("Updated faqTypeMap:", faqTypeMap);
}, [faqTypeMap]);


  const onClickSearch = async () => {
    if (search.trim()) {
        try {
            // 검색 API 호출 결과를 기다림
            const searchResult = await dispatch(callSearchFaqListAPI(search));
            
            // 검색 후 페이지 초기화
            setCurrentPage(1);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    }
  };

  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (!e.target.value.trim()) {
      dispatch(callFaqListForAdminAPI({ currentPage: currentPage }));
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    onClickSearch();
}
};

    const onClickTableTr = (faqCode) => {
        navigate(`/admin/faqs/${faqCode}`, { replace: false });
    };

    const onClickNavigation = () => {
        navigate(`/admin/faq`);
    };


    return (
        <>
            <div className={MyFaqsCSS.bodyDiv}>
                <h2>FAQ</h2>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onChangeHandler}
                ></input>
                <button onClick={onClickSearch}>검색</button>
                <table className={MyFaqsCSS.productTable}>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="40%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>게시글 번호</th>
                            <th>유형</th>
                            <th>제목</th>
                            <th>은폐여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredFaqList) &&
                            filteredFaqList.map((f) => {
                                return (
                                    <tr key={f.faqCode}
                                    onClick={() =>
                                        onClickTableTr(f.faqCode)
                                    }>
                                        <td>{f.faqCode}</td>
                                        <td> {
                            // fqTypeMap에서 fqTypeCode에 해당하는 fqTypeName 찾기
                            faqTypeMap.find(type => type.fqTypeCode === f.fqTypeCode)?.fqTypeName || "알 수 없음"
                        }</td>
                                        <td>{f.faqTitle}</td>
                                        <td>
                                            {f.faqAt === "N" ? (
                                                <button>공개</button>
                                            ) : (
                                                <button>비공개</button>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
            <div
                style={{
                    listStyleType: "none",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {Array.isArray(filteredFaqList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={MyFaqsCSS.pagingBtn}
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
                            className={MyFaqsCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(filteredFaqList) && (
                    <button
                        className={MyFaqsCSS.pagingBtn}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={
                            currentPage === pageInfo.pageEnd ||
                            pageInfo.total == 0
                        }
                    >
                        &gt;
                    </button>
                )}
            </div>
            <button onClick={onClickNavigation}>작성</button>
        </>
    );
}

export default Faqs;
