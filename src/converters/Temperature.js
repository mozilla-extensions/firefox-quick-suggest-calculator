/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class Temperature {
  static UNITS = [
    "celsius",
    "c",
    "kelvin",
    "k",
    "fahrenheit",
    "f",
  ];

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

    const inputUnit = regexResult[2].toLowerCase();
    const outputUnit = regexResult[3].toLowerCase();

    return Temperature.UNITS.includes(inputUnit) && Temperature.UNITS.includes(outputUnit);
  }

  startQuery(queryContext) {
    const regexResult = Length.QUERY_REGEX.exec(queryContext.searchString);
    const inputNumber = Number(regexResult[1]);
    const inputUnit = regexResult[2].toLowerCase();
    const outputUnit = regexResult[3].toLowerCase();
    const inputChar = inputUnit.charAt(0);
    const outputChar = outputUnit.charAt(0);

    let outputNumber;
    if (inputChar === outputChar) {
      outputNumber = inputNumber;
    } else {
      outputNumber = this[`${inputChar}2${outputChar}`](inputNumber);
    }

    return {
      inputValue: inputNumber,
      inputUnit: inputUnit,
      outputValue: outputNumber,
      outputUnit: outputUnit,
    };
  }

  c2k(t) {
    return t + 273.15;
  }

  c2f(t) {
    return t * 1.8 + 32;
  }

  k2c(t) {
    return t - 273.15;
  }

  k2f(t) {
    return this.c2f(this.k2c(t));
  }

  f2c(t) {
    return (t - 32) / 1.8;
  }

  f2k(t) {
    return this.c2k(this.f2c(t));
  }
}
