import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
 
const eslintConfig = defineConfig([
  ...nextVitals,
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'src/hooks/use-mobile.ts',
    'src/components/ui/**',
  ]),
  {
    "rules": {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
      "prefer-const": "warn",
    }
  }
])
 
export default eslintConfig
