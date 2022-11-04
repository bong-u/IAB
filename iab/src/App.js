import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './components/Main';
import Login from './components/Login';

const App = () => {
  return (
    <div className="h-100">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
