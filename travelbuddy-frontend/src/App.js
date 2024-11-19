import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Schedule from './components/products/Schedule';
import Main from './components/products/Main';
import Members from './pages/admin/Members';
import MemberDetail from './pages/admin/MemberDetail';
import MyPage from './pages/member/mypage/Mypage';
import MypageBuddy from './components/products/MypageBuddy';
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
          <Route path="MyPage" element={<MyPage />}>
            <Route path="MyBuddy" element={<MypageBuddy />} />
            <Route path="MyBudddyMatch" element= {<MypageBuddyDetail />} />
          </Route> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
