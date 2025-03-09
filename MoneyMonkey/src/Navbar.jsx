import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'


export const Navbar = () => {
  return (
    <nav>
      <Link to="/" className='title'>MonkeyMoney<span className='dotcom'>.com</span></Link>
      <ul>
        <li><Link to="/InflationCal">คำนวณเงินเฟ้อ</Link></li>
        <li><Link to="/InflationPre">ทำนายเงินเฟ้อ</Link></li>
        <li><Link to="/IncomeExpense">บัญชีรายรับรายจ่าย</Link></li> 
        
      </ul>
      <ul className='user-container'>
        <li>
            <Link to="/Login" className='Login'>เข้าสู่ระบบ</Link>
        </li>  
      </ul>
    </nav>
  );
};

export default Navbar;
