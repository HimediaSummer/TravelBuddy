import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
}

export default App;