import React from 'react';
import './IncomeTable.css';  // Make sure this file exists

const IncomeTable = ({ children }) => {
  return (
    <div id="tid">
    <table id="rtid">
      <tr class="thead">
        <th>วัน / เดือน / ปี</th> <th>รายการ</th> <th>จำนวณเงิน</th>
      </tr>
    </table>
    <div class="scrol">
    {children}
    </div>
    </div>
  );
}

export default IncomeTable;
