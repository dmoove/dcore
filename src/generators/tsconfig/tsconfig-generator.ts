import { z } from 'zod';
import { PackageJsonGenerator } from '../package-json/package-json-generator.js';
import {
  DEFAULT_IGNORE_ENTRIES,
  GeneratorConfig,
  ToolGenerator,
} from '../tool-generator.js';

export class TsConfigGenerator extends ToolGenerator {
  name = 'tsconfig';

  constructor(
    projectRoot: string,
    private readonly pkg?: PackageJsonGenerator
  ) {
    super(projectRoot);
  }

  static override get configSchema() {
    return z.boolean().optional();
  }

  shouldRun(): boolean {
    return true;
  }

  protected override getDefaultConfig() {
    return {
      $schema: 'https://json.schemastore.org/tsconfig',
      compilerOptions: {
        target: 'ES2020',
        module: 'ESNext',
        moduleResolution: 'bundler',
        lib: ['ES2020'],
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        strict: true,
        skipLibCheck: true,
        resolveJsonModule: true,
        allowImportingTsExtensions: false,
        noEmit: true,
        types: ['node'],
      },
      include: ['src/**/*.ts'],
      exclude: DEFAULT_IGNORE_ENTRIES,
    };
  }

  async generate(_: Partial<GeneratorConfig> = {}): Promise<void> {
    await this.writeJsonFile('tsconfig.json', this.getDefaultConfig());
    this.pkg?.addDevDependency('typescript', '^5.3.3');
  }
}
