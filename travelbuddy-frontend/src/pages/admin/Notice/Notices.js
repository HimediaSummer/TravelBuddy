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
        console.log("faqList 업데이트 됨 :",noticeList);
        if (Array.isArray(noticeList)) {
            setFilteredNoticeList(noticeList);
      } else if (Array.isArray(noticeList.data)) {
        setFilteredNoticeList(noticeList.data);
      }
      }, [noticeList]);

      
          // 디버깅을 위한 useEffect 추가
useEffect(() => {
    console.log("filteredFaqList 업데이트됨:", filteredNoticeList);
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
         <div className={NoticeCSS.bodyDiv}>
                    <h2>공지사항</h2>
                    <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onChangeHandler}
                ></input>
                <button onClick={onClickSearch}>검색</button>
                <table className={NoticeCSS.productTable}>
                    <colgroup>
                        <col width="10%" />
                        <col width="35%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />

                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th colSpan={3}>제목</th>
                            <th>조회</th>
                            <th>작성일</th>
                            <th>상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredNoticeList) &&
                            filteredNoticeList.map((n) => (
                                <tr
                                    key={n.noticeCode}
                                    onClick={() => onClickTableTr(n.noticeCode)}
                                >
                                    <td>{n.noticeCode}</td>
                                    <td colSpan={3}>{n.noticeTitle}</td>
                                    <td>{n.noticeCount}</td>
                                    <td>{n.noticeCreate}</td>
                                    <td>
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
            <div style={{ listStyleType: "none", display: "flex" }}>
                { Array.isArray(filteredNoticeList) &&
                <button 
                    onClick={() => setCurrentPage(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className={ NoticeCSS.pagingBtn }
                >
                    &lt;
                </button>
                }
                {pageNumber.map((num) => (
                <li key={num} onClick={() => setCurrentPage(num)}>
                    <button
                        style={ currentPage === num ? {backgroundColor : 'skyblue' } : null}
                        className={ NoticeCSS.pagingBtn }
                    >
                        {num}
                    </button>
                </li>
                ))}
                { Array.isArray(filteredNoticeList) &&
                <button 
                    className={ NoticeCSS.pagingBtn }
                    onClick={() => setCurrentPage(currentPage + 1)} 
                    disabled={currentPage === pageInfo.pageEnd  || pageInfo.total == 0}
                >
                    &gt;
                </button>
                }
            </div>
            <button onClick={onClickNavigation}>작성</button>
        </>
    );
}
export default Notices;