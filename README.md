# Example Add-on Experiment

This is an example Firefox extension for an add-on experiment. It includes a
background script, a browser chrome mochitest, a small harness for testing
experiment extensions, and a package.json.

See also mythmon's [Normandy NextGen Study Example], another example of the same
type of extension. This repo, though, includes a test, and instead of building
one extension zip file per experiment branch, it handles two branches in the
same extension. It's also slightly geared toward people writing urlbar
extensions.

[Normandy NextGen Study Example]: https://github.com/mozilla/normandy-nextgen-study-example

## How to Use This

If you'd like, clone this repo to start your own experiment extension. At some
point, you should update the following files for your particular extension's
metadata:

* src/manifest.json
  * Update the `"name"`, `"version"`, `"description"`, `"applications.gecko"`,
    and `"browser_specific_settings.gecko"` entries
* tests/tests/browser/browser.ini
  * Update the zip filename in `support-files` (see [Testing] below for more)
* tests/tests/browser/browser_test.js
  * Update `ADDON_PATH` (see [Testing] below for more)
* package.json
  * Update the `"name"`, `"version"`, and `"description"` entries

If you aren't writing a urlbar extension, then also update these files:

* src/manifest.json
  * Remove `"urlbar"` from the `"permissions"` entry
* src/background.js
  * Remove the `browser.urlbar.engagementTelemetry.set()` line
* tests/tests/browser/browser_test.js
  * Remove the jsm module imports and their uses, and the
    `EVENT_TELEMETRY_PREF` definition and its uses

## Directory Structure

* **src/**
  * The extension's source files. When you build the extension with [web-ext],
    everything in this directory and nothing outside it are packaged in the zip.
* **tests/**
  * A browser chrome mochitest and head.js for testing the extension.  This
    directory looks the way it does so that it can be easily copied into your
    Firefox source tree. See below for more.
* **.eslintrc.js**
  * Configures [eslint]. We use the same rules as mozilla-central.
* **.gitignore**
  * gitignore config file copied from mozilla-central with a couple of
    additions.
* **.prettierrc**
  * Configures [prettier]. We use the same rules as mozilla-central.
* **package.json**
  * An [npm] package.json file. The main things this does are (1) configure
    web-ext and (2) declare npm dependencies, mostly so that you can run eslint.

[web-ext]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Getting_started_with_web-ext
[npm]: https://www.google.com/search?q=npm
[eslint]: https://www.google.com/search?q=eslint
[prettier]: https://www.google.com/search?q=prettier+eslint

## Running

You can use [web-ext] or [about:debugging]. Use web-ext while developing and
about:debugging if you're loading the extension as a one-off for some
reason. Both will load the add-on as a temporary add-on, so you'll need to use
Firefox Nightly, Developer Edition, or any other Firefox build that gives
privileges to temporarily installed add-ons.

[about:debugging]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Debugging

## Building

Use [web-ext] to build the add-on zip file.

## Testing

The tests directory contains a browser chrome mochitest and a head.js. The
head.js implements a simple framework for testing Normandy experiment add-on
files.

The requirements above for running the add-on apply to testing it, too. You'll
need either a Mozilla-signed version of the add-on; or Firefox Nightly,
Developer Edition, or any other Firefox build that gives privileges to
temporarily installed add-ons.

To run the test in a particular version of Firefox, you'll need to clone the
repo from which your Firefox was built. If you're testing in Nightly, you'll
need [mozilla-central]. If you're testing in Developer Edition or Beta, you'll
need [mozilla-beta].

Then:

1. `cd` into your example-addon-experiment clone.
2. Copy tests/* into srcdir/testing/extensions, where *srcdir* is the top-level
   directory of your Firefox repo:

       $ cp -R tests/* srcdir/testing/extensions

3. Build the add-on zip file using web-ext as described above:

       $ web-ext build

   Or use a signed copy of the zip file.

4. Copy the zip file into srcdir/testing/extensions/tests/browser:

       $ cp web-ext-artifacts/example_addon_experiment-1.0.0.zip srcdir/testing/extensions/tests/browser

5. Update `EXPECTED_ADDON_SIGNED_STATE` as necessary in
   srcdir/testing/extensions/tests/browser/browser_test.js.  If your zip file is
   unsigned, its value should be `AddonManager.SIGNEDSTATE_MISSING`. If it's
   signed, it should be `AddonManager.SIGNEDSTATE_PRIVILEGED`.

6. `cd` into your srcdir.
7. Run the test using mach:

       $ ./mach mochitest -f browser --appname <path to Firefox binary> testing/extensions/tests/browser/browser_test.js

   If your Firefox repo itself contains the Firefox binary (because you ran
   `mach build`), you can omit the `--appname` argument.

   If mach doesn't find the test, remove your objdir, `mach build`, and try
   again from step 1. (There's got to be a better way…)

[mozilla-central]: http://hg.mozilla.org/mozilla-central/
[mozilla-beta]: https://hg.mozilla.org/releases/mozilla-beta/

## Linting

This project uses the linting rules from mozilla-central. From your
example-addon-experiment directory, run:

    $ npm install
    $ npx eslint .
