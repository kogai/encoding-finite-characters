import * as path from "path";
import pluginTester from "babel-plugin-tester";
import macrosPlugin from "babel-plugin-macros";
import { addAlias } from "module-alias";

addAlias("encoding-finite-characters.macro", path.join(__dirname, ".."));

pluginTester({
  title: "encoding-finite-characters.macro",
  plugin: macrosPlugin,
  fixtures: `${__dirname}/fixtures`
});
