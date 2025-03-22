
import FillBox from "../FillBox";
import SubmitButton from "../SubmitButton";
import React, { useState } from "react";

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
    const handleSubmit =  (e) => {
        e.preventDefault();

        // ✅ Show alert with entered values
        // alert(`You entered: \nEmail: ${formData.email} \nPassword: ${formData.pass} \nConfirm Password: ${formData.confirmpass}`);

        // ✅ Send POST request to Node.js backend
        try {
            const response = fetch('http://localhost:5000/app/regdata', {
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
        <form onSubmit={handleSubmit} className="login-block">
            <div className="login-content">
                <h2>ลงทะเบียน</h2>
                <input
                    className="fill-input"
                    placeholder="อีเมล"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="รหัสผ่าน"
                    name="pass"
                    value={formData.pass}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    className="fill-input"
                    placeholder="ยืนยันรหัสผ่าน"
                    name="confirmpass"
                    value={formData.confirmpass}
                    onChange={handleChange}
                />
                <SubmitButton text="ลงทะเบียน" type="submit" />
            </div>
        </form>
    );
};
