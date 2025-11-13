import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import-x/recommended",
    "plugin:import-x/typescript",
    "prettier"
  ),
  {
    settings: {
      "import-x/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".js", ".jsx", ".d.ts", ".mjs", ".cjs"],

          moduleDirectory: ["node_modules", ".", ".velite"],
        },
        typescript: {
          // tsconfig 경로 지정(모노레포면 배열에 여러 개)
          project: ["./tsconfig.json"],
        },
      },
    },
    rules: {
      "import-x/order": [
        "error",
        {
          groups: [
            [
              "builtin",
              "external",
              "internal",
              "parent",
              "sibling",
              "index",
              "object",
              "type",
            ],
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },

          pathGroups: [
            { pattern: "react", group: "external", position: "before" },
            { pattern: "@/**", group: "internal" },
          ],
          pathGroupsExcludedImportTypes: ["react"],
        },
      ],

      "react/display-name": "off",
    },
    ignores: [
      "node_modules/**",
      ".next/**",
      "content/**",
      "prisma/**",
      "public/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
