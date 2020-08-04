module.exports = {
    extends: ['plugin:@typescript-eslint/recommended', 'prettier/@typescript-eslint', 'plugin:prettier/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
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
        'import/first': 'off',
        'import/newline-after-import': 'off',
        'import/no-duplicates': 'off',

        'newline-before-return': 'warn',

        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
            { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] }
        ],
        'simple-import-sort/sort': 'error',
        'simple-import-sort/sort': [
            'warn',
            {
                groups: [['^\\u0000'], ['^@?\\w']]
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
