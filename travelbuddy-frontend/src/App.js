import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/products/Main';
import Login from './pages/member/Login';

function App() {

    return (
        <BrowserRouter>
            <Routes>
                {/* React에서 보여줄 화면 주소(URL) 정하는곳 */}
                {/* 자세한건 Main으로 이동바람 (컨트롤 좌클릭)  */}
                <Route path="/">
                    <Route index element={ <Main/> }/>
                </Route>



                <Route path="/login" element={ <Login/> } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;