require("@babel/register")({
    presets: ["@babel/preset-env"]
});
require("@babel/polyfill");

require("@babel/core").transform("code", {
    plugins: ["@babel/plugin-transform-runtime"],
});

// Import the rest of our application.

module.exports = require('./index.js')