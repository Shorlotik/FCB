import { createRequire } from "module";

const require = createRequire(import.meta.url);

/** @type {import("eslint").Linter.Config[]} */
const nextConfig = require("eslint-config-next/core-web-vitals");

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "next-env.d.ts",
    ],
  },
  ...nextConfig,
  {
    rules: {
      // Next 16 + client-only UI: допустимы однократные setState после mount / при смене query
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default eslintConfig;
