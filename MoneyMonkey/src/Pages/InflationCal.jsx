import React, { useState, useEffect } from "react";
import CenteredBlock from "../CenteredBlock";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
const PredictUrl = "http://52.77.219.134:5050/predict";



export const InflationCal = () => {
  // ✅ Load saved form data from local storage
  const savedFormData = JSON.parse(localStorage.getItem("inflationFormData")) || {
    Money_input: "",
    Year_input: "",
    Result: "",
    Percentage: ""
  };

  const [formData, setFormData] = useState(savedFormData);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false); // Track API request status
  
  // ✅ Use navigate hook to redirect
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  // ✅ Save to local storage on form change
  useEffect(() => {
    localStorage.setItem("inflationFormData", JSON.stringify(formData));
  }, [formData]);

  // ✅ Update state when input values change
  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  // ✅ Handle API request to get prediction
  const handleCalculate = async (e) => {
    e.preventDefault();
    
    // Convert inputs to numbers
    const money = parseFloat(formData.Money_input);
    const years = parseInt(formData.Year_input);

    // Validate inputs
    if (isNaN(money) || money <= 0 || isNaN(years) || years <= 0) {
        alert("กรุณากรอกค่าที่ถูกต้อง!");
        return;
    }

    try {
        setLoading(true); // Start loading

        // Fetch API request
        const response = await fetch(PredictUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                "n_years": years,
                "initial_amount": money
            })
        });

        // Validate response
        if (!response.ok) {
            throw new Error("เกิดข้อผิดพลาดในการดึงข้อมูลจาก API!");
        }

        const data = await response.json();
        console.log("API Response:", data);
        console.log("API Response:", typeof(data));
        // console.log("API Response:", data[1]);
        // for (let i = 0; i < data.length; i++) {
        //   console.log(data[i]);
        // }
        console.log("API Response:", data[data.length - 1]);
        // Ensure we have data and it's an array
        if (data.length > 0) {
            // Get the last entry from the API response
            const lastEntry = data[data.length - 1];

                // Use the final_amount for calculation
                const calculatedResult = parseFloat(lastEntry.amount).toFixed(2);
                
                // Calculate percentage based on initial amount and final amount
                const percent = ((calculatedResult - money) / money * 100).toFixed(2);

                // Update state with the results
                setFormData((prev) => ({
                    ...prev,
                    Result: calculatedResult,
                    Percentage: percent
                }));

                setModalShow(true); // Show modal with result
            
        } else {
            throw new Error("API response does not have expected data format.");
        }
    } catch (error) {
        alert("ไม่สามารถเชื่อมต่อกับ API ได้!");
        console.error("Error:", error);
    } finally {
        setLoading(false); // Stop loading
    }
};;


  // ✅ Check login before saving
  const handleSaveAndClose = async () => {
    const isLoggedIn = localStorage.getItem("userToken"); // Example login check

    if (!isLoggedIn) {
      console.log("กรุณาเข้าสู่ระบบก่อนบันทึกข้อมูล!");
      setIsRedirecting(true);
      navigate("/Login");

    //   return;
    }

    // try {
    //     const localformData = JSON.parse(localStorage.getItem("inflationFormData"));
    //     console.log("Local Form Data:", localformData);
    //     if (localformData){
    //             const response = await fetch("http://localhost:5000/app/resultsave", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify(localformData),
    //         });

    //         const result = await response.json();
    //         console.log("Backend Response:", result);
    //     }
    
    // } catch (error) {
    //   console.error("Error:", error);
    // }

    // ✅ Close Modal
    setModalShow(false);
  };

  // ✅ Close modal without saving
  const handleCloseWithoutSave = () => {
    setModalShow(false);
    localStorage.removeItem("inflationFormData");

  };

  return (
    <form onSubmit={handleCalculate}>
      <CenteredBlock>
        <h2>คำนวณเงินเฟ้อ</h2>
        <input
          className="fill-input"
          placeholder="จำนวนเงิน"
          name="Money_input"
          value={formData.Money_input}
          onChange={handleChange}
          type="number"
          min={1}
        />
        <input
          type="number"
          min={1}
          className="fill-input"
          placeholder="จำนวนปี"
          name="Year_input"
          value={formData.Year_input}
          onChange={handleChange}
        /> 
        <Button className="submit-button" variant="warning" type="submit" disabled={loading}>
          {loading ? "กำลังคำนวณ..." : "คำนวณ"}
        </Button>
      </CenteredBlock>

      {/* ✅ Modal for displaying result */}
      <Modal show={modalShow} backdrop="static" keyboard={false} centered>
        <Modal.Header>
          <Modal.Title>ผลลัพธ์</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>จำนวนเงินที่คุณกรอกคือ {formData.Money_input} บาท</p>
          <p>จำนวนปีที่คุณกรอกคือ {formData.Year_input} ปี</p>
          <p>จำนวนเงินที่คุณกรอกจะเปลี่ยนเป็น {formData.Result} บาท</p>
          <p>เปลี่ยนแปลงเป็นเงินเฟ้อ {formData.Percentage} %</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseWithoutSave}>
            ไม่บันทึก
          </Button>
          <Button variant="success" onClick={handleSaveAndClose}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </form>
  );
};
