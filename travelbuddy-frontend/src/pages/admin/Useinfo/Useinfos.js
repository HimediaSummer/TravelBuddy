import UseinfoCSS from './UseinfoCSS.css';

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { callUseinfoListForAdminAPI } from "../../../apis/UseinfoAPICalls";
import { appendUseinfoCountAPI } from "../../../apis/UseinfoAPICalls";
import { callSearchUseinfoListAPI } from "../../../apis/UseinfoAPICalls";

function Useinfos() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const useinfo = useSelector((state) => state.useinfoReducer) || {};
    const useinfoList = useinfo.data || {};
    const pageInfo = useinfo.pageInfo || {};

    // state 관리
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filteredUseinfoList, setFilteredUseinfoList] = useState([]);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }


    // UserEffect ( 3개 ) / 전체 리스트를 페이지에 맞게 불러온다.
    useEffect(
        () => {
            dispatch(callUseinfoListForAdminAPI(
                {currentPage: currentPage}
            ));
        }, [currentPage,dispatch]
    );

    useEffect(() => {
        if (Array.isArray(useinfoList)) {
            setFilteredUseinfoList(useinfoList);
      } else if (Array.isArray(useinfoList.data)) {
        setFilteredUseinfoList(useinfoList.data);
      }
      }, [useinfoList]);

      
    // 디버깅을 위한 useEffect 추가
    useEffect(() => {
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
      dispatch(callUseinfoListForAdminAPI({ currentPage: currentPage }));
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
    navigate(`/admin/useinfos/${useinfoCode}`, { replace: false }); // 상세 페이지로 이동
};

// 작성하기 버튼
    const onClickNavigation = () => {
        navigate(`/admin/useinfo`);
    };


    return (
        <>
         <div className="UseinfoContainer">
            <div className='UseinfoHeader'>
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
                <table className={UseinfoCSS.productTable}>
                    <thead>
                        <tr>
                            <th className='th1useinfo'>번호</th>
                            <th className='th2useinfo' colSpan={3}>제목</th>
                            <th className='th3useinfo'>조회</th>
                            <th className='th4useinfo'>작성일</th>
                            <th className='th5useinfo'>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredUseinfoList) &&
                            filteredUseinfoList.map((u) => (
                                <tr
                                    key={u.useinfoCode}
                                    onClick={() => onClickTableTr(u.useinfoCode)}
                                >
                                    <td className='td1useinfo'>{u.useinfoCode}</td>
                                    <td className='td2useinfo' colSpan={3}>{u.useinfoTitle}</td>
                                    <td className='td3useinfo'>{u.useinfoCount}</td>
                                    <td className='td4useinfo'>{u.useinfoCreate}</td>
                                    <td className='td5useinfo'>{u.useinfoAt === "N" ? (
                                                <button>공개</button>
                                            ) : (
                                                <button>비공개</button>
                                            )}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className='AdminAllCSSButtonList'>
                { Array.isArray(filteredUseinfoList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ UseinfoCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'skyblue' } : null}
                        className={ UseinfoCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(filteredUseinfoList) &&
                <button 
                    className={ UseinfoCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
            <div className='InsertButton'>
            <button onClick={onClickNavigation}>작성</button>
            </div>
        </>
    );
}
export default Useinfos;