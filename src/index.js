// @flow
const {
  createMacro,
  MacroError
} = require("babel-plugin-macros");
const {
  convert
} = require("encoding-japanese");

function macro({
  references,
  babel: {
    types
  }
}) {
  references.default.forEach(({
    parentPath
  }) => {
    if (!parentPath.isCallExpression()) {
      throw new MacroError(
        `Convert-macro should be used as function call, instead you have used it as part of ${
          parentPath.node.type
        }.`,
      );
    }
    const properties = [
      ...new Set(
        [
          "価格",
          "税込み",
          "報酬",
          "1234567890-,. \n",
        ]
        .join("")
        .split(""),
      ),
    ].map(x => {
      const encoded = convert([x.charCodeAt(0)], {
        from: "UNICODE",
        to: "SJIS",
      });
      const key = types.stringLiteral(x);
      const value = types.arrayExpression(
        encoded.map(y => types.numericLiteral(y)),
      );
      return types.objectProperty(key, value);
    });
    parentPath.replaceWith(types.objectExpression(properties));
  });
}

module.exports = createMacro(macro);
