import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Schedule from './components/products/Schedule';
import Main from './components/products/Main';
import Members from './pages/admin/Members';
import MemberDetail from './pages/admin/MemberDetail';
import Mypage from './pages/member/mypage/Mypage';
import MyProfile from './pages/member/mypage/MyProfile';
import MyBuddy from './pages/member/mypage/MyBuddy';
import MyBuddyDetail from './pages/member/mypage/MyBuddyDetail';
import MySchedule from './pages/member/mypage/MySchedule';
import MyScheduleDetail from './pages/member/mypage/MyScheduleDetail';
import Qnas from './pages/admin/Qnas';
import QnaDetail from './pages/admin/QnaDetail ';

function App() {

  return (
    <BrowserRouter>
      <Routes>
  
        {/* 자세한건 Schedule으로 이동바람 (컨트롤 좌클릭)  */}
        <Route path="/">
          <Route index element={ <Main/> }/>          
          <Route path="Schedule" element={ <Schedule /> }/>   
          <Route path="Members" element={ <Members/> }/>
          <Route path="MemberDetail/:memberCode" element={ <MemberDetail/>} />
          <Route path="Qnas" element={ <Qnas/> }/>
          <Route path="QnaDetail/:qnaCode" element={ <QnaDetail/>} />
          
          {/* Mypage */}
          <Route path="/mypage" element={<Mypage />}>
            <Route path="/mypage/myProfile" element={<MyProfile />} />
            <Route path="/mypage/myBuddy" element={<MyBuddy />} />
            <Route path="/mypage/myBuddy/:buddyCode" element={<MyBuddyDetail />} />
            <Route path="/mypage/mySchedule" element={<MySchedule />} />
            <Route path="/mypage/mySchedule/:scheCode" element={<MyScheduleDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
