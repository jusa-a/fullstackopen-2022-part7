module.exports = {
    env: {
        browser: true,
        'jest/globals': true,
        'cypress/globals': true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['react', 'jest', 'cypress'],
    rules: {
        'react/prop-types': 0,
        'react/react-in-jsx-scope': 'off',
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
}
