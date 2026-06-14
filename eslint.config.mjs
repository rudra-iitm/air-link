import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // React Three Fiber is built on per-frame imperative mutation (useFrame
    // mutates the camera, meshes and refs every tick) and the canvas must be
    // gated behind a mount flag for SSR safety. The new React-Compiler hook
    // rules flag these idiomatic WebGL patterns as violations, so we relax
    // them for the 3D layer.
    files: ["components/**/*.tsx"],
    rules: {
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
