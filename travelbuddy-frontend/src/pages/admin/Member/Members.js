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
      console.log("memberList 업데이트 됨 :",memberList);
      if (Array.isArray(memberList)) {
        setFilteredMemberList(memberList);
    } else if (Array.isArray(memberList.data)) {
        setFilteredMemberList(memberList.data);
    }
    }, [memberList]);

    // 디버깅을 위한 useEffect 추가
useEffect(() => {
  console.log("filteredMemberList 업데이트됨:", filteredMemberList);
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
            <div className={MemberCSS.bodyDiv}>
                <h2>회원</h2>
                <input
                    type="text"
                    placeholder="검색어를 입력하세요"
                    value={search}
                    onChange={onChangeHandler}
                    onKeyDown={onChangeHandler}
                ></input>
                <button onClick={onClickSearch}>검색</button>
                <table className={MemberCSS.productTable}>
                    <colgroup>
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="15%" />
                        <col width="15%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                        <col width="10%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>아이디</th>
                            <th>이름</th>
                            <th>이메일</th>
                            <th>연락처</th>
                            <th>버디</th>
                            <th>일정</th>
                            <th>상태</th>
                            <th>가입일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(filteredMemberList) &&
                            filteredMemberList.map((m) => (
                                <tr
                                    key={m.memberCode}
                                    onClick={() => onClickTableTr(m.memberCode)}
                                >
                                    <td>{m.memberCode}</td>
                                    <td>{m.memberName}</td>
                                    <td>{m.memberFullName}</td>
                                    <td>{m.memberEmail}</td>
                                    <td>{m.memberPhone}</td>
                                    <td>
                                    <button onClick={(e) => { e.stopPropagation(); clickToBuddy(); }}>버디</button>
                                    </td>
                                    <td>
                                    <button onClick={(e) => { e.stopPropagation(); clickToSchedule(); }}>일정</button>
                                    </td>
                                    <td>
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
                                            <p></p>
                                        )}
                                    </td>
                                    <td>{m.memberCreate}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            <div style={{ listStyleType: "none", display: "flex" }}>
                {Array.isArray(filteredMemberList) && (
                    <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={MemberCSS.pagingBtn}
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
