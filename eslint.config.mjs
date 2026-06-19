import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// Flat-config replacement for the legacy .eslintrc.json ({ extends: "next/core-web-vitals" }),
// required by Next.js 16 (the `next lint` command and legacy config were removed).
// To opt into the stricter TypeScript rules later, add:
//   import nextTypescript from 'eslint-config-next/typescript'
//   ...nextTypescript,
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
  {
    rules: {
      // `react-hooks/set-state-in-effect` is new in eslint-plugin-react-hooks v7 (bundled by
      // eslint-config-next 16) and was not part of the pre-upgrade lint baseline. Kept as a
      // warning so the Next.js 16 upgrade introduces no new lint failures; revisit the flagged
      // effects and restore this to "error" as a follow-up code-quality pass.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
]

export default eslintConfig
