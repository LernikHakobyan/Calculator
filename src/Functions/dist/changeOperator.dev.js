"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkNotNormal = exports.changeOperationSecond = exports.changeOperationFirst = void 0;

var changeOperationFirst = function changeOperationFirst(hasTakenFirst, lastOperate, solve) {
  if (!hasTakenFirst && solve[2] === "") {
    if (lastOperate === "*" || lastOperate === "/") {
      solve[2] = "1";
    } else if (lastOperate === "+" || lastOperate === "-") {
      solve[2] = "0";
    } else if (lastOperate === "%") {
      solve[2] = "100";
    }
  }
};

exports.changeOperationFirst = changeOperationFirst;

var changeOperationSecond = function changeOperationSecond(operate, solve) {
  if (operate === "*" || operate === "/") {
    solve[2] = "1";
  } else if (operate === "+" || operate === "-") {
    solve[2] = "0";
  } else if (operate === "%") {
    solve[2] = "100";
  }
};

exports.changeOperationSecond = changeOperationSecond;

var checkNotNormal = function checkNotNormal(solve) {
  if (solve[1] === "+" || solve[1] === "-") {
    return solve[2] === "0" ? false : true;
  } else if (solve[1] === "*" || solve[1] === "/") {
    return solve[2] === "0" ? false : true;
  } else if (solve[1] === "%") {
    return solve[2] === "100" ? false : true;
  }
};

exports.checkNotNormal = checkNotNormal;