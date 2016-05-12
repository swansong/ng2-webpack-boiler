module.exports = function() {
  var config = (process.argv.indexOf('config') !== -1);
  var boiler = (process.argv.indexOf('boiler') !== -1);

  var fs = require('fs');
  
  if (boiler) {
    return hardCopyAll();
  }

  if (config) {
    return copySampleConfig();
  }

  return printHelp();

  function printHelp() {
    process.stdout.write('This utility keeps your webpack build up to date and provides an Angular app boilerplate to start from.');
    process.stdout.write('It accepts two arguments: "config" and "boiler"');
    process.stdout.write('"ng2-webpack boiler" will install the app and build boilerplate code into your current directory');
    process.stdout.write('"ng2-webpack config" will create/update a sample.webpack.config.js file with the latest build goodness so you can see what is new');
    return;
  }

  function copySampleConfig() {
    process.stdout.write('copying sample webpack config for comparison purposes');
    fs.createReadStream(__filename + 'webpack.config.js').pipe(fs.createWriteStream('sample.webpack.config.js'));
  }

  function copyBoilerplateBuild() {
    var locations = ['entry', 'config', 'app', 'webpack.config.js'];
    var test = false;
    var index = 0;

    process.stdout.write('preparing to copy webpack config and app boilerplate into your project');

    while (index < locations.length && !test) {
      test = checkIfExists(location[index]);
      index++;
    }

    if (test instanceOf Error) {
      process.stdout.write('something went wrong, aborting. Error: ', test);
    }
    else if (test) {
      process.stdout.write('this is a hard copy and will overwrite your app, entry, and config directories, as well as your webpack.config.js file. Continue? y/n');
      process.stdin.once('data', function (text) {
        text = text.trim();
        if (text == 'y' || text == 'Y' || text == 'yes' || text == 'Yes') {
          hardCopyAll(locations);
        }
        else {
          process.stdout.write('aborting');
        }
      });
    }
    else {
      hardCopyAll(locations);
    }
  }

  function checkIfExists(location) {
    try {
      fs.lstatSync(location);
      return true;
    }
    catch (err) {
      if (err.code == 'ENOENT') return false;
      return err;
    }
  }
  
  function hardCopyAll() {
    var ncp = require('ncp').ncp;

    for (var i = 0; i < locations.length; i++) {  
      ncp(__filename + locations[i], locations[i], function (err) {
        if (err) process.stdout.write(err);
      } 
    }
  }
}
