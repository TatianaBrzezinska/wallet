module.exports = function override(config) {
  // Dodaj loader dla map źródłowych, aby ignorować błędy parsowania
  config.module.rules.push({
    test: /\.js$/,
    enforce: "pre",
    use: ["source-map-loader"],
    exclude: /node_modules/,
  });

  return config;
};
