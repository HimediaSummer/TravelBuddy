import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Schedule from './components/products/Schedule';
import Main from './components/products/Main';
import Members from './pages/admin/Member/Members';
import MemberDetail from './pages/admin/Member/MemberDetail';
import MyPage from './pages/member/mypage/Mypage';
import MypageBuddyList from './components/products/MypageBuddyList';
import Notice from './pages/admin/Notice/Notice';
import Notices from './pages/admin/Notice/Notices';
import NoticeDetail from './pages/admin/Notice/NoticeDetail';
import MyNotices from './pages/member/notice/MyNotices';
import MyNoticeDetail from './pages/member/notice/MyNoticeDetail';
import Qnas from './pages/admin/Qna/Qnas';
import QnaDetail from './pages/admin/Qna/QnaDetail ';
import Faq from './pages/admin/Faq/Faq';
import Faqs from './pages/admin/Faq/Faqs';
import FaqDetail from './pages/admin/Faq/FaqDetail';
import Useinfo from './pages/admin/Useinfo/Useinfo';
import Useinfos from './pages/admin/Useinfo/Useinfos';
import UseinfoDetail from './pages/admin/Useinfo/UseinfoDetail';
import MyFaqs from './pages/member/faq/MyFaqs';
import MyQnas from './pages/member/qna/MyQnas';
import MyQna from './pages/member/qna/MyQna';
import MyQnaDetail from './pages/member/qna/MyQnaDetail';
import MyUseinfos from './pages/member/useinfo/MyUseinfos';
import MyUseinfoDetail from './pages/member/useinfo/MyUseinfoDetail';
import Mypage from './pages/member/mypage/Mypage';
import MyProfile from './pages/member/mypage/MyProfile';
import MyPutProfile from './pages/member/mypage/MyPutProfile';
import MyDeletion from './pages/member/mypage/MyDeletion';
import MyBuddy from './pages/member/mypage/MyBuddy';
import MyBuddyDetail from './pages/member/mypage/MyBuddyDetail';
import MyPutBuddy from './pages/member/mypage/MyPutBuddy';
import MySchedule from './pages/member/mypage/MySchedule';
import MyScheduleDetail from './pages/member/mypage/MyScheduleDetail';
import AdminLayout from './layouts/AdminLayout';
import CmLayout from './layouts/CmLayout';
import CsLayout from './layouts/CsLayout';

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* React에서 보여줄 화면 주소(URL) 정하는곳 */}
        {/* 자세한건 Schedule으로 이동바람 (컨트롤 좌클릭)  */}
        <Route path="/">
          <Route index element={ <Main/> }/>          
          <Route path="Schedule" element={ <Schedule /> }/>   

          {/*ADMIN 페이지*/}
          <Route path="admin" element={ <AdminLayout /> }>
            <Route index element= {<Notices/>}/>
            <Route path="notices" element={<Notices />}/>
            <Route path="notices/:noticeCode" element={<NoticeDetail />}/>
            <Route path="notice" element={<Notice />}/>
            <Route path="members" element={ <Members/> }/>
            <Route path="members/:memberCode" element={ <MemberDetail/>} />
            <Route path="qnas" element={ <Qnas/> }/>
            <Route path="qnas/:qnaCode" element={ <QnaDetail/>} />
            <Route path="faqs" element={ <Faqs/> }/>
            <Route path="faqs/:faqCode" element={ <FaqDetail/> }/>
            <Route path="faq" element={ <Faq/> }/>
            <Route path="useinfos" element={<Useinfos />}/>
            <Route path="useinfos/:useinfoCode" element={<UseinfoDetail />}/>
            <Route path="useinfo" element={<Useinfo />}/>
          </Route>

          {/* CM 커뮤니티 페이지 */}
          <Route path="cm" element={<CmLayout/>}>
            <Route index element={<MyNotices/>}/>
            <Route path="mynotices" element={<MyNotices />}/>
            <Route path="mynotices/:noticeCode" element={<MyNoticeDetail />}/>
            <Route path="myuseinfos" element={<MyUseinfos />}/>
            <Route path="myuseinfos/:useinfoCode" element={<MyUseinfoDetail />}/>
          </Route>

          {/* CS 페이지 */}
          <Route path="cs" element={<CsLayout/>}>
            <Route index element={ <MyFaqs/> }/>
            <Route path="myFaqs" element={ <MyFaqs/> }/>
            <Route path="myQnas" element={ <MyQnas/> }/>
            <Route path="myQnas/:qnaCode" element={ <MyQnaDetail/>} />
            <Route path="myQna" element={ <MyQna/> }/>
          </Route>

          <Route path="MyPage" element={<MyPage />}>
            <Route path="MyBuddyList" element={<MypageBuddyList />} />
          </Route>          
          {/* Mypage */}
          <Route path="/mypage" element={<Mypage />}>
            <Route path="/mypage/myProfile" element={<MyProfile />} />
            <Route path="/mypage/updateMyProfile" element={<MyPutProfile />} />
            <Route path="/mypage/deletion" element={<MyDeletion />} />
            <Route path="/mypage/myBuddy" element={<MyBuddy />} />
            <Route path="/mypage/myBuddy/:buddyCode" element={<MyBuddyDetail />} />
            <Route path="/mypage/myBuddy/:buddyCode/update" element={<MyPutBuddy />} />
            <Route path="/mypage/mySchedule" element={<MySchedule />} />
            <Route path="/mypage/mySchedule/:scheCode" element={<MyScheduleDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
