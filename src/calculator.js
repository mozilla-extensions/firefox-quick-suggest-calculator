/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const Calculator = {
  operators: ["÷", "×", "-", "+", "*", "/", "%"],

  // Holds the current symbols for calculation
  stack: [],

  isNumeric(value) {
    return value - 0 == value && value.length;
  },

  isOperator(value) {
    return Calculator.operators.includes(value);
  },

  precedence(val) {
    if (["-", "+"].includes(val)) {
      return 2;
    }
    if (["*", "/"].includes(val)) {
      return 3;
    }

    return null;
  },

  // This is a basic implementation of the shunting yard algorithm
  // described http://en.wikipedia.org/wiki/Shunting-yard_algorithm
  // Currently functions are unimplemented and only operators with
  // left association are used
  infix2postfix(infix) {
    let parser = new Parser(infix);
    let tokens = parser.parse(infix);
    let output = [];
    let stack = [];

    tokens.forEach(token => {
      if (token.number) {
        output.push(parseFloat(token.value, 10));
      }

      let isOperator = this.isOperator;
      if (isOperator(token.value)) {
        let i = this.precedence;
        while (
          stack.length &&
          isOperator(stack[stack.length - 1]) &&
          i(token.value) <= i(stack[stack.length - 1])
        ) {
          output.push(stack.pop());
        }
        stack.push(token.value);
      }

      if (token.value === "(") {
        stack.push(token.value);
      }

      if (token.value === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }
        // This is the (
        stack.pop();
      }
    });

    while (stack.length) {
      output.push(stack.pop());
    }
    return output;
  },

  evaluate: {
    "*": function(a, b) {
      return a * b;
    },
    "+": function(a, b) {
      return a + b;
    },
    "-": function(a, b) {
      return a - b;
    },
    "/": function(a, b) {
      return a / b;
    },
    "%": function(a, b) {
      return a % b;
    },
  },

  evaluatePostfix(postfix) {
    let stack = [];

    postfix.forEach(token => {
      if (!this.isOperator(token)) {
        stack.push(token);
      } else {
        let op2 = stack.pop();
        let op1 = stack.pop();
        let result = this.evaluate[token](op1, op2);
        if (isNaN(result)) {
          throw new Error("Value is " + result);
        }
        stack.push(result);
      }
    });
    let finalResult = stack.pop();
    if (isNaN(finalResult)) {
      throw new Error("Value is " + finalResult);
    }
    return finalResult;
  },
};

function Parser(input) {
  this.init(input);
}

Parser.prototype = {
  init(input) {
    // No spaces.
    input = input.replace(/[ \t\v\n]/g, "");

    // String to array:
    this._chars = [];
    for (var i = 0; i < input.length; ++i) {
      this._chars.push(input[i]);
    }

    this._tokens = [];
  },

  // This method returns an array of objects with these properties:
  // - number: true/false
  // - value:  the token value
  parse(input) {
    // The input must be a "block" without any digit left.
    if (!this._tokenizeBlock() || this._chars.length) {
      throw new Error("Wrong input");
    }

    return this._tokens;
  },

  _tokenizeBlock() {
    if (!this._chars.length) {
      return false;
    }

    // "(" + something + ")"
    if (this._chars[0] == "(") {
      this._tokens.push({ number: false, value: this._chars[0] });
      this._chars.shift();

      if (!this._tokenizeBlock()) {
        return false;
      }

      if (!this._chars.length || this._chars[0] != ")") {
        return false;
      }

      this._chars.shift();

      this._tokens.push({ number: false, value: ")" });
    } else if (!this._tokenizeNumber()) {
      // number + ...
      return false;
    }

    if (!this._chars.length || this._chars[0] == ")") {
      return true;
    }

    while (this._chars.length && this._chars[0] != ")") {
      if (!this._tokenizeOther()) {
        return false;
      }

      if (!this._tokenizeBlock()) {
        return false;
      }
    }

    return true;
  },

  // This is a simple float parser.
  _tokenizeNumber() {
    if (!this._chars.length) {
      return false;
    }

    // {+,-}something
    let number = [];
    if (/[+-]/.test(this._chars[0])) {
      number.push(this._chars.shift());
    }

    var me = this;
    function tokenizeNumberInternal() {
      if (!me._chars.length || !/^[0-9.]/.test(me._chars[0])) {
        return false;
      }

      while (me._chars.length && /[0-9.]/.test(me._chars[0])) {
        number.push(me._chars.shift());
      }

      return true;
    }

    if (!tokenizeNumberInternal()) {
      return false;
    }

    // 123{e...}
    if (!this._chars.length || this._chars[0] != "e") {
      this._tokens.push({ number: true, value: number.join("") });
      return true;
    }

    number.push(this._chars.shift());

    // 123e{+,-}
    if (/[+-]/.test(this._chars[0])) {
      number.push(this._chars.shift());
    }

    if (!this._chars.length) {
      return false;
    }

    // the number
    if (!tokenizeNumberInternal()) {
      return false;
    }

    this._tokens.push({ number: true, value: number.join("") });
    return true;
  },

  _tokenizeOther() {
    if (!this._chars.length) {
      return false;
    }

    if (["*", "/", "+", "-", "%"].includes(this._chars[0])) {
      this._tokens.push({ number: false, value: this._chars.shift() });
      return true;
    }

    return false;
  },
};

if (typeof exports === "object") {
  // eslint-disable-next-line no-undef
  module.exports = Calculator;
}
