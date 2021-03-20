module.exports = {
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.spec.json"
    },
    "env": {
        "es6": true
    },
    "plugins": [
        "@typescript-eslint",
        "functional"
    ],
    "extends": [
        "eslint:recommended",
        'plugin:prettier/recommended',
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",

        "plugin:@typescript-eslint/recommended-requiring-type-checking",
    ]
};
