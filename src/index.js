// @flow
const { createMacro, MacroError } = require("babel-plugin-macros");
const { convert } = require("encoding-japanese");

function macro({ references, babel: { types } }) {
  references.default.forEach(
    ({
      parentPath,
      parent: {
        arguments: [macro_arguments]
      }
    }) => {
      if (!parentPath.isCallExpression()) {
        throw new MacroError(
          `encoding-finite-characters.macro should be used as function call but use as ${
            parentPath.node.type
          }.`
        );
      }
      if (
        parentPath.node.arguments.length !== 1 ||
        !types.isObjectExpression(parentPath.node.arguments[0])
      ) {
        throw new MacroError(
          `encoding-finite-characters.macro expect call with object.`
        );
      }
      const args = parentPath
        .get("arguments.0")
        .get("properties")
        .reduce((acc, path) => {
          return Object.assign(acc, {
            [path.node.key.name]: path.get("value").evaluate()
          });
        }, {});
      if (
        !(args.from.confident && args.to.confident && args.characters.confident)
      ) {
        throw new MacroError(
          `encoding-finite-characters.macro expect arguments to be able to evaluate statically.`
        );
      }
      const properties = [...new Set(args.characters.value.split(""))].map(
        x => {
          const encoded = convert([x.charCodeAt(0)], {
            from: args.from.value,
            to: args.to.value
          });
          const key = types.stringLiteral(x);
          const value = types.arrayExpression(
            encoded.map(y => types.numericLiteral(y))
          );
          return types.objectProperty(key, value);
        }
      );
      parentPath.replaceWith(types.objectExpression(properties));
    }
  );
}

module.exports = createMacro(macro);
