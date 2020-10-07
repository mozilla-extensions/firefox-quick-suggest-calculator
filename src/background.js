/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

const DYNAMIC_TYPE_NAME = "dynamicConversion";

const CONVERTERS = [
  new Length(),
  new Mass(),
  new Timezone(),
];

class DynamicConverter extends UrlbarProvider {
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
              name: "inputValue",
              tag: "span",
            },
            {
              name: "inputUnit",
              tag: "span",
            },
            {
              name: "equal",
              tag: "span",
            },
            {
              name: "outputValue",
              tag: "span",
            },
            {
              name: "outputUnit",
              tag: "span",
            },
          ],
        },
      ]
    });
  }

  get name() {
    return "DynamicConverter";
  }

  getPriority(queryContext) {
    return 0;
  }

  isActive(queryContext) {
    for (const converter of CONVERTERS) {
      if (converter.isActive(queryContext)) {
        return true;
      }
    }

    return false;
  }

  getViewUpdate(result) {
    const viewUpdate = {
      inputValue: {
        textContent: result.payload.inputValue,
      },
      inputUnit: {
        textContent: result.payload.inputUnit,
      },
      outputValue: {
        textContent: result.payload.outputValue,
      },
      outputUnit: {
        textContent: result.payload.outputUnit,
      },
      equal: {
        textContent: "=",
      },
    };

    return viewUpdate;
  }

  startQuery(queryContext, addCallback) {
    for (const converter of CONVERTERS) {
      if (converter.isActive(queryContext)) {
        const {
          inputValue,
          inputUnit,
          outputValue,
          outputUnit,
        } = converter.startQuery(queryContext);

        const result = new UrlbarResult(
          UrlbarUtils.RESULT_TYPE.DYNAMIC,
          UrlbarUtils.RESULT_SOURCE.OTHER_NETWORK,
          {
            inputValue,
            inputUnit,
            outputValue,
            outputUnit,
            dynamicType: DYNAMIC_TYPE_NAME,
          }
        );
        result.suggestedIndex = 1;
        addCallback(this, result);
        return;
      }
    }
  }

  cancelQuery(queryContext) {}

  pickResult(result) {
    console.log("Result picked!", result);
  }
}

(async function() {
  addProvider(new DynamicConverter());
})();
