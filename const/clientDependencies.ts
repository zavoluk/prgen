export default {
    dev: [
        '@types/react-dom',
        '@types/react',
        '@typescript-eslint/eslint-plugin',
        '@typescript-eslint/parser',
        'eslint-config-prettier',
        'eslint-plugin-prettier',
        'eslint-plugin-react',
        'eslint-plugin-simple-import-sort',
        'eslint-plugin-sort-destructure-keys',
        'eslint-plugin-sort-keys-fix',
        'eslint-plugin-typescript-sort-keys',
        'eslint',
        'html-webpack-plugin',
        'prettier',
        'rimraf',
        'terser-webpack-plugin',
        'ts-loader',
        'webpack-cli',
        'webpack-dev-server',
        'webpack'
    ],
    general: ['react', 'react-dom', 'typescript'],
    types: {
        'styled-components': '@types/styled-components'
    } as const
};
