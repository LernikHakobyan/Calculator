import React, { useEffect } from "react";
import "../css/index.css";
import {
  changeOperationFirst,
  changeOperationSecond,
} from "../Functions/changeOperator";

import NumBut from "./numButton";
import OperBut from "./operButton";

const Decimal = require("decimal.js");

const Table = () => {
  let solve = ["", "", ""];
  let hasTakenFirst = false;
  let lastOperate = "";
  let reZero = false;
  let lastVal = 0;
  let copySolve_1 = "";
  let copySolve_2 = "";

  const Operation = (operate) => {
    console.log(solve);
    solve[1] = operate;
    let His = document.getElementById("History");
    His.value = solve[0] + " " + operate;
    let Result = document.getElementById("Res");

    if (reZero) {
      solve[0] = lastVal;
      solve[2] = "";
      reZero = false;
    } else {
      changeOperationFirst(hasTakenFirst, lastOperate, solve);
    }
    Result.value = "";
    lastOperate = lastOperate === "" ? operate : lastOperate;

    if (lastOperate === operate) {
      if (!hasTakenFirst) {
        hasTakenFirst = solve[2] !== "1" || solve[2] !== "" ? true : false;
      } else {
        solve[0] = Count(...solve);
        His.value = solve[0] + " " + operate;
        changeOperationSecond(lastOperate, solve);
        Result.value = "";
      }
    } else {
      if (!hasTakenFirst) {
        hasTakenFirst = solve[2] !== "1" || solve[2] !== "" ? true : false;
      } else {
        solve[0] = reZero
          ? Count(solve[0], solve[1], solve[2])
          : Count(solve[0], lastOperate, solve[2]);
        His.value = solve[0] + " " + operate;
        changeOperationSecond(operate, solve);
      }
    }
    lastOperate = operate;
  };

  const Count = (first, operate, second) => {
    const decimalFirst = new Decimal(first);
    const decimalSecond = new Decimal(second);

    switch (operate) {
      case "+":
        return new Decimal(decimalFirst.plus(decimalSecond).toString());
      case "-":
        return new Decimal(decimalFirst.minus(decimalSecond).toString());
      case "*":
        return new Decimal(decimalFirst.times(decimalSecond).toString());
      case "/":
        if (decimalSecond.isZero()) {
          alert("Cannot divide by zero");
          break;
        } else {
          return new Decimal(decimalFirst.dividedBy(decimalSecond).toString());
        }
      case "%":
        return new Decimal(
          decimalFirst.times(decimalSecond.dividedBy(100)).toString()
        );
      default:
        console.log("Invalid task!");
    }
  };

  const AC = () => {
    let His = document.getElementById("History");
    His.value = "";
    let Result = document.getElementById("Res");
    let reZero = ["0", "", ""];
    solve = [...reZero];
    Result.value = "0";
    hasTakenFirst = false;
    lastOperate = "";
    lastVal = 0;
    copySolve_1 = 0;
    copySolve_2 = 0;
  };

  const negative = () => {
    let Result = document.getElementById("Res");
    let His = document.getElementById("History");

    let which = !hasTakenFirst ? 0 : 2;

    solve[which] = -Number(solve[which]);
    console.log(solve, "solve");
    console.log([hasTakenFirst, lastVal], "array");
    lastVal = solve[which];
    Result.value = solve[which];
    His.value = Result.value;
  };

  const checkPoint = (val) => (val.indexOf(".") === -1 ? true : false);

  const writeNum = (num, can = hasTakenFirst) => {
    let Result = document.getElementById("Res");
    let His = document.getElementById("History");
    if (Result.value.length <= 10) {
      if (Result.value === "0" || Result.value === "" || reZero) {
        if (reZero === true) {
          His.value = "";
          solve[1] = "+";
          solve[2] = "0";
        }
        reZero = false;
        Result.value = num === "." ? "0." : num;
      } else {
        if (num === ".") {
          if (checkPoint(Result.value)) {
            Result.value += num;
          }
        } else {
          Result.value += num;
        }
      }
      if (!can) {
        solve[0] = Result.value;
      } else {
        solve[2] = Result.value;
      }
    } else {
      alert("Limit passed!");
    }
  };

  const equal = () => {
    let His = document.getElementById("History");
    let Result = document.getElementById("Res");
    if (solve[2] !== "") {
      hasTakenFirst = false;
      let may = solve[0];
      Result.value = Count(...solve);
      solve[0] = Result.value;

      copySolve_1 = solve[1];
      copySolve_2 = solve[2];

      solve[1] = "";
      solve[2] = "";
      His.value = may + " " + copySolve_1 + " " + copySolve_2 + " =";
      lastVal = Number(Result.value);
    } else {
      if (copySolve_1) {
        lastOperate = copySolve_1;
        solve[0] = Count(Result.value, copySolve_1, copySolve_2);
        Result.value = solve[0];
        His.value = lastVal + " " + copySolve_1 + " " + copySolve_2 + " =";
        lastVal = Number(solve[0]);
      } else {
        console.log("Использвован недопустимый формат");
        console.log("lastVal = '' and solve[2] = '' ");
      }
    }
    
    reZero = true;
  };

  useEffect(() => {
    document.addEventListener("keydown", detectKeyDown, true);
  });

  const detectKeyDown = (e) => {
    let operationSymb = ["+", "-", "/", "*", "%"];
    let end = "r";
    let equality = "Enter";
    if ((Number(e.key) >= 0 && Number(e.key) <= 10) || e.key === ".") {
      writeNum(String(e.key));
    } else if (operationSymb.indexOf(e.key) !== -1) {
      Operation(e.key);
    } else if (e.key === end) {
      AC();
    } else if (e.key === equality) {
      equal();
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="Colculator">
            <div className="Colculator_row">
              <div className="historyInputPart">
                <input id="History" type="text" value="" readOnly />
              </div>
              <div className="inputPart">
                <input id="Res" type="text" value="0" readOnly />
              </div>

              <div className="first">
                <div className="first_row">
                  { <OperBut operate={"AC"}  Operation={AC}         firstLine={true} /> }
                  { <OperBut operate={"+|-"} Operation={negative}   firstLine={true} /> }
                  { <OperBut operate={"%"}   Operation={Operation}  firstLine={true} /> }
                  { <OperBut operate={"/"}   Operation={Operation}  firstLine={false}/> }
                </div>
              </div>

              {[
                ["7", "8", "9", { sign: "*" }],
                ["4", "5", "6", { sign: "-" }],
                ["1", "2", "3", { sign: "+" }],
              ].map((row, i) => (
                <div key={row[i]} className={i === 0 ? "second" : i === 1 ? "third" : "fourth"}>
                  <div key={row[i] + "0"} className={ i === 0 ? "second_row" : i === 1 ? "third_row" : "fourth_row" }>
                    {row.map((val) => typeof val === "string" ? (
                        <NumBut key={val} num={val} writeNum={writeNum} />
                      ) : (
                        <OperBut key={"string" + val} operate={val.sign} Operation={Operation} />
                      )
                    )}
                  </div>
                </div>
              ))}

              <div className="fivth">
                <div className="fivth_row">
                  <NumBut num={"0"} writeNum={writeNum} zero={true} />
                  <NumBut num={"."} writeNum={writeNum} />
                  {<OperBut operate={"="} Operation={equal} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
