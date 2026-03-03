import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
      'simple-import-sort/imports': [
        'warn',
        {
          groups: [
            // 1. Type imports
            ['^.*\\u0000$'],
            // 2. Node builtins and external packages
            ['^node:', '^[a-z]', '^@[a-z]'],
            // 3. Internal aliases (@/) and relative imports
            ['^@/', '^\\.'],
          ],
        },
      ],
      'simple-import-sort/exports': 'warn',
    },
  },
  {
    ignores: [
      '.next/',
      'src/payload-types.ts',
      'src/app/(payload)/admin/importMap.js',
      'src/migrations/',
      '**/*.json',
      '**/*.css',
      '**/*.scss',
    ],
  },
]

export default eslintConfig
