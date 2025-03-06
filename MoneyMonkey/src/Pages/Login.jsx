import React from "react";  
import LoginBlock from "../LoginBlock";
import FillBox from "../FillBox";
import SubmitButton from "../SubmitButton";
import { Link } from "react-router-dom";

export const Login = () => {
    return (
        <div className="login-block">
            <div className="login-content">
                <h2>เข้าสู่ระบบ</h2>
                <FillBox placeholder={"อีเมล"} /> 
                <FillBox placeholder={"รหัสผ่าน"} />  
                <SubmitButton />
                
                {/* Link to Register page */}
                <Link to="/Register" className="Register">
                    <h6>ลงทะเบียนใช้งาน</h6>
                </Link>
                
                {/* Link to Forget Password page */}
                <Link to="/ForgetPassword" className="ForgetPassword">
                    <h6>ลืมรหัสผ่าน?</h6>
                </Link>
            </div>
        </div>
    );
};
