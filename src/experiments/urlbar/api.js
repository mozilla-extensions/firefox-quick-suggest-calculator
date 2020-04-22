/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global ExtensionAPI */

"use strict";

const { XPCOMUtils } = ChromeUtils.import(
  "resource://gre/modules/XPCOMUtils.jsm"
);

XPCOMUtils.defineLazyModuleGetters(this, {
  UrlbarProviderExtension: "resource:///modules/UrlbarProviderExtension.jsm",
  UrlbarResult: "resource:///modules/UrlbarResult.jsm",
});

let { EventManager, EventEmitter } = ExtensionCommon;

this.experiments_urlbar = class extends ExtensionAPI {
  getAPI(context) {
    return {
      experiments: {
        urlbar: {
          addDynamicResultType({ type, viewTemplate } = {}) {
            if (viewTemplate.stylesheet) {
              viewTemplate.stylesheet =
                context.extension.baseURI.resolve(viewTemplate.stylesheet);
            }
            UrlbarResult.addDynamicResultType({ type, viewTemplate });
          },

          onViewUpdateRequested: new EventManager({
            context,
            name: "experiments.urlbar.onViewUpdateRequested",
            register: (fire, providerName) => {
              let provider = UrlbarProviderExtension.getOrCreate(providerName);
              provider.setEventListener(
                "getViewUpdate",
                result => {
                  return fire.async(result.payload).catch(error => {
                    throw context.normalizeError(error);
                  });
                }
              );
              return () => provider.setEventListener("getViewUpdate", null);
            },
          }).api(),
        },
      },
    };
  }
};
