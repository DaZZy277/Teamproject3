import React from "react";
import FillBox from "../FillBox";
import SubmitButton from "../SubmitButton";


export const Register = () => {
    return (
        <div className="login-block"> 
            <div className="login-content">
            <h2>ลงทะเบียน</h2>
            <FillBox placeholder={"อีเมล"} /> 
            <FillBox placeholder={"รหัสผ่าน"} />  
            <FillBox placeholder={"ยืนยันรหัสผ่าน"} />  
            <SubmitButton />
            </div>
        </div>
    );
};
