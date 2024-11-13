import Generator from "yeoman-generator";

interface Answers {
  name: string;
  includeStyles: boolean;
}

export default class extends Generator {
  answers: Answers;

  async prompting(): Promise<void> {
    this.log("Welcome to the React component generator");

    const prompts: Generator.Question[] = [
      {
        type: "input",
        name: "name",
        message: "What is the name of your component?",
        default: "MyComponent",
      },
      {
        type: "confirm",
        name: "includeStyles",
        message: "Do you want to include styles?",
        default: false,
      },
    ];

    this.answers = await this.prompt<Answers>(prompts);
  }

  // Resolve back to the directory for the component template
  // todo find a more DRY way to make this work for multiple subgenerators
  templatePath(...path: string[]): string {
    return super.templatePath("../../templates/component", ...path);
  }

  writing(): void {
    const templateData = {
      pkg: this.config.get("pkg"),
      version: this.config.get("version"),
      ...this.answers,
    };

    if (this.answers.includeStyles) {
      this.fs.copyTpl(
        this.templatePath("Component.css"),
        this.destinationPath(`${templateData.name}/${templateData.name}.css`),
        templateData
      );
    }
    this.fs.copyTpl(
      this.templatePath("Component.stories.tsx"),
      this.destinationPath(
        `${templateData.name}/${templateData.name}.stories.tsx`
      ),
      templateData
    );
    this.fs.copyTpl(
      this.templatePath("Component.test.tsx"),
      this.destinationPath(
        `${templateData.name}/${templateData.name}.test.tsx`
      ),
      templateData
    );
    this.fs.copyTpl(
      this.templatePath("Component.tsx"),
      this.destinationPath(`${templateData.name}/${templateData.name}.tsx`),
      templateData
    );
    this.fs.copyTpl(
      this.templatePath("index.ts"),
      this.destinationPath(`${templateData.name}/index.ts`),
      templateData
    );
    this.fs.copyTpl(
      this.templatePath("types.ts"),
      this.destinationPath(`${templateData.name}/types.ts`),
      templateData
    );
  }
}
