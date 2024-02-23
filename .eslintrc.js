module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'fsd-project',
  ],
  rules: {
    'react/jsx-indent': [2, 2],
    'react/jsx-indent-props': [2, 2],
    indent: [2, 2, { SwitchCase: 1 }],
    semi: ['error', 'never'],
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx'] },
    ],
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'react/require-default-props': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/function-component-definition': 'off',
    'no-shadow': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-underscore-dangle': 'off',
    // 'i18next/no-literal-string': ['error', {
    'i18next/no-literal-string': ['warn', {
      mode: 'jsx-text-only',
      'jsx-attributes': {
        exclude: ['theme', 'data-testid'],
      },
    }],
    'max-len': ['error', { code: 110, ignoreComments: true }],
    'react/destructuring-assignment': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-undef': 'off',
    'consistent-return': 'off',
    'lines-between-class-members': 'off',
    '@typescript-eslint/lines-between-class-members': ['error'],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': ['error'],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': ['error'],
    'no-dupe-class-members': 'off',
    '@typescript-eslint/no-dupe-class-members': ['error'],
    'default-case-last': 'off',
    'no-constructor-return': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/no-array-index-key': 'off',
    'arrow-body-style': 'off',
    'fsd-project/path-checker': ['error', { alias: '@', srcPath: 'src/frontend' }],
    'fsd-project/public-api-imports': ['error', {
      alias: '@',
      testFilesPatterns: ['**/*.test.ts', '**/*.test.tsx', '**/StoreDecorator.tsx'],
    }],
    'fsd-project/layer-imports': ['error', {
      alias: '@',
      srcPath: 'src/frontend',
      ignoreImportPatterns: ['**/StoreProvider', '**/testing'],
    }],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __SOCKETS_URL__: true,
  },
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
      rules: {
        'i18next/no-literal-string': 'off',
        'max-len': 'off',
      },
    },
  ],
  ignorePatterns: ['database/**/*'],
}
