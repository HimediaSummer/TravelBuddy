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
import Mypage from './pages/member/mypage/Mypage';
import MyProfile from './pages/member/mypage/MyProfile';
import MyPutProfile from './pages/member/mypage/MyPutProfile';
import MyDeletion from './pages/member/mypage/MyDeletion';
import MyBuddy from './pages/member/mypage/MyBuddy';
import MyBuddyDetail from './pages/member/mypage/MyBuddyDetail';
import MyPutBuddy from './pages/member/mypage/MyPutBuddy';
import MySchedule from './pages/member/mypage/MySchedule';
import MyScheduleDetail from './pages/member/mypage/MyScheduleDetail';

import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import Buddies from './pages/member/comunity/Buddy';
import BuddyDetail from './pages/member/comunity/BuddyDetail';
import BuddyRegist from './pages/member/comunity/BuddyRegist';
import BuddyUpdate from './pages/member/comunity/BuddyUpdate';
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
          

          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <Register/> } />
          <Route path="*" element={ <Error/> }/>
          <Route path="buddies" element={<Buddies />} />
          <Route path="buddyDetail/:buddyCode" element={ <BuddyDetail/>} />
          <Route path="buddyRegist" element={ <BuddyRegist/>} />
          <Route path='/findid' element={ <FindId/> }/>
          <Route path='/findpw' element={ <FindPw/> }/>
          <Route path="buddyUpdate/:buddyCode" element={ <BuddyUpdate/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;