const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Ensure `.node` files and required extensions are handled
config.resolver.assetExts.push("node");

module.exports = withNativeWind(config, { input: "./global.css" });
