import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton";

export const Register = () => {
    // ✅ State for form data
    const [formData, setFormData] = useState({
        email: "",
        pass: "",
        confirmpass: "",
    });

    // ✅ Update state when input values change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // ✅ Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Check if passwords match
        if (formData.pass !== formData.confirmpass) {
            alert("รหัสผ่านไม่ตรงกัน กรุณาลองใหม่!"); // Alert when passwords don’t match
            return; // Stop the function, do NOT send data
        }

        try {
            const response = await fetch('http://localhost:5000/app/regdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send form data
            });

            const result = await response.json();
            console.log("Backend Response:", result);

            // ✅ Optionally clear the form after submission
            setFormData({
                email: "",
                pass: "",
                confirmpass: ""
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-block">
            <div className="login-content">
                <h2>ลงทะเบียน</h2>
                <input
                    className="fill-input"
                    placeholder="อีเมล"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="รหัสผ่าน"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="ยืนยันรหัสผ่าน"
                    name="confirmpass"
                    value={formData.confirmpass}
                    onChange={handleChange}
                    required
                />
                <SubmitButton text="ลงทะเบียน" type="submit" />
                <Link to="/Login" className="Register">
                    <h6>มีบัญชีอยู่แล้ว</h6>
                </Link>
            </div>
        </form>
    );
};
