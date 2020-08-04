module.exports = {
    env: {
        browser: true,
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],

    parser: '@typescript-eslint/parser',
    // Specifies the ESLint parser
    parserOptions: {
        // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        },
        ecmaVersion: 2020,
        // Allows for the parsing of modern ECMAScript features
        sourceType: 'module'
    },
    plugins: [
        '@typescript-eslint',
        'prettier',
        'simple-import-sort',
        'typescript-sort-keys',
        'sort-keys-fix',
        'sort-destructure-keys'
    ],
    rules: {
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'eol-last': ['error', 'always'],
        'import/first': 'off',
        'import/newline-after-import': 'off',
        'import/no-duplicates': 'off',
        'newline-before-return': 'error',
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
            { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
        ],
        quotes: ['error', 'single'],
        'simple-import-sort/sort': [
            'warn',
            {
                groups: [['^react$'], ['^\\u0000']]
            }
        ],
        'sort-destructure-keys/sort-destructure-keys': 2,
        'sort-imports': 'off',
        'sort-keys-fix/sort-keys-fix': 'error',
        'typescript-sort-keys/interface': [
            'error',
            'asc',
            { caseSensitive: true, natural: false, requiredFirst: false }
        ],
        'typescript-sort-keys/string-enum': ['error', 'asc', { caseSensitive: true }]
    }
};
