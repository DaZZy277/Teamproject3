import React from "react"
import CenteredBlock from "../CenteredBlock";
import IncomeTable from "../IncomeTable"
import SubmitButton from "../SubmitButton";
import TableAddButton from "../TableAddButton";
import ITableContent from "../ITableContent";
import InvisWindow from "../InvisWindow";
import FillBox from "../FillBox";

export const IncomeExpense = () => {
    return (
        <div>

            <CenteredBlock>
                <IncomeTable>
                    <ITableContent></ITableContent>
                </IncomeTable>

            <InvisWindow>
                <div>
                    <FillBox placeholder={"วัน / เดือน / ปี"} /> 
                    <FillBox placeholder={"รายการ"}  /> 
                    <FillBox placeholder={"จำนวณเงิน"}  /> 
                </div>
                <SubmitButton />
            </InvisWindow>
            <div>
                <TableAddButton onClick={IncomeAddWindowSummon}>⨁</TableAddButton>
                <a class="wspace"></a>
                <SubmitButton />
            </div>
        </CenteredBlock>

            
        </div>
    );
}
function IncomeAddWindowSummon() {
    document.getElementById("InvisWindow").style.display  = "flex"; //Make it appear
    }
  
