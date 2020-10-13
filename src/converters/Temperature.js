/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class Temperature extends SimpleUnitConverter {
  static UNITS = {
    "celsius": 1,
    "c": 1,
    "kelvin": 274.15,
    "k": 274.15,
    "fahrenheit": 33.8,
    "f": 33.8,
  };

  constructor() {
    super(Temperature.UNITS);
  }
}
