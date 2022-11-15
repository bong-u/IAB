import { Routes, Route } from "react-router-dom";
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopNav from './TopNav';
import SideNav from './SideNav';
import Home from './Home';
import Asset from './Asset';
import Stats from './Stats';
import Add from './Add';
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

const Main = () => {
  const [assetList, setAssetList] = useState([]);
  const [assetColorList, setAssetColorList] = useState([]);
  const [expenseTypeList, setExpenseTypeList] = useState([]);
  const sessionStorage = window.sessionStorage;
  const navigate = useNavigate();
  const token = sessionStorage.getItem('token');

  const logoutFunc = useCallback(() => {
    sessionStorage.removeItem("token");
    window.location.reload('/');
  }, [sessionStorage]);

  // 필요한 정보를 한번에 받아서 하위 컴포넌트에 props로 전달
  useEffect(() => {
    if (token === null)
      navigate('/login');
    else {
      fetch('http://localhost:3001', {
        method: 'POST',
        headers: {"Authorization" : `Bearer ${token}`}
      })
        .then(res => {
          if (res.status === 401) logoutFunc();
          return res.json()
        })
        .then(data => {
          setAssetList(data['asset_list']);
          setAssetColorList(data['asset_color_list']);
          setExpenseTypeList(data['expense_type_list']);
        })
    }
  }, [token, navigate, logoutFunc]);


  return (
    <div className="d-flex flex-column flex-nowrap h-100">
      <TopNav logoutFunc={logoutFunc}></TopNav>
      <main className="d-flex h-100">
        <aside id="sidebar" className="col-md-3 col-lg-3 col-xl-2 d-md-block bg-light sidebar collapse px-3 border-end">
          <SideNav></SideNav>
        </aside>
        <section className="col-sm-12 col-md-9 col-lg-9 col-xl-10 p-5">
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="asset" element={<Asset token={token} assetList={assetList} assetColorList={assetColorList} />} />
            <Route path="stats" element={<Stats />} />
            <Route path="add" element={<Add assetList={assetList} expenseTypeList={expenseTypeList} />} />
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default Main;
