import MyUseinfoCSS from './MyUseinfoCSS.css';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callUseinfoListAPI } from "../../../apis/UseinfoAPICalls";
import { appendUseinfoCountAPI } from "../../../apis/UseinfoAPICalls";
import { callSearchUseinfoListAPI } from "../../../apis/UseinfoAPICalls";

function MyUseinfos() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const useinfo = useSelector((state) => state.useinfoReducer) || {};
    const useinfoList = useinfo.data || {};
    const pageInfo = useinfo.pageInfo || {};

  // state 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filteredUseinfoList, setFilteredUseinfoList] = useState([]);

    // 페이지정보
    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    // UserEffect ( 3개 ) / 전체 리스트를 페이지에 맞게 불러온다.
    useEffect(
        () => {
            dispatch(callUseinfoListAPI(
                {currentPage: currentPage}
            ));
        }, [currentPage,dispatch]
    );

    useEffect(() => {
        console.log("UseinfoList 업데이트 됨 :",useinfoList);
        if (Array.isArray(useinfoList)) {
            setFilteredUseinfoList(useinfoList);
      } else if (Array.isArray(useinfoList.data)) {
        setFilteredUseinfoList(useinfoList.data);
      }
      }, [useinfoList]);

      
    // 디버깅을 위한 useEffect 추가
    useEffect(() => {
        console.log("filteredFaqList 업데이트됨:", filteredUseinfoList);
    }, [filteredUseinfoList]);


    // 검색 버튼을 누르면 검색에 해당하는 리스트를 불러온다. 이벤트 2종, 엔터+클릭
  const onClickSearch = async () => {
    if (search.trim()) {
        try {
            // 검색 API 호출 결과를 기다림
            const searchResult = await dispatch(callSearchUseinfoListAPI(search));
            
            // 검색 후 페이지 초기화
            setCurrentPage(1);
        } catch (error) {
            console.error("검색 중 오류 발생:", error);
        }
    }
  };

//   search 창의 value 를 쫒는다.
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
    if (!e.target.value.trim()) {
      dispatch(callUseinfoListAPI({ currentPage: currentPage }));
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    onClickSearch();
}
};

// 상세페이지로 이동하면서, 조회수 카운트 올리기
const onClickTableTr = (useinfoCode) => {
    const selectUseinfo = useinfoList.find(n => n.useinfoCode === useinfoCode); // 선택한 공지사항 찾기
    const appendCount = {useinfoCount:selectUseinfo.useinfoCount};
   if (selectUseinfo) {
        dispatch(appendUseinfoCountAPI(useinfoCode, appendCount)); // API 호출로 업데이트
    }
    navigate(`/cm/myuseinfos/${useinfoCode}`, { replace: false }); // 상세 페이지로 이동
};


    return (
        <>
         <div className="MyUseinfoContainer">
            <div className='MyUseinfoHeader'>
                <p>사용설명서</p>
                    <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onChangeHandler}
                ></input>
                <button onClick={onClickSearch}>검색</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className='th1myuseinfo'>번호</th>
                            <th className='th2myuseinfo'>제목</th>
                            <th className='th3myuseinfo'>조회</th>
                            <th className='th4myuseinfo'>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(useinfoList) &&
                            useinfoList.map((u) => (
                                <tr
                                    key={u.useinfoCode}
                                    onClick={() => onClickTableTr(u.useinfoCode)}
                                >
                                    <td className='td1myuseinfo'>{u.useinfoCode}</td>
                                    <td className='td2myuseinfo'>{u.useinfoTitle}</td>
                                    <td className='td3myuseinfo'>{u.useinfoCount}</td>
                                    <td className='td4myuseinfo'>{u.useinfoCreate}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className='AdminAllCSSButtonList'>
                { Array.isArray(useinfoList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'skyblue' } : null}
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(useinfoList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
        </>
    );
}
export default MyUseinfos;