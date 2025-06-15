import { z } from 'zod';

import { PackageJsonGenerator } from '../package-json/package-json-generator.js';
import {
  DEFAULT_IGNORE_ENTRIES,
  GeneratorConfig,
  ToolGenerator,
} from '../tool-generator.js';

export class PrettierGenerator extends ToolGenerator {
  name = 'prettier';

  constructor(
    projectRoot: string,
    private readonly pkg?: PackageJsonGenerator
  ) {
    super(projectRoot);
  }

  static override get configSchema() {
    return z.union([
      z.boolean(),
      z.object({
        arrowParens: z.enum(['avoid', 'always']).optional(),
        bracketSpacing: z.boolean().optional(),
        endOfLine: z.enum(['auto', 'lf', 'crlf', 'cr']).optional(),
        printWidth: z.number().optional(),
        semi: z.boolean().optional(),
        singleQuote: z.boolean().optional(),
        tabWidth: z.number().optional(),
        trailingComma: z.enum(['none', 'es5', 'all']).optional(),
      }),
    ]);
  }

  async generate(config: GeneratorConfig): Promise<void> {
    const raw = config.tools?.prettier;
    const prettierCfg = ToolGenerator.isRecord(raw)
      ? this.getMergedConfig(raw)
      : this.getMergedConfig({});

    await this.writeJsonFile('.prettierrc', prettierCfg);
    await this.appendToIgnoreFile('.prettierignore', ...DEFAULT_IGNORE_ENTRIES);

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
