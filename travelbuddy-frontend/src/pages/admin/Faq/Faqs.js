import FaqsCSS from "./FaqsCSS.css";
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
                callFaqListForAdminAPI({currentPage}));
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
            <div className="FaqContainer">
            <div className='FaqHeader'>
                <p>FAQ</p>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onChangeHandler}
                ></input>
                <button onClick={onClickSearch}>검색</button>
                </div>
                <table className="AdminAllContainer">
                    <thead>
                        <tr>
                            <th className="th1faq">글 번호</th>
                            <th className="th2faq">유형</th>
                            <th className="th3faq">제목</th>
                            <th className="th4faq">은폐여부</th>
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
                                        <td className="td1faq">{f.faqCode}</td>
                                        <td className="td2faq"> {
                            // fqTypeMap에서 fqTypeCode에 해당하는 fqTypeName 찾기
                            fqTypeList.find(type => type.fqTypeCode === f.fqTypeCode)?.fqTypeName || "로딩중"
                        }</td>
                                        <td className="td3faq">{f.faqTitle}</td>
                                        <td className="td4faq">
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
                className='AdminAllCSSButtonList'
            >
                {Array.isArray(filteredFaqList) && (
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
                {Array.isArray(filteredFaqList) && (
                    <button
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
            <div className='InsertButton'>
            <button onClick={onClickNavigation}>작성</button>
            </div>
        </>
    );
}

export default Faqs;
