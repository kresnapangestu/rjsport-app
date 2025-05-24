const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    configure: (webpackConfig) => {
      // Add fallbacks for Node.js core modules
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        stream: false,
        crypto: false,
      };

      // Add PDF.js worker loader rule
      webpackConfig.module.rules.push({
        test: /pdf\.worker\.min\.js$/,
        type: "asset/resource",
        generator: {
          filename: "static/js/[name].[hash][ext]",
        },
      });

      return webpackConfig;
    },
  },
};
