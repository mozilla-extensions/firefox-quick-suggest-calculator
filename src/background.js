/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

/* import-globals-from shim.js */
/* global Calculator */

const DYNAMIC_TYPE_NAME = "dynamicCalculator";

class DynamicCalculator extends UrlbarProvider {
  constructor() {
    super();
    UrlbarResult.addDynamicResultType(DYNAMIC_TYPE_NAME);
    UrlbarView.addDynamicViewTemplate(DYNAMIC_TYPE_NAME, {
      stylesheet: "data/style.css",
      attributes: {
        role: "group",
        title: "Copy to clipboard",
      },
      children: [
        {
          name: "content",
          tag: "div",
          attributes: {
            role: "button",
            title: "Copy to clipboard",
          },
          children: [
            {
              name: "icon",
              tag: "img",
            },
            {
              name: "outputValue",
              tag: "span",
            },
            {
              name: "outputAction",
              tag: "span",
            },
          ],
        },
      ],
    });
  }

  get name() {
    return DYNAMIC_TYPE_NAME;
  }

  getPriority(queryContext) {
    return 0;
  }

  isActive(queryContext) {
    try {
      this._postfix = Calculator.infix2postfix(queryContext.searchString);
      return true;
    } catch (e) {
      return false;
    }
  }

  getViewUpdate(result) {
    const viewUpdate = {
      icon: {
        attributes: {
          src: "chrome://browser/skin/edit-copy.svg",
        },
      },
      outputValue: {
        textContent: `= ${result.payload.outputValue}`,
      },
      outputAction: {
        textContent: "Copy to clipboard",
      },
    };

    return viewUpdate;
  }

  startQuery(queryContext, addCallback) {
    let outputValue = Calculator.evaluatePostfix(this._postfix);
    const result = new UrlbarResult(
      UrlbarUtils.RESULT_TYPE.DYNAMIC,
      UrlbarUtils.RESULT_SOURCE.OTHER_NETWORK,
      {
        outputValue,
        dynamicType: DYNAMIC_TYPE_NAME,
      }
    );
    result.suggestedIndex = 1;
    addCallback(this, result);
  }

  cancelQuery(queryContext) {}

  async pickResult({ payload }) {
    browser.experiments.clipboard.copy(payload.outputValue + "");
  }
}

(async function() {
  addProvider(new DynamicCalculator());
})();
