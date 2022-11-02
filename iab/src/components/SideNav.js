import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <div>
      <div className="sidebar-heading d-flex justify-content-between m-3 mt-5">
        <span className="text-muted">자산</span>
      </div>
      <ul className="nav flex-column ps-4">
        <li className="nav-item my-3">
          <Link to="/" className="nav-link">통장A</Link>
        </li>
        <li className="nav-item my-3">
          <Link to="/" className="nav-link">통장B</Link>
        </li>
      </ul>
    </div>
  );
}
export default SideNav;