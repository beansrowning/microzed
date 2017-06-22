var session = require("zed/session");
var fs = require("zed/fs");
var hexify = require("./hexlifyscript.js");
var fm = require("./firmware.hex");

/**
 * input: text from python script
 */
return function(data) {
  var path = data.path;
  var text = data.inputs.text;
  var hexpath = path.replace(/\.hex$/, ".py");
  var hex = hexify.hexlifyScript(text);
  var insertion = ":::::::::::::::::::::::::::::::::::::::::::";
  var combined = fm.replace(insertion, hex);
  return fs.WriteFile(hexpath, combined).then(function() {
    return session.flashMessage(path, "Compiled Successfully", 500);
  });
};
