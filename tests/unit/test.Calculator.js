/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global it */

let assert = require("assert");
let Calculator = require("../../src/calculator.js")

const FORMULAS = [
  ['1+1', 2],
  ['3+4*2/(1-5)', 1],
  ['39+4*2/(1-5)', 37],
  ['(39+4)*2/(1-5)', -21.5],
  ['4+-5', -1],
  ['-5*6', -30],
  ['-5.5*6', -33],
  ['-5.5*-6.4', 35.2],
  ['-6-6-6', -18],
  ['6-6-6', -6],
  ['.001 /2', .0005],
  ['(0-.001)/2', -.0005],
  ['-.001/(0-2)', .0005],
  ['1000000000000000000000000+1', 1e+24],
  ['1000000000000000000000000-1', 1e+24],
  ['1e+30+10', 1e+30],
  ['1e+30*10', 1e+31],
  ['1e+30/100', 1e+28],
  ['10/1000000000000000000000000', 1e-23],
  ['10/-1000000000000000000000000', -1e-23]
];

it("basic tests", () => {
  for (let [formula, result] of FORMULAS) {
    var postfix = Calculator.infix2postfix(formula);
    assert.equal(
      Calculator.evaluatePostfix(postfix),
      result,
      `${formula} should equal ${result}`
    );
  }
});
