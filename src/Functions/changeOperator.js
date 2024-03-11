export const changeOperationFirst = (hasTakenFirst, lastOperate, solve) => {
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

  export const changeOperationSecond = (operate, solve) => {
      if (operate === "*" || operate === "/") {
          solve[2] = "1";
      } else if (operate === "+" || operate === "-") {
          solve[2] = "0";
      } else if (operate === "%") {
          solve[2] = "100";
      }
  };

  export const checkNotNormal = (solve) => {
    if(solve[1] === "+" || solve[1] === "-"){
      return solve[2] === "0" ? false : true
    }else if(solve[1] === "*" || solve[1] === "/"){
      return solve[2] === "0" ? false : true
    }else if(solve[1] === "%"){
      return solve[2] === "100" ? false : true
    }
  }

