# Extension Firefox URL Calculator

This repo contains the code and tools to build a WebExtension that
enables calculations to be evaluated when entered in the Url Bar.

## Install

These instructions will only work in Firefox Nightly:

  1. In `about:config` make sure `extensions.experiments.enabled` is `true`.
  2. Download [web-ext-artifacts/urlbar_calculator-1.0.zip](web-ext-artifacts/urlbar_calculator-1.0.zip)
  3. Visit `about:debugging`, click on "This Nightly" then "Load Temporary Add-on", choose the downloaded file.


## Development

To install and develop the extension locally:

  1. `git clone git@github.com:daleharvey/dynamic-calculator-extension.git`
  2. `npm install`
  3. `npm start`

An instance of nightly should open with the extension enabled. If you
change any files the extension should automatically reload.

## Demo Video
[![Demo Video of Calculator](http://i3.ytimg.com/vi/VymUAUKvjAU/maxresdefault.jpg)](https://www.youtube.com/watch?v=VymUAUKvjAU)
