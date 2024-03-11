import React from "react";

const NumBut = ({ num, writeNum,zero = false }) => {
  return (
    <div className={!zero ? "number_div" : "number_div_0"}>
      <button id="Num" onClick={() => writeNum( num )}>
        <p>{num}</p>
      </button>
    </div>
  );
};

export default NumBut;
