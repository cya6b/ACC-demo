module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": "plugin:vue/vue3-essential",
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "allowImportExportEverywhere": true
    },
    "plugins": [
        "vue"
    ],
    "rules": {
       // allow async-await
       'generator-star-spacing': 'off',
       // allow  during development
       //   'no-': (process.env.NODE_ENV === 'production') ? 'error' : 'off',
       // 禁止 function 定义中出现重名参数
       "no-dupe-args": ["error"],
       // 禁止与 -0 进行比较
       "no-compare-neg-zero": ["error"],
       // 禁止对象字面量中出现重复的 key
       "no-dupe-keys": ["error"],
       // 禁止出现重复的 case 标签
       "no-duplicate-case": ["error"],
       // 禁止在字符串和注释之外不规则的空白
       "no-irregular-whitespace": ["error"],
       // 禁用 debugger
       "no-debugger": ["error"],
       // 禁用 console
       "no-console": ["error", { allow: ["warn", "error"] }],
       // 禁止不必要的分号
       "no-extra-semi": ["error"],
       // 禁止在正则表达式中使用空字符集
       "no-empty-character-class": ["error"],
       // 禁止对 catch 子句的参数重新赋值
       "no-ex-assign": ["error"],
       // 禁止对 function 声明重新赋值
       "no-func-assign": ["warn"],
       // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
       "no-invalid-regexp": ["error", { "allowConstructorFlags": [] }],
       // 禁止把全局对象作为函数调用
       "no-obj-calls": ["error"],
       // 禁止正则表达式字面量中出现多个空格
       "no-regex-spaces": ["error"],
       // 禁止出现令人困惑的多行表达式
       "no-unexpected-multiline": ["error"],
       // 禁止对关系运算符的左操作数使用否定操作符
       "no-unsafe-negation": ["error"],
       // 要求使用 isNaN() 检查 NaN
       "use-isnan": ["error"],
       // 要求 switch 语句中有 default 分支
       "default-case": ["error"],
       // 要求使用 === 和 !==
       "eqeqeq": ["warn"],
       // 不允许在 case 子句中使用词法声明
       "no-case-declarations": ["error"],
       // 禁止使用空解构模式
       "no-empty-pattern": ["error"],
       // 禁止对原生对象或只读的全局对象进行赋值
       "no-global-assign": ["error"],
       // 禁止重新声明变量
       "no-redeclare": ["error", { "builtinGlobals": true }],
       // 禁止自我赋值
       "no-self-assign": ["error", { props: true }],
       // 禁用出现未使用过的标
       "no-unused-labels": ["error"],
       // 禁用不必要的转义字符
       "no-useless-escape": ["error"],
       // 强制在parseInt()使用基数参数
       "radix": ["error"],
       // 禁止或强制在代码块中开括号前和闭括号后有空格
       "block-spacing": ["error", "never"],
       // 强制在代码块中使用一致的大括号风格
       "brace-style": ["error", "1tbs",],
       // 强制在逗号前后使用一致的空格
       "comma-spacing": ["error", { "before": false, "after": true }],
       // 禁用 tab
       "no-tabs": ["error"],
       // 要求操作符周围有空格
       "space-infix-ops": ["error"],
       // 强制在一元操作符前后使用一致的空格
       "space-unary-ops": ["error", { "words": true, "nonwords": false }],
       // 强制在注释中 // 或 /* 使用一致的空格
       "spaced-comment": ["error", "always"],
       /**
        * ECMAScript 6
        */
       "arrow-spacing": ["error", { "before": true, "after": true }], // 强制箭头函数的箭头前后使用一致的空格
       "no-var": ["error"], // 要求使用 let 或 const 而不是 var
       "object-shorthand": ["error", "always"], // 要求或禁止对象字面量中方法和属性使用简写语法
    }
}
