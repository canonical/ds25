import Generator from "yeoman-generator";

export default class extends Generator {
  initializing() {
    this.argument("subgenerator", { type: String, required: false });
  }

  async default() {
    const pkgJson = require("../../package.json");
    this.config.set("pkg", pkgJson.name);
    this.config.set("version", pkgJson.version);

    const { subgenerator } = this.options;
    if (subgenerator === "component") {
      return this.composeWith(require.resolve("./component"));
    }
    this.log(
      "Welcome to the main generator! Use 'yo @canonical/canonical-ds component' to generate a new component.",
    );
  }
}
