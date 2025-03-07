const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const config = getDefaultConfig(__dirname);

// Apply NativeWind config
const nativeWindConfig = withNativeWind(config, { input: './global.css' });

// Wrap with Reanimated config
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
