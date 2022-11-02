import { Link } from "react-router-dom";

const TopNav = () => {
  return (
    <header className="d-flex border-bottom flex-wrap sticky-top bg-light">
      <div id="logo-area" className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
        <h2 className="py-3 text-center">한눈에가계부</h2>
      </div>
      <div className="col-12 col-sm-8 col-md-9 col-lg-9 col-xl-10">
        <ul className="nav gap-3 justify-content-center flex-nowrap">
          <li className="nav-item my-3">
            <Link to="/" className="nav-link">한눈에</Link>
          </li>
          <li className="nav-item my-3">
            <Link to="/asset" className="nav-link">자산</Link>
          </li>
          <li className="nav-item my-3">
            <Link to="/stats" className="nav-link">통계</Link>
          </li>
          <li className="nav-item my-3">
            <Link to="/add" className="nav-link">거래추가</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default TopNav;