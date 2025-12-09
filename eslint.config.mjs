import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'

const eslintConfig = defineConfig([
  ...nextVitals,
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
      'eol-last': 'error',
      'comma-spacing': ['error', { 'before': false, 'after': true }],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always', { 'arraysInObjects': true, 'objectsInObjects': false }]
    },
  },
])

export default eslintConfig
