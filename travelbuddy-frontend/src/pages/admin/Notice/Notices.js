import NoticeCSS from './NoticeCSS.css';

import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";

import { callNoticeListForAdminAPI} from "../../../apis/NoticeAPICalls";
import { appendNoticeCountAPI} from "../../../apis/NoticeAPICalls";
import { callSearchNoticeListAPI} from "../../../apis/NoticeAPICalls";

function Notices() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const notice = useSelector((state) => state.noticeReducer) || {};
    const noticeList = notice.data || {};
    const pageInfo = notice.pageInfo || {};


    
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filteredNoticeList, setFilteredNoticeList] = useState([]);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }
    useEffect(
        () => {
            dispatch(callNoticeListForAdminAPI(
                {currentPage: currentPage}
            ));
        }, [currentPage,dispatch]
    );

    useEffect(() => {

        if (Array.isArray(noticeList)) {
            setFilteredNoticeList(noticeList);
      } else if (Array.isArray(noticeList.data)) {
        setFilteredNoticeList(noticeList.data);
      }
      }, [noticeList]);

      
          // 디버깅을 위한 useEffect 추가
useEffect(() => {
  }, [filteredNoticeList]);

  const onClickSearch = async () => {
    if (search.trim()) {
        try {
            // 검색 API 호출 결과를 기다림
            const searchResult = await dispatch(callSearchNoticeListAPI(search));
            
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
      dispatch(callNoticeListForAdminAPI({ currentPage: currentPage }));
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    onClickSearch();
}
};

    // 상세페이지로 이동하면서, 조회수 카운트 올리기
    const onClickTableTr = (noticeCode) => {
        const selectNotice = noticeList.find(n => n.noticeCode === noticeCode); // 선택한 공지사항 찾기
        const appendCount = {noticeCount:selectNotice.noticeCount};
       if (selectNotice) {
            dispatch(appendNoticeCountAPI(noticeCode, appendCount)); // API 호출로 업데이트
        }
        navigate(`/admin/notices/${noticeCode}`, { replace: false }); // 상세 페이지로 이동
    };

    const onClickNavigation = () => {
      navigate(`/admin/notice`);
    };


    return (
        <>
         <div className='NoticeContainer'>
            <div className='NoticeHeader'>
                    <p>공지사항</p>
                    <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onChangeHandler}
                />
                <button onClick={onClickSearch}>검색</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th className='th1notice'>번호</th>
                            <th className='th2notice'colSpan={3}>제목</th>
                            <th className='th3notice'>조회</th>
                            <th className='th4notice'>작성일</th>
                            <th className='th5notice'>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredNoticeList) &&
                            filteredNoticeList.map((n) => (
                                <tr
                                    key={n.noticeCode}
                                    onClick={() => onClickTableTr(n.noticeCode)}
                                >
                                    <td className='td1notice'>{n.noticeCode}</td>
                                    <td className='td2notice' colSpan={3}>{n.noticeTitle}</td>
                                    <td className='td3notice'>{n.noticeCount}</td>
                                    <td className='td4notice'>{n.noticeCreate}</td>
                                    <td className='td5notice'>
                                            {n.noticeAt === "N" ? (
                                                <button>공개</button>
                                            ) : (
                                                <button>비공개</button>
                                            )}
                                        </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div className='AdminAllCSSButtonList'>
                { Array.isArray(filteredNoticeList) &&
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
                    style={
                        currentPage === num
                            ? { backgroundColor: "skyBlue" }
                            : null
                    }>
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(filteredNoticeList) &&
                <button
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
            <div className='InsertButton'>
            <button  onClick={onClickNavigation}>작성</button>
            </div>
        </>
    );
}
export default Notices;