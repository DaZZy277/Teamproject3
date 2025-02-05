import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  return (
    <div>
      <Header />
      <Home />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1 className="logo">
        <span>Money</span>
        <span className="highlight">Monkey</span>
      </h1>
      <p classname ="menuOption" > 
        login 
      </p>
    </header>
  );
}

function Home() {
  const [option, setOption] = useState("AiPredict");
  const [moneyInput, setMoneyInput] = useState("");
  const [percentage, setPercentage] = useState("");
  const [year, setYear] = useState("");

  return (
    <div className="container">
      <div className="form-box">
        <form method="post" action="/result" className="form">
          <input
            type="number"
            className="input-field"
            placeholder="Enter money here..."
            value={moneyInput}
            onChange={(e) => setMoneyInput(e.target.value)}
          />
          
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="option"
                value="AiPredict"
                checked={option === "AiPredict"}
                onChange={() => setOption("AiPredict")}
              />
              Ai Predict
            </label>
            <label>
              <input
                type="radio"
                name="option"
                value="Manual"
                checked={option === "Manual"}
                onChange={() => setOption("Manual")}
              />
              Manual
            </label>
          </div>

          {option === "Manual" && (
            <div className="input-group">
              <input
                type="number"
                className="input-field"
                placeholder="Enter Inflation rate here..."
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
              />
              <span className="unit">%</span>
            </div>
          )}

          <div className="input-group">
            <input
              type="number"
              className="input-field"
              placeholder="Enter year here..."
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
            <span className="unit">year</span>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
