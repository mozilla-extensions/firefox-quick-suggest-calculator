/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

"use strict";

this.experiments_clipboard = class extends ExtensionAPI {
  getAPI(context) {
    const { Services } = Cu.import("resource://gre/modules/Services.jsm");
    return {
      experiments: {
        clipboard: {
          copy(text) {
            const ssText = Cc[
              "@mozilla.org/supports-string;1"
            ].createInstance(Ci.nsISupportsString);
            ssText.data = text;
            const transferable = Cc[
              "@mozilla.org/widget/transferable;1"
            ].createInstance(Ci.nsITransferable);
            transferable.init(null);
            transferable.addDataFlavor("text/unicode");
            transferable.setTransferData("text/unicode", ssText, ssText.data.length * 2);
            Services.clipboard.setData(
              transferable,
              null,
              Ci.nsIClipboard.kGlobalClipboard
            );
          },
        },
      },
    };
  }
}
