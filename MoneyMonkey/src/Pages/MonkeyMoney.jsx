import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CenteredBlock from "../CenteredBlock";
import './MonkeyMoney.css'; // Make sure to import the updated styles

export const MonkeyMoney = () => {
  return (
    <div>
      <CenteredBlock>
        <div className="content">
          {/* Image */}
          <img src="/webpage.png" alt="Webpage Preview" />

          {/* Description Overlay */}
          <p className="description">
            MonkeyMoney คือเว็บไซต์ที่ใช้เทคโนโลยีปัญญาประดิษฐ์
            เพื่อช่วยการคำนวณอัตราเงินเฟ้อ และจัดการบัญชีรายรับรายจ่าย
            เพื่อให้คุณสามารถวางแผนการเงินได้อย่างมีประสิทธิภาพ ช่วยให้คุณสามารถ
            บริหารจัดการเงินได้ง่ายขึ้น
          </p>

          {/* Start Button */}
          <Link to="/InflationCal" className="start-btn">
            เริ่มคำนวณเงินเฟ้อ
          </Link>
        </div>
      </CenteredBlock>
    </div>
  );
};
