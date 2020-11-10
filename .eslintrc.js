/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:mozilla/recommended",
  ],
  plugins: ["mozilla"],
  parserOptions: {
    ecmaVersion: 12,
  },
  overrides: [
    {
      files: ["src/*.js"],
      env: {
        browser: false,
        webextensions: true,
      },
    },
  ],
  ignorePatterns: ["api.js"]
}
