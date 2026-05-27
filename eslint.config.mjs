import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import typescript from 'eslint-config-next/typescript'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...typescript,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      indent: ['error', 2, { 'SwitchCase': 1 }],
      'linebreak-style': ['error', 'unix'],
      quotes: ['error', 'single'],
      semi: ['error', 'never'],
      'max-len': ['error', { code: 120, tabWidth: 2 }],
      'no-trailing-spaces': 'error',
      'no-tabs': 'error',
      'no-multi-spaces': 'error',
      'no-restricted-imports': ['error', { 'patterns': ['../**/*', './**/*'] }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {
        'vars': 'all',
        'args': 'after-used',
        'ignoreRestSiblings': true,
        'varsIgnorePattern': '^_',
        'argsIgnorePattern': '^_'
      }],
      'eol-last': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always', { 'arraysInObjects': true, 'objectsInObjects': false }]
    },
  },
])

export default eslintConfig
