/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const DYNAMIC_TYPE_NAME = "dynamicUnitConversion";

const LENGTH = {
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

const NUMBER_REGEX = "^\\d+(?:\\.\\d+)?\\s*";
const UNIT_REGEX = "\\w+";
const QUERY_REGEX = `(${NUMBER_REGEX})(${UNIT_REGEX})\\s+in\\s+(${UNIT_REGEX})`;

class UnitConverter extends UrlbarProvider {
  constructor() {
    super();
    UrlbarResult.addDynamicResultType(DYNAMIC_TYPE_NAME);
    UrlbarView.addDynamicViewTemplate(DYNAMIC_TYPE_NAME, {
      stylesheet: "data/style.css",
      attributes: {
        role: "group",
      },
      children: [
        {
          name: "info",
          tag: "div",
          children: [
            {
              name: "input",
              tag: "span",
            },
            {
              name: "equal",
              tag: "span",
            },
            {
              name: "output",
              tag: "span",
            },
          ],
        },
      ]
    });
  }

  get name() {
    return "UnitConverter";
  }

  getPriority(queryContext) {
    return 0;
  }

  async isActive(queryContext) {
    const regexResult = queryContext.searchString.match(QUERY_REGEX);
    if (!regexResult) {
      return false;
    }

    const inputUnit = regexResult[2];
    const outputUnit = regexResult[3];

    return LENGTH[inputUnit] && LENGTH[outputUnit];
  }

  getViewUpdate(result) {
    const viewUpdate = {
      input: {
        textContent: result.payload.input,
      },
      equal: {
        textContent: result.payload.equal,
      },
      output: {
        textContent: result.payload.output,
      },
    };

    return viewUpdate;
  }

  async startQuery(queryContext, addCallback) {
    const regexResult = queryContext.searchString.match(QUERY_REGEX);
    const inputNumber = Number(regexResult[1]);
    const inputUnit = regexResult[2];
    const outputUnit = regexResult[3];
    const outputNumber = inputNumber / LENGTH[inputUnit] * LENGTH[outputUnit];

    const result = new UrlbarResult(
      UrlbarUtils.RESULT_TYPE.DYNAMIC,
      UrlbarUtils.RESULT_SOURCE.OTHER_NETWORK,
      {
        input: `${inputNumber}${inputUnit}`,
        output: `${outputNumber}${outputUnit}`,
        equal: " = ",
        dynamicType: DYNAMIC_TYPE_NAME,
      }
    );
    result.suggestedIndex = 1;
    addCallback(this, result);
  }

  cancelQuery(queryContext) {
    console.log("cancelQuery!", result);
  }

  pickResult(result) {
    console.log("Result picked!", result);
  }
}

(async function() {
  addProvider(new UnitConverter());
})();
