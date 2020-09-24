/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class TimezoneConverter {
  static TIMEZONES = {
    "IDLW": -12,
    "NT": -11,
    "HST": -10,
    "AKST": -9,
    "PST": -8,
    "AKDT": -8,
    "MST": -7,
    "PDT": -7,
    "CST": -6,
    "MDT": -6,
    "EST": -5,
    "CDT": -5,
    "EDT": -4,
    "AST": -4,
    "GUY": -3,
    "ADT": -3,
    "AT": -2,
    "UTC": 0,
    "GMT": 0,
    "Z": 0,
    "WET": 0,
    "WEST": 1,
    "CET": 1,
    "BST": 1,
    "IST": 1,
    "CEST": 2,
    "EET": 2,
    "EEST": 3,
    "MSK": 3,
    "MSD": 4,
    "ZP4": 4,
    "ZP5": 5,
    "ZP6": 6,
    "WAST": 7,
    "AWST": 8,
    "WST": 8,
    "JST": 9,
    "ACST": 9.5,
    "ACDT": 10.5,
    "AEST": 10,
    "AEDT": 11,
    "NZST": 12,
    "IDLE": 12,
    "NZD": 13,
  }

  static TIME_REGEX = "(1[0-2]|0?[1-9])(:([0-5][0-9]))?\\s*([ap]m)?";
  static TIMEZONE_REGEX = "\\w+";
  static QUERY_REGEX = new RegExp(
    `^(${TimezoneConverter.TIME_REGEX})\\s*(${TimezoneConverter.TIMEZONE_REGEX})\\s+in\\s+(${TimezoneConverter.TIMEZONE_REGEX})`,
    "i"
  );

  isActive(queryContext) {
    const regexResult = TimezoneConverter.QUERY_REGEX.exec(queryContext.searchString);
    if (!regexResult) {
      return false;
    }

    const inputUnit = regexResult[6].toUpperCase();
    const outputUnit = regexResult[7].toUpperCase();

    return TimezoneConverter.TIMEZONES[inputUnit] !== undefined && TimezoneConverter.TIMEZONES[outputUnit] !== undefined;
  }

  startQuery(queryContext) {
    const regexResult = TimezoneConverter.QUERY_REGEX.exec(queryContext.searchString);
    const inputHours = Number(regexResult[2]);
    const inputMinutes = regexResult[4] ? Number(regexResult[4]) : 0;
    const inputAMPM = regexResult[5]?.toLowerCase() || "";
    const inputMeridianHourShift = inputAMPM === "pm" ? 12 : 0;
    const inputAbsoluteMinutes = (inputHours + inputMeridianHourShift) * 60 + inputMinutes;

    const inputUnit = regexResult[6].toUpperCase();
    const outputUnit = regexResult[7].toUpperCase();

    const outputAbsoluteMinutes =
      inputAbsoluteMinutes - TimezoneConverter.TIMEZONES[inputUnit] * 60 + TimezoneConverter.TIMEZONES[outputUnit] * 60;

    let outputHours = parseInt(outputAbsoluteMinutes / 60);
    if (outputHours < 0) {
      outputHours += 24;
    } else if (outputHours > 24) {
      outputHours -= 24;
    }

    let outputAMPM = "";
    if (inputAMPM) {
      outputAMPM = outputHours > 12 ? "pm" : "am";
      outputHours = outputHours > 12 ? outputHours - 12 : outputHours;
    }

    let outputMinutes = outputAbsoluteMinutes % 60;
    outputMinutes = outputMinutes < 10 ? "0" + outputMinutes : outputMinutes;

    return {
      input: `${inputHours}:${inputMinutes < 10 ? "0" + inputMinutes : inputMinutes}${inputAMPM} ${inputUnit}`,
      equal: " = ",
      output: `${outputHours}:${outputMinutes}${outputAMPM} ${outputUnit}`,
    };
  }
}
