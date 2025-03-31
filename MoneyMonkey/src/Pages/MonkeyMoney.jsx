import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CenteredBlock from "../CenteredBlock";
import './MonkeyMoney.css'; // Make sure to import the updated styles

export const MonkeyMoney = () => {
  return (
    <div>
      <CenteredBlock>
        <div className="monkey-money-container">
          <h1 className="monkey-money-title">Monkey Money</h1>
          <p className="monkey-money-description">
            Monkey Money is a personal finance application that helps you manage your money effectively. 
            With our easy-to-use interface, you can track your income, expenses, and savings goals.
          </p>
          <Link to="/InflationCal" className="btn btn-primary monkey-money-button">Get Started</Link>
        </div>
      </CenteredBlock>
    </div>
  );
};
