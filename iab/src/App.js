import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Home from './components/Home';
import Asset from './components/Asset';
import Stats from './components/Stats';
import Add from './components/Add';
import './App.css'

function App() {
  return (
    <div  className="d-flex flex-column flex-nowrap h-100">
      <BrowserRouter>
        <TopNav></TopNav>
        <main className="d-flex h-100">
          <aside id="sidebar" className="col-md-3 col-lg-3 col-xl-2 d-md-block bg-light sidebar collapse px-3 border-end">
            <SideNav></SideNav>
          </aside>
          <section className="col-sm-12 col-md-9 col-lg-9 col-xl-10 p-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/asset" element={<Asset />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/add" element={<Add />} />
            </Routes>
          </section>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
