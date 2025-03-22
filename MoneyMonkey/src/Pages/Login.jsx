import React, { useState } from "react";
import LoginBlock from "../LoginBlock";
import FillBox from "../FillBox";
import SubmitButton from "../SubmitButton";
import { Link } from "react-router-dom";



export const Login = () => {
        const [modalShow, setModalShow] = React.useState(false);
    // ✅ State for form data
        const [formData, setFormData] = useState({
            login_email: "",
            login_pass: "",
        });
    
        // ✅ Update state when input values change
        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
    
        // ✅ Handle form submission
        const handleSubmit =  (e) => {
            e.preventDefault();
    
            // ✅ Show alert with entered values
            // alert(`You entered: \nEmail: ${formData.email} \nPassword: ${formData.pass} \nConfirm Password: ${formData.confirmpass}`);
    
            // ✅ Send POST request to Node.js backend
            try {
                const response = fetch('http://localhost:5000/app/logindata', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(formData) // Send the form data as JSON
                });
          
                 const result = response.json();
                 console.log(result); // Log the response from the backend
          
                // Optionally, clear the form after submission
                setFormData({ ...formData, [e.target.name]: e.target.value });
              } catch (error) {
                console.error('Error:', error);
              }
        };

    return (
        <form className="login-block" onSubmit={handleSubmit}>
            <div className="login-content">
                <h2>เข้าสู่ระบบ</h2>
                <input
                    className="fill-input"
                    placeholder="อีเมล"
                    name="login_email"
                    value={formData.login_email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="รหัสผ่าน"
                    name="login_pass"
                    value={formData.login_pass}
                    onChange={handleChange}
                />  
                <SubmitButton text="เข้าสู่ระบบ" type ="submit"/>
                
                
                <Link to="/Register" className="Register">
                    <h6>ลงทะเบียนใช้งาน</h6>
                </Link>
                
                
                
            </div>
        </form>
    );
};
