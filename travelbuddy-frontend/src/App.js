import { BrowserRouter, Routes, Route } from 'react-router-dom';
<<<<<<< HEAD
import Main from './components/products/Main';
import Login from './pages/member/Login';
import Layout from './layouts/Layout';
import Register from './pages/member/Register';
import Error from './pages/Error';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/* React에서 보여줄 화면 주소(URL) 정하는곳 */}
                {/* 자세한건 Main으로 이동바람 (컨트롤 좌클릭)  */}
                <Route path="/" element={<Layout/>}>
                    <Route index element={ <Main/> }/>
                </Route>



                <Route path="/login" element={ <Login/> } />
                <Route path="/signup" element={ <Register/> } />
                <Route path="*" element={ <Error/> }/>
            </Routes>
        </BrowserRouter>
    );
=======
import Schedule from './components/products/Schedule';
import Main from './components/products/Main';
import MemberManagement from './pages/admin/MemberManagement';


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
            <Route path="MemberManagement" element={ <MemberManagement/> }/> 
            
            <Route path="mypage" element={<MyPage />}>
              <Route path="mybuddylist" element={<MypageBuddyList />} />
            </Route> 
        </Route>
  
      </Routes>
    </BrowserRouter>
  );
>>>>>>> main
}

export default App;