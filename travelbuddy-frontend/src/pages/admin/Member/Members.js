import MemberCSS from "./Members.css";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import queryString from "query-string";

import { callMemberListForAdminAPI } from "../../../apis/MemberAPICalls";
import { callSearchMemberListAPI } from "../../../apis/MemberAPICalls";

function Members() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const member = useSelector((state) => state.memberReducer) || {};
    const memberList = member.data || {};
    const pageInfo = member.pageInfo || {};

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filteredMemberList, setFilteredMemberList] = useState([]);

    const pageNumber = [];
    if (pageInfo) {
        for (let i = 1; i <= pageInfo.pageEnd; i++) {
            pageNumber.push(i);
        }
    }

    useEffect(() => {
        if (!search.trim()) {
            dispatch(callMemberListForAdminAPI({ currentPage: currentPage }));
        }
    }, [currentPage, dispatch]);

    useEffect(() => {

      if (Array.isArray(memberList)) {
        setFilteredMemberList(memberList);
    } else if (Array.isArray(memberList.data)) {
        setFilteredMemberList(memberList.data);
    }
    }, [memberList]);

    // 디버깅을 위한 useEffect 추가
useEffect(() => {
}, [filteredMemberList]);


const onClickSearch = async () => {
  if (search.trim()) {
      try {
          // 검색 API 호출 결과를 기다림
          const searchResult = await dispatch(callSearchMemberListAPI(search));
          
          // 검색 후 페이지 초기화
          setCurrentPage(1);
      } catch (error) {
          console.error("검색 중 오류 발생:", error);
      }
  }
};

    const onClickTableTr = (memberCode) => {
        navigate(`/admin/members/${memberCode}`, { replace: false });
    };

    const onChangeHandler = (e) => {
        setSearch(e.target.value);
        if (!e.target.value.trim()) {
          dispatch(callMemberListForAdminAPI({ currentPage: currentPage }));
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        onClickSearch();
    }
    };

    const clickToBuddy = () => {
        navigate(`/mypage/myBuddy`)
    };
    const clickToSchedule = () => {
        navigate(`/mypage/mySchedule`)
    };

    return (
        <>
            <div className='MemberContainer'>
            <div className='MemberHeader'>
                <p>회원</p>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onChangeHandler}
                ></input>
                <button onClick={onClickSearch}>검색</button>
                </div>
                <table className={MemberCSS.productTable}>
                    <thead>
                        <tr>
                            <th className='th1member'>번호</th>
                            <th className='th2member'>아이디</th>
                            <th className='th3member'>이름</th>
                            <th className='th4member'>이메일</th>
                            <th className='th5member'>연락처</th>
                            <th className='th6member'>버디</th>
                            <th className='th7member'>일정</th>
                            <th className='th8member'>상태</th>
                            <th className='th9member'>가입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredMemberList) &&
                            filteredMemberList.map((m) => (
                                <tr
                                    key={m.memberCode}
                                    onClick={() => onClickTableTr(m.memberCode)}
                                >
                                    <td className='td1member'>{m.memberCode}</td>
                                    <td className='td2member'>{m.memberName}</td>
                                    <td className='td3member'>{m.memberFullName}</td>
                                    <td className='td4member'>{m.memberEmail}</td>
                                    <td className='td5member'>{m.memberPhone}</td>
                                    <td className='td6member'>
                                    <button onClick={(e) => { e.stopPropagation(); clickToBuddy(); }}>버디</button>
                                    </td>
                                    <td className='td7member'>
                                    <button onClick={(e) => { e.stopPropagation(); clickToSchedule(); }}>일정</button>
                                    </td>
                                    <td className='td8member'>
                                        {m.memberSuspension === "N" &&
                                        m.memberDeletion === "N" ? (
                                            <button>정상</button>
                                        ) : m.memberSuspension === "Y" &&
                                          m.memberDeletion === "N" ? (
                                            <button>정지</button>
                                        ) : m.memberSuspension === "N" &&
                                          m.memberDeletion === "Y" ? (
                                            <button>탈퇴</button>
                                        ) : (
                                            <button>없음</button>
                                        )}
                                    </td>
                                    <td className='td9member'>{m.memberCreate}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div  className='AdminAllCSSButtonList'>
                {Array.isArray(filteredMemberList) && (
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
                                    ? { backgroundColor: "skyblue" }
                                    : null
                            }
                            className={MemberCSS.pagingBtn}
                        >
                            {num}
                        </button>
                    </li>
                ))}
                {Array.isArray(filteredMemberList) && (
                    <button
                        className={MemberCSS.pagingBtn}
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
        </>
    );
}

export default Members;
