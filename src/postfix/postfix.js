const Stack = require("../lib/stack");

const precedence = {
  "+": 0,
  "-": 0,
  "*": 1,
  "/": 1,
};

const postfix = (expression) => {
  const stack = new Stack();
  let result = [];

  expression = expression.replace(/\s/g, "");

  expression.split("").forEach((char) => {
    if (char === "(") {
      stack.push(char);
    } else {
      if (char === ")") {
        let top = stack.pop();
        while (top !== "(") {
          result.push(top);
          top = stack.pop();
        }
      } else {
        if ("+-*/".includes(char)) {
          if (
            !stack.top ||
            stack.top.value === "(" ||
            precedence[char] > precedence[stack.top.value]
          ) {
            stack.push(char);
          } else {
            while (
              stack.top &&
              precedence[stack.top.value] >= precedence[char]
            ) {
              result.push(stack.pop());
            }

            stack.push(char);
          }
        } else {
          result.push(char);
        }
      }
    }
  });

  while (stack.top) {
    result.push(stack.pop());
  }

  return result.join(" ");
};

module.exports = postfix;
