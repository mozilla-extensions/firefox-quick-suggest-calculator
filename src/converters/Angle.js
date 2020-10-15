/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

class Angle extends SimpleUnitConverter {
  static UNITS = {
    degree: 1,
    d: 1,
    radian: Math.PI / 180.0,
    rad: Math.PI / 180.0,
    r: Math.PI / 180.0,
    gradian: 1 / 0.9,
    grad: 1 / 0.9,
    g: 1 / 0.9,
    minute: 60,
    m: 60,
    second: 3600,
    s: 3600,
    sign: 1 / 30.0,
    mil: 1 / 0.05625,
    revolution: 1 / 360.0,
    circle: 1 / 360.0,
    turn: 1 / 360.0,
    quadrant: 1 / 90.0,
    rightangle: 1 / 90.0,
    sextant: 1 / 60.0,
  };

  constructor() {
    super(Angle.UNITS);
  }
}
