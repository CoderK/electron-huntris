module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ],
    "globals": {
        "describe": false,
        "before": false,
        "after": false,
        "beforeEach": false,
        "afterEach": false,
        "it": false,
        "sinon": false
    },
    rules: {
        "strict": 0,
        "comma-dangle": ["error", "never"],
        "indent": ["error", 4, { "SwitchCase": 1, "VariableDeclarator": 2 }],
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "default-case": ["error", { "commentPattern": "^skip\\sdefault" }],
        "func-names": 0,
        "no-alert": 0,
        "no-param-reassign": 0,
        "no-underscore-dangle": 0,
        "spaced-comment": 0,
        "no-unused-expressions": 0,
        "no-use-before-define": 0,
        "react/sort-comp": 0,
        "react/jsx-indent": 0,
        "react/jsx-indent-props": 0,
        "react/jsx-first-prop-new-line": 0,
        "jsx-quotes": 0
    }
};