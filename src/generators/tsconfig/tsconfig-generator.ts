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
    return z
      .union([
        z.boolean(),
        z
          .object({
            compilerOptions: z.record(z.string(), z.any()).optional(),
            exclude: z.array(z.string()).optional(),
            include: z.array(z.string()).optional(),
          })
          .passthrough(),
      ])
      .optional();
  }

  async generate(config: Partial<GeneratorConfig> = {}): Promise<void> {
    const rawCfg = this.getToolConfig(config);
    const userCfg = ToolGenerator.isRecord(rawCfg) ? rawCfg : {};
    const merged = this.mergeConfig(userCfg);
    await this.writeJsonFile('tsconfig.json', merged);
    this.pkg?.addDevDependency('typescript', '^5.3.3');
  }

  protected override getDefaultConfig() {
    return {
      $schema: 'https://json.schemastore.org/tsconfig',
      compilerOptions: {
        allowImportingTsExtensions: false,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        lib: ['ES2020'],
        module: 'ESNext',
        moduleResolution: 'bundler',
        noEmit: true,
        resolveJsonModule: true,
        skipLibCheck: true,
        strict: true,
        target: 'ES2020',
        types: ['node'],
      },
      exclude: DEFAULT_IGNORE_ENTRIES,
      include: ['src/**/*.ts'],
    };
  }

  shouldRun(): boolean {
    return true;
  }

  private mergeConfig(userCfg: Record<string, unknown>): Record<string, unknown> {
    const base = this.getDefaultConfig();
    const userOptions =
      (userCfg.compilerOptions as Record<string, unknown> | undefined) ?? {};

    const compilerOptions = {
      ...(base.compilerOptions as Record<string, unknown>),
      ...userOptions,
    };

    return {
      ...base,
      ...userCfg,
      compilerOptions,
    };
  }
}
