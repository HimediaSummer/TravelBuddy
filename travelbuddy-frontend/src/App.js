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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
