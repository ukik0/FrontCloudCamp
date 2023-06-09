module.exports = {
    env: {browser: true, es2021: true},
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react-refresh', 'react-hooks'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        '@typescript-eslint/no-empty-interface': 'warn',
        'react-hooks/rules-of-hooks': 'off'
    }
};
