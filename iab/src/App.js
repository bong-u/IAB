import { BrowserRouter, Route, Routes} from "react-router-dom";
import Main from './components/Main';

const App = () => {
  return (
    <div className="h-100">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Main />}>
          </Route>
          {/* <Route path="/login" element={}/> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
