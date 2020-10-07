/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class Length {
  static UNIT = {
    "meter": 1,
    "m": 1,
    "nanometer": 1000000000,
    "micrometer": 1000000,
    "millimeter": 1000,
    "mm": 1000,
    "centimeter": 100,
    "cm": 100,
    "kilometer": 0.001,
    "km": 0.001,
    "mile": 0.0006213689,
    "yard": 1.0936132983,
    "foot": 3.280839895,
    "inch": 39.37007874,
  };

  static NUMBER_REGEX = "\\d+(?:\\.\\d+)?\\s*";
  static UNIT_REGEX = "\\w+";
  static QUERY_REGEX = new RegExp(
    `^(${this.NUMBER_REGEX})(${this.UNIT_REGEX})\\s+in\\s+(${this.UNIT_REGEX})`,
    "i"
  );

  isActive(queryContext) {
    const regexResult = Length.QUERY_REGEX.exec(queryContext.searchString);
    if (!regexResult) {
      return false;
    }

    const inputUnit = regexResult[2];
    const outputUnit = regexResult[3];

    return Length.UNIT[inputUnit] && Length.UNIT[outputUnit];
  }

  startQuery(queryContext) {
    const regexResult = Length.QUERY_REGEX.exec(queryContext.searchString);
    const inputNumber = Number(regexResult[1]);
    const inputUnit = regexResult[2];
    const outputUnit = regexResult[3];
    const outputNumber = inputNumber / Length.UNIT[inputUnit] * Length.UNIT[outputUnit];

    return {
      input: `${inputNumber}${inputUnit}`,
      equal: " = ",
      output: `${outputNumber}${outputUnit}`,
    };
  }
}
