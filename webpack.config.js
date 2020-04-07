const path = require("path"); // 引入node的path模块

module.exports = {
  // 打包环境 development(开发环境)、production（生产环境）
  mode: "development",
  // （单）入口文件
  // entry: './src/index.js',
  // （多）入口文件
  entry: {
    index: "./src/index.jsx"
  },
  // 出口文件
  output: {
    // path.resolve() “掘金”内有具体知识点
    // __dirname是node.js中的一个全局变量，表示当前文件所在的目录
    path: path.resolve(__dirname, "dist"),
    // 出口文件名称
    filename: "bundle.js"
    // (多)出口文件名称
    // filename: '[name].bundle.js'
  },
  // webpack-dev-server 能够用于快速开发应用程序
  devServer: {
    // 一切服务都启用gzip 压缩
    compress: true,
    // 端口号
    port: 8080,
    // 默认打开页面
    open: true
  },
  module: {
    rules: [
      {
        test: /\.(m?js|jsx)$/,
        // 排除当前目录
        exclude: /(node_modules|bower_components)/,
        // 指定检查的目录
        include: [path.resolve(__dirname, "src")],
        use: [
          {
            // ES6、ES7转换成ES5版本
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              // JSX语法转化为ES5
              // plugins: ["@babel/plugin-transform-react-jsx"]
              plugins: ["@babel/plugin-proposal-class-properties"]
            }
          },
          {
            // eslint语法检测
            loader: "eslint-loader",
            options: {
              // 指定错误报告的格式规范
              formatter: require("eslint-friendly-formatter")
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.less$/,
        use: [
          // less语法转换成css
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "less-loader" }
        ]
      }
    ]
  }
};
