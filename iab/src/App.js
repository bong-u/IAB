import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';

const App = () => {
  return (
    <div className="h-100">
      <BrowserRouter>
        <Routes>
          {/* 로그인 성공했을 때의 Main component */}
          <Route path="/*" element={<Main />} />
          {/* 로그인 창 component */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
