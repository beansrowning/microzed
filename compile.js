var session = require("zed/session");
var fs = require("zed/fs");
var hexify = require("./hexlifyscript.js");
/*
var fm = require("./firmware.hex.js");
*/

/**
 * input: text from python script
 */
return function(data) {
  var path = data.path;
  var text = data.inputs.text;
  var hexpath = path.replace(/\.hex$/, ".py");
  var hex = hexify(text);
  /*
  var insertion = ":::::::::::::::::::::::::::::::::::::::::::";
  var combined = fm.base.replace(insertion, hex);
  */
  return fs.WriteFile(hexpath, text).then(function() {
    return session.flashMessage(path, "Compiled Successfully", 500);
  });
};
