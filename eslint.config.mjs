import mantine from 'eslint-config-mantine';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  ...mantine,
  { 
    rules: {
      'react/jsx-boolean-value': 'off'
    },
    ignores: ['**/*.{mjs,cjs,js,d.ts,d.mts}']
  }
);
