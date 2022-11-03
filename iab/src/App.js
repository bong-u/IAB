import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import Home from './components/Home';
import Asset from './components/Asset';
import Stats from './components/Stats';
import Add from './components/Add';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

const App = () => {
  
  const [assetList, setAssetList] = useState([]);
  const [assetColorList, setAssetColorList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001', { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        setAssetList(data['asset_list']);
        setAssetColorList(data['asset_color_list'])
      });
  }, []);

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
              <Route path="/asset" element={<Asset assetList={assetList} assetColorList={assetColorList}/>} />
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
