import React, { useState } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../SubmitButton";
import { useNavigate } from "react-router-dom";

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
            //if has local storage
            const localformData =  JSON.parse(localStorage.getItem("inflationFormData"));
            if (localformData){
                const bodyData = { ...localformData, ...formData };
                    const response_local = await fetch("http://localhost:5000/app/resultsave", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(bodyData),
                });

            const result_local = response_local.json();
            console.log("Backend Response:", result_local);
            }

            // Send form register data to the server
            const response = await fetch('http://localhost:5000/app/regdata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData) // Send form data
            });

            const result = await response.json();
            const status = response.status;
            console.log(status);
            if (status === 400) {
               alert("the email already exists");
               return;
            }else{
               alert("regster successful");
               localStorage.setItem("useremail", "keep_login");
               console.log(result)
            }
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
