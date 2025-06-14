import { ToolGenerator } from './tool-generator.js';

export class PrettierGenerator extends ToolGenerator {
  name = 'prettier';

  shouldRun(config: any): boolean {
    return !!config.tools?.prettier;
  }

  protected override getDefaultConfig() {
    return {
      semi: true,
      singleQuote: true,
      trailingComma: 'es5',
      tabWidth: 2,
      printWidth: 80,
      bracketSpacing: true,
      arrowParens: 'always',
      endOfLine: 'lf',
    };
  }

  async generate(config: any): Promise<void> {
    const prettierCfg = this.getMergedConfig(config.tools?.prettier);
    await this.writeJsonFile('.prettierrc', prettierCfg);
    await this.writeTextFile('.prettierignore', 'node_modules\ndist\nbuild\n');
  }
}
