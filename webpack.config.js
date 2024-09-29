const path = require("node:path");

module.exports = {
    mode: "development",
    entry: {
      react: './front/practice/react/practiceFrontReact.tsx'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          use: [
            {loader: 'ts-loader'}
          ]
        }
      ]
    }
  };