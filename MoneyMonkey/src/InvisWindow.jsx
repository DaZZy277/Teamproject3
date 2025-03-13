import React from 'react';
import './InvisWindow.css';  // Make sure this file exists

const InvisWindow = ({children}) => {
  return (
    <div id="InvisWindow">
      <div class="InvisContent">
        {children}  {/* Content inside the box will be dynamically passed as children */}
      </div>
      <button class="uprica" onClick={Disappear}>
        X
      </button>
    </div>
  );
}

export default InvisWindow;

function Disappear() {
  document.getElementById("InvisWindow").style.display  = "none"; //So all you need to do right now is disappear
}