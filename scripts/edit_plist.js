#!/usr/bin/env node
'use strict';

// Add supported languages for App Store (iTunes)
// v1.0.6
// Automatically adds supported languages to your iOS app
// within the info.plist file after the `prepare` command.

const fs = require('fs');
const path = require('path');
const plist = require('plist');

module.exports = context => {
  const ConfigParser = context.requireCordovaModule('cordova-common').ConfigParser;

  return new Promise((resolve, reject) => {
    let mainConfig = new ConfigParser(path.resolve(context.opts.projectRoot, 'config.xml'));
    let name = mainConfig.name();
    let plistPath = path.join(context.opts.projectRoot, 'platforms', 'ios', name, `${name}-Info.plist`);

    fs.readFile(plistPath, 'utf-8', (err, data) => {
      if (err) return reject(err);
      let infoPlist = plist.parse(data);

      fs.writeFile(plistPath, plist.build(infoPlist), err => {
        if (err) return reject();
        resolve();
      });
    });
  });
};
