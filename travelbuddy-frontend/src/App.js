import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Schedule from './components/products/Schedule';
import Main from './components/products/Main';

import MyPage from './pages/member/mypage/Mypage';
import MypageBuddyList from './components/products/MypageBuddyList';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* React에서 보여줄 화면 주소(URL) 정하는곳 */}
        {/* 자세한건 Schedule으로 이동바람 (컨트롤 좌클릭)  */}
        <Route path="/">
            <Route index element={ <Main/> }/>          
            <Route path="Schedule" element={ <Schedule /> }/>  
            
            <Route path="mypage" element={<MyPage />}>
              <Route path="mybuddylist" element={<MypageBuddyList />} />
            </Route> 
        </Route>
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
