import React from "react";
import CenteredBlock from "../CenteredBlock";
import FillBox from "../FillBox";
import SubmitButton from "../SubmitButton";

export const InflationCal = () => {
    return (
        <div>
            <CenteredBlock>
            <h2>คำนวณเงินเฟ้อ</h2>
            <FillBox placeholder={"จำนวนเงิน"}/>
            <FillBox placeholder={"จำนวนปี"}/>
            <SubmitButton/>
            </CenteredBlock>
        </div>
    );
}
