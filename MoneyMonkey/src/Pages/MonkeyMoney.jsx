import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./Home.css"; // Custom styles
import CenteredBlock from "../CenteredBlock";


export const MonkeyMoney = () => {
    return (
        <div>
    <CenteredBlock>
        <div className="container text-center mt-5">
      {/* Recommendation Section */}
      <h1 className="title">💰MonkeyMoney💰</h1>
      <p className="description">
        คุณต้องการวางแผนทางการเงินให้มีประสิทธิภาพมากขึ้นใช่ไหม?  
        เครื่องมือของเราจะช่วยคุณคำนวณ **อัตราเงินเฟ้อ** และ **บัญชีรายรับรายจ่าย**  
        เพื่อให้คุณสามารถบริหารจัดการการเงินได้อย่างชาญฉลาด!
      </p>

      {/* Start Button */}
      <Link to="/InflationCal" className="btn btn-warning btn-lg mt-3 start-btn">
        🚀 เริ่มคำนวณเงินเฟ้อ
      </Link>
        </div>
    </CenteredBlock>
        </div>
    ); 
}