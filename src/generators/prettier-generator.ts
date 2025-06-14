import { PackageJsonGenerator } from './package-json-generator.js';
import { GeneratorConfig, ToolGenerator } from './tool-generator.js';

export class PrettierGenerator extends ToolGenerator {
  name = 'prettier';

  constructor(
    projectRoot: string,
    private readonly pkg?: PackageJsonGenerator
  ) {
    super(projectRoot);
  }

  async generate(config: GeneratorConfig): Promise<void> {
    const prettierCfg = this.getMergedConfig(
      (config.tools as Record<string, unknown> | undefined)?.prettier ?? {}
    );
    await this.writeJsonFile('.prettierrc', prettierCfg);
    await this.writeTextFile('.prettierignore', 'node_modules\ndist\nbuild\n');
    this.pkg?.addDevDependency('prettier', '^3.2.5');
  }

  protected override getDefaultConfig(): Record<string, unknown> {
    return {
      arrowParens: 'always',
      bracketSpacing: true,
      endOfLine: 'lf',
      printWidth: 80,
      semi: true,
      singleQuote: true,
      tabWidth: 2,
      trailingComma: 'es5',
    };
  }

  shouldRun(config: GeneratorConfig): boolean {
    return Boolean(config.tools?.prettier);
  }
}
