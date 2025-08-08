import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: [
      'next/core-web-vitals',
      'next/typescript',
    ],
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
  }),
]

export default eslintConfig
