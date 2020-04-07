module.exports = {
  root: true, // 作用的目录是根目录
  extends: [
    'standard', // 继承标准规则
    "eslint:recommended",
    "plugin:react/recommended" //增加
  ],
  plugins: [
    'html', // 使用eslint-plugin-html
    'react'
  ],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: 'module', // 按照模块的方式解析
    ecmaVersion: 6, // 指定ECMAScript支持的版本，6为ES6  
    ecmaFeatures : {
      jsx: true // 启动JSX
    }
  },
  env: {
    browser: true, // 开发环境配置表示可以使用浏览器的方法
    node: true, //
    es6: true
  },
  rules: { // 重新覆盖 extends: 'standard'的规则
    // 自定义的规则
    "indent": ['error', 2], // error类型，缩进2个空格
    'space-before-function-paren': 0, // 在函数左括号的前面是否有空格
    'eol-last': 0, // 不检测新文件末尾是否有空行
    'semi': ['error', 'always'], // 必须在语句后面加分号
    "quotes": ["error", "double"], // 字符串没有使用单引号
    "arrow-parens": 0,
    "no-new": 0, //允许使用 new 关键字
    "no-debugger": 2,
    "linebreak-style": ["off", "windows"],
    "generator-star-spacing": [0],
    "consistent-return": [0],
    "react/forbid-prop-types": [0],
    "global-require": [1],
    "import/prefer-default-export": [0],
    "react/jsx-no-bind": [0],
    "react/prop-types": [0],
    "react/prefer-stateless-function": [0],
    "react/no-find-dom-node": "off",
    "no-else-return": [0],
    "no-restricted-syntax": [0],
    "no-new-func": 0,
    "no-continue": 0,
    "no-eval": ["error", {
      "allowIndirect": true
    }],
    "import/no-extraneous-dependencies": [0],
    "no-use-before-define": [0],
    "jsx-a11y/no-static-element-interactions": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/anchor-is-valid": [0],
    "jsx-a11y/label-has-for": [0],
    "no-nested-ternary": [0],
    "arrow-body-style": [0],
    "import/extensions": [0],
    "no-bitwise": [0],
    "no-cond-assign": [0],
    "import/no-unresolved": [0],
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "object-curly-newline": [0],
    "function-paren-newline": [0],
    "no-restricted-globals": [0],
    "require-yield": [1],
    "func-names": 0,
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "max-len": [1, 200],
    "no-underscore-dangle": [0],
    "no-template-curly-in-string": [1]
  },
}
