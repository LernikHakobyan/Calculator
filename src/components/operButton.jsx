import React from "react";

const OperBut = ({ operate, Operation, firstLine = false }) => {
  return (
    <>
      <div className={!firstLine ? "operation" : "first_1"}>
        <button onClick={() => Operation(operate)}>
          <p>{operate}</p>
        </button>
      </div>
    </>
  );
};

export default OperBut;
