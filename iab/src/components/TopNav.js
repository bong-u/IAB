import { NavLink } from "react-router-dom";

const TopNav = (props) => {
  const { logoutFunc } = props;

  return (
    <header className="d-flex border-bottom flex-wrap sticky-top bg-light">
      <div id="logo-area" className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
        <h2 className="py-3 text-center">한눈에가계부</h2>
      </div>
      <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-10">
        <ul className="nav gap-3 justify-content-center flex-nowrap">
          <li className="nav-item my-3">
            <NavLink to="/" className={({ isActive }) => "nav-link" + (isActive ? " nav-select" : "")}>한눈에</NavLink>
          </li>
          <li className="nav-item my-3">
            <NavLink to="/asset" className={({ isActive }) => "nav-link" + (isActive ? " nav-select" : "")}>자산</NavLink>
          </li>
          <li className="nav-item my-3">
            <NavLink to="/stats" className={({ isActive }) => "nav-link" + (isActive ? " nav-select" : "")}>통계</NavLink>
          </li>
          <li className="nav-item my-3">
            <NavLink to="/add" className={({ isActive }) => "nav-link" + (isActive ? " nav-select" : "")}>거래추가</NavLink>
          </li>
          <li className="nav-item my-3">
            <button className="nav-link" onClick={logoutFunc}>로그아웃</button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default TopNav;