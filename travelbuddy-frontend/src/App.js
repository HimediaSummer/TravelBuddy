import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Schedule from './components/products/Schedule';
import Main from './components/products/Main';
import Members from './pages/admin/Members';
import MemberDetail from './pages/admin/MemberDetail';
import MyPage from './pages/member/mypage/Mypage';
import MypageBuddyList from './components/products/MypageBuddyList';
import Qnas from './pages/admin/Qnas';
import QnaDetail from './pages/admin/QnaDetail ';

import Login from './pages/member/Login';
import Register from './pages/member/Register';
import Error from './pages/Error';
import Buddies from './pages/member/Buddy';

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
          <Route path="MyPage" element={<MyPage />}>
            <Route path="MyBuddyList" element={<MypageBuddyList />} />
          </Route> 
          

          <Route path="/login" element={ <Login/> } />
          <Route path="/signup" element={ <Register/> } />
          <Route path="*" element={ <Error/> }/>
          <Route path="buddies" element={<Buddies />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;