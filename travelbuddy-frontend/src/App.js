import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Schedule from './components/products/Schedule';
import Main from './components/products/Main';
import Members from './pages/admin/Member/Members';
import MemberDetail from './pages/admin/Member/MemberDetail';
import Notice from './pages/admin/Notice/Notice';
import Notices from './pages/admin/Notice/Notices';
import NoticeDetail from './pages/admin/Notice/NoticeDetail';
import MyNotices from './pages/member/notice/MyNotices';
import MyNoticeDetail from './pages/member/notice/MyNoticeDetail';
import Qnas from './pages/admin/Qna/Qnas';
import QnaDetail from './pages/admin/Qna/QnaDetail';
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
import MyPageLayout from './layouts/MyPageLayout';
import Layout from './layouts/Layout';

import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import Buddies from './pages/member/comunity/Buddy';
import BuddyDetail from './pages/member/comunity/BuddyDetail';
import BuddyRegist from './pages/member/comunity/BuddyRegist';
import FindId from './pages/member/FindId';
import FindPw from './pages/member/FindPw';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* React에서 보여줄 화면 주소(URL) 정하는곳 */}
        {/* 자세한건 Schedule으로 이동바람 (컨트롤 좌클릭)  */}
        <Route path="/">
          <Route index element={ <Main/> }/>          
          <Route path="Schedule" element={ <Schedule /> }/>   
          <Route path="Members" element={ <Members/> }/>
          <Route path="MemberDetail/:memberCode" element={ <MemberDetail/>} />
          <Route path="Qnas" element={ <Qnas/> }/>
          <Route path="QnaDetail/:qnaCode" element={ <QnaDetail/>} />
          <Route path="Faq" element={ <Faq/> }/>
          <Route path="FaqDetail/:faqCode" element={ <FaqDetail/> }/>
          <Route path="Faqs" element={ <Faqs/> }/>  //
          <Route path="MyFaqs" element={ <MyFaqs/> }/>
          <Route path="MyQnas" element={ <MyQnas/> }/>
          <Route path="MyQna" element={ <MyQna/> }/>
          <Route path="MyQnaDetail/:qnaCode" element={ <MyQnaDetail/>} />
          <Route path="Useinfo" element={<Useinfo />}/>
          <Route path="Useinfos" element={<Useinfos />}/>
          <Route path="UseinfoDetail/:useinfoCode" element={<UseinfoDetail />}/>
          <Route path="Notice" element={<Notice />}/>
          <Route path="Notices" element={<Notices />}/>
          <Route path="NoticeDetail/:noticeCode" element={<NoticeDetail />}/>
          <Route path="MyNotices" element={<MyNotices />}/>
          <Route path="MyNoticeDetail/:noticeCode" element={<MyNoticeDetail />}/>
          {/* <Route path="MyPage" element={<MyPage />}/>
          <Route path="MyBuddyList" element={<MypageBuddyList />} /> */}
          
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
            <Route index element={<Buddies/>}/>
            <Route path="mynotices" element={<MyNotices />}/>
            <Route path="mynotices/:noticeCode" element={<MyNoticeDetail />}/>
            <Route path="myuseinfos" element={<MyUseinfos />}/>
            <Route path="myuseinfos/:useinfoCode" element={<MyUseinfoDetail />}/>
            <Route path="buddies" element={<Buddies />} />
            <Route path="buddyDetail/:buddyCode" element={ <BuddyDetail/>} />
            <Route path="buddyRegist" element={ <BuddyRegist/>} />
          </Route>

          {/* CS 페이지 */}
          <Route path="cs" element={<CsLayout/>}>
            <Route index element={ <MyFaqs/> }/>
            <Route path="myFaqs" element={ <MyFaqs/> }/>
            <Route path="myQnas" element={ <MyQnas/> }/>
            <Route path="myQnas/:qnaCode" element={ <MyQnaDetail/>} />
            <Route path="myQna" element={ <MyQna/> }/>
          </Route>

          {/* Mypage */}
          <Route path="/mypage" element={<MyPageLayout />}>
            <Route index element={<Mypage/>}/>
            <Route path="myProfile" element={<MyProfile />} />
            <Route path="updateMyProfile" element={<MyPutProfile />} />
            <Route path="deletion" element={<MyDeletion />} />
            <Route path="myBuddy" element={<MyBuddy />} />
            <Route path="myBuddy/:buddyCode" element={<MyBuddyDetail />} />
            <Route path="myBuddy/:buddyCode/update" element={<MyPutBuddy />} />
            <Route path="mySchedule" element={<MySchedule />} />
            <Route path="mySchedule/:scheCode" element={<MyScheduleDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;