/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class SimpleUnitConverter {
  static NUMBER_REGEX = "\\d+(?:\\.\\d+)?\\s*";
  static UNIT_REGEX = "[A-Za-z0-9_./]+";
  static QUERY_REGEX = new RegExp(
    `^(${this.NUMBER_REGEX})(${this.UNIT_REGEX})\\s+in\\s+(${this.UNIT_REGEX})`,
    "i"
  );

  constructor(units) {
    this.units = units;
  }

  isActive(queryContext) {
    const regexResult = Length.QUERY_REGEX.exec(queryContext.searchString);
    if (!regexResult) {
      return false;
    }

    const inputUnit = regexResult[2].toLowerCase();
    const outputUnit = regexResult[3].toLowerCase();

    return this.units[inputUnit] && this.units[outputUnit];
  }

  startQuery(queryContext) {
    const regexResult = Length.QUERY_REGEX.exec(queryContext.searchString);
    const inputNumber = Number(regexResult[1]);
    const inputUnit = regexResult[2].toLowerCase();
    const outputUnit = regexResult[3].toLowerCase();
    const outputNumber = inputNumber / this.units[inputUnit] * this.units[outputUnit];

    return {
      inputValue: inputNumber,
      inputUnit: inputUnit,
      outputValue: outputNumber,
      outputUnit: outputUnit,
    };
  }
}
