module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    plugins: ['jest'],
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module",
        ecmaVersion: 2017,
    },
    "rules": {
        'indent': [
          'error',
          2,
          { 'MemberExpression': 'off'}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single",
            {"avoidEscape": true}
        ],
        "semi": [
            "error",
            "never"
        ],
        "no-console": "off"
    }
};
