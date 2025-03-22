import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./Navbar.css"; // Custom styles

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Function to handle menu close when a link is clicked
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
      <div className="container">
        {/* Navbar Brand */}
        <Link to="/home" className="navbar-brand" onClick={closeMenu}>
          MonkeyMoney<span className="dotcom">.com</span>
        </Link>

        {/* Bootstrap Toggle Button for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav mx-auto align-items-center gap-3">
            <li className="nav-item">
              <Link to="/InflationCal" className="nav-link" onClick={closeMenu}>คำนวณเงินเฟ้อ</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/InflationPre" className="nav-link" onClick={closeMenu}>ทำนายเงินเฟ้อ</Link>
            </li> */}
            <li className="nav-item">
              <Link to="/IncomeExpense" className="nav-link" onClick={closeMenu}>บัญชีรายรับรายจ่าย</Link>
            </li>
          </ul>

          {/* User Section - Aligned to Right */}
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link to="/Login" className="nav-link text-warning" onClick={closeMenu}>เข้าสู่ระบบ</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
