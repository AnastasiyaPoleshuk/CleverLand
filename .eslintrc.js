module.exports = {
    extends: [require.resolve('arui-presets-lint/eslint'), 'plugin:react/jsx-runtime'],
    parserOptions: {
        project: ['./tsconfig.eslint.json',/* './cypress/tsconfig.json' */],
    },

    overrides: [
        {
            files: ['config/**/*.ts', 'src/global-definitions.d.ts', 'src/libs.d.ts'],
            rules: {
                'import/no-default-export': 'off',
            },
        },
    ],
    rules: {
        // 'import/no-extraneous-dependencies': [
        //     'error',
        //     {
        //         // TODO: добавить после cypess 'cypress/**/*.ts',
        //         devDependencies: ['**/*.test.{ts,tsx,js,jsx}'],
        //     },
        // ],
        'import/no-default-export': 'error',
        indent: 'off', // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/indent.md
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^action' }],
        '@typescript-eslint/no-unused-expressions': 'off',
        'no-nested-ternary': 'off',
        'no-unneeded-ternary': 'off',
        'no-negated-condition': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/control-has-associated-label': 'off',
        "react-hooks/exhaustive-deps": "off",
        'unicorn/filename-case': 0,
        // [
        //     'error',
        //     {
        //         'cases': {
        //             'camelCase': true,
        //             'pascalCase': true,
        //             'UPPER_CASE': true
        //         }
        //     }
        // ],
        'dirnames/match-kebab-case': 0,
        'complexity': ['error', { 'max': 25 }],
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'variable',
                format: ['PascalCase', 'UPPER_CASE', 'camelCase'],
            },
        ],
    },
    ignorePatterns: ['coverage', 'cypress.config.ts'],
};
