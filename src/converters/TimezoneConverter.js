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
    `^(${TimezoneConverter.TIME_REGEX}|now)\\s*(${TimezoneConverter.TIMEZONE_REGEX})?\\s+in\\s+(${TimezoneConverter.TIMEZONE_REGEX})`,
    "i"
  );
//  static QUERY_REGEX = new RegExp(
//    `^(${TimezoneConverter.TIME_REGEX})\\s*(${TimezoneConverter.TIMEZONE_REGEX})?\\s+in\\s+(${TimezoneConverter.TIMEZONE_REGEX})`,
//    "i"
//  );

  isActive(queryContext) {
    const regexResult = TimezoneConverter.QUERY_REGEX.exec(queryContext.searchString);
    if (!regexResult) {
      return false;
    }

    const inputTime = regexResult[1].toUpperCase();
    const inputTimezone = regexResult[6]?.toUpperCase();
    const outputTimezone = regexResult[7].toUpperCase();

    return (
      inputTime === "NOW"
      || !inputTimezone
      || TimezoneConverter.TIMEZONES[inputTimezone] !== undefined
    )
    && TimezoneConverter.TIMEZONES[outputTimezone] !== undefined;
  }

  startQuery(queryContext) {
    const regexResult = TimezoneConverter.QUERY_REGEX.exec(queryContext.searchString);
    const inputTime = regexResult[1].toUpperCase();
    const inputDate = new Date();
    let isMeridiemNeeded = false;
    if (inputTime !== "NOW") {
      const inputHours = Number(regexResult[2]);
      const inputMinutes = regexResult[4] ? Number(regexResult[4]) : 0;
      const inputAMPM = regexResult[5]?.toLowerCase() || "";
      const inputMeridianHourShift = inputAMPM === "pm" ? 12 : 0;
      inputDate.setHours(inputHours + inputMeridianHourShift);
      inputDate.setMinutes(inputMinutes);
      isMeridiemNeeded = !!inputAMPM;
    }

    const inputTimezone = regexResult[6]?.toUpperCase();
    const inputOffset = inputTimezone
      ? TimezoneConverter.TIMEZONES[inputTimezone] * 60
      : inputDate.getTimezoneOffset();
    const outputTimezone = regexResult[7].toUpperCase();
    const outputOffset = TimezoneConverter.TIMEZONES[outputTimezone] * 60;

    const outputDate = new Date(inputDate.getTime());
    outputDate.setMinutes(outputDate.getMinutes() - inputOffset + outputOffset);

    return {
      input: this.format(inputDate, inputTimezone, isMeridiemNeeded),
      equal: " = ",
      output: this.format(outputDate, outputTimezone, isMeridiemNeeded),
    };
  }

  format(date, timezone = "", isMeridiemNeeded) {
    let meridiem = ""
    if (isMeridiemNeeded) {
      if (date.getHours() > 12) {
        meridiem = "pm";
        date.setHours(date.getHours() - 12);
      } else {
        meridiem = "am";
      }
    }

    const time = date.toLocaleTimeString().slice(0 ,5);
    return `${time}${meridiem} ${timezone}`;
  }
}
