import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "no-undef-init": "off",
      "no-shadow": "off",
      "no-shadow-restricted-names": "off",
      "no-unused-expressions": "off",
      "no-use-before-define": "off",
      "no-restricted-globals": "off",
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];
