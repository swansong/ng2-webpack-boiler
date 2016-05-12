#!/usr/bin/env node

var config = (process.argv.indexOf('--config') !== -1);
var boiler = (process.argv.indexOf('--boiler') !== -1);

var fs = require('fs');
var path = require('path');
var ncp = require('ncp').ncp;

var parentRoot = path.resolve(__dirname).split('/node_modules')[0] + '/';
var thisRoot = path.resolve(__dirname) + '/';

if (config) {
  copySampleConfig();
}
else if (boiler) {
  copyBoilerplateBuild();
}
else {
  printHelp();
}

function printHelp() {
  console.log('This utility helps keep your webpack build up to date and provides an Angular app boilerplate to start from. It recongnizes two arguments: "--config" and "--boiler"');
  console.log('"ng2-webpack --boiler" will install the app and build boilerplate code into your current directory');
  console.log('"ng2-webpack --config" will create/update a sample.webpack.config.js file with the latest build goodness so you can see what is new');
}

function copySampleConfig() {
  console.log('copying sample webpack config for comparison purposes');
  fs.createReadStream(thisRoot + 'webpack.config.js').pipe(fs.createWriteStream(parentRoot + 'sample.webpack.config.js'));
}

function copyBoilerplateBuild() {
  var locations = ['entry', 'config', 'app', 'webpack.config.js', 'shims.d.ts', 'tsconfig.json'];
  var test = false;
  var index = 0;

  console.log('preparing to copy webpack config and app boilerplate into your project');

  while (index < locations.length && !test) {
    test = checkIfExists(parentRoot + locations[index]);
    index++;
  }

  if (test instanceof Error) {
    console.log('something went wrong, aborting. Error: ', test);
  }
  else if (test) {
    process.stdout.write('this is a hard copy and will overwrite your app, entry, and config directories, as well as your webpack.config.js, shims.d.ts and tsconfig.json files. Continue? (y/n) ');
    process.stdin.once('data', function (buffer) {
      var text = buffer.toString().trim().toLowerCase();
      if (text === 'y' || text === 'yes') {
        hardCopyAll(locations, process.exit);
      }
      else {
        console.log('aborting');
        process.exit();
      }
    });
  }
  else {
    hardCopyAll(locations);
  }
}

function checkIfExists(fullPath) {
  try {
    fs.lstatSync(fullPath);
    return true;
  }
  catch (err) {
    if (err.code == 'ENOENT') return false;
    return err;
  }
}

function hardCopyAll(locations, callback) {
  if (!locations.length) callback();
  var current = locations.shift();
  ncp(thisRoot + current, parentRoot + current, function (err) {
    if (err) console.log('error copying file ' + current, err);
    hardCopyAll(locations, callback);
  }); 
}
