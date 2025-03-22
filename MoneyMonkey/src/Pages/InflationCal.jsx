import React, { useState } from "react";
import CenteredBlock from "../CenteredBlock";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const PredictUrl = "http://52.77.219.134:5050/predict";

export const InflationCal = () => {
    // ✅ State for form data
    const [formData, setFormData] = useState({
        Money_input: "",
        Year_input: "",
        Result: "" ,
        Percentage: ""   
    });

    const [modalShow, setModalShow] = useState(false);

    // ✅ Update state when input values change
    const handleChange = (e) => {
        setFormData({ 
            ...formData, 
            [e.target.name]: e.target.value 
        });
    };

    // ✅ Handle calculation (No backend request yet)
    const handleCalculate = (e) => {
        e.preventDefault();

        // Convert inputs to numbers
        const money = parseFloat(formData.Money_input) || 0;
        const years = parseInt(formData.Year_input) || 0;

        if (money <= 0 || years <= 0) {
            alert("กรุณากรอกค่าที่ถูกต้อง!");
            return;
        }

        // ✅ Calculate the result


        const predict = 1.03;
        const calculatedResult = (money * (predict) ** years).toFixed(2);
        const percent = ((calculatedResult - money) / money * 100).toFixed(2);
        // ✅ Update state & Show modal
        setFormData((prev) => ({ ...prev, Result: calculatedResult , Percentage: percent}));
        setModalShow(true);
    };

    // ✅ Send data to backend
    const handleSaveAndClose = async () => {
        try {
            const response = await fetch('http://localhost:5000/app/resultsave', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send data after closing modal
            });

            const result = await response.json();
            console.log("Backend Response:", result);
        } catch (error) {
            console.error('Error:', error);
        }

        // ✅ Close Modal
        setModalShow(false);
    };

    // ✅ Close modal without sending data
    const handleCloseWithoutSave = () => {
        setModalShow(false);
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
                <Button className="submit-button" variant="warning" type="submit">
                    คำนวณ
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
