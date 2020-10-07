/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class Mass extends SimpleUnitConverter {
  static UNITS = {
    "kilogram": 1,
    "kg": 1,
    "gram": 1000,
    "g": 1000,
    "milligram": 1000000,
    "mg": 1000000,
    "ton": 0.000001,
    "t": 0.001,
    "longton": 0.0009842073,
    "l.t.": 0.0009842073,
    "l/t": 0.0009842073,
    "shortton": 0.0011023122,
    "s.t.": 0.0011023122,
    "s/t": 0.0011023122,
    "pound": 2.2046244202,
    "lbs": 2.2046244202,
    "lb": 2.2046244202,
    "ounce": 35.273990723,
    "oz": 35.273990723,
    "carat": 5000,
    "ffd": 5000,
  };

  constructor() {
    super(Mass.UNITS);
  }
}
