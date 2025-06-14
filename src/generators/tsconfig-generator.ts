import { PackageJsonGenerator } from './package-json-generator.js';
import { GeneratorConfig, ToolGenerator } from './tool-generator.js';

export class TsConfigGenerator extends ToolGenerator {
  name = 'tsconfig';

  constructor(
    projectRoot: string,
    private readonly pkg?: PackageJsonGenerator
  ) {
    super(projectRoot);
  }

  async generate(_: GeneratorConfig = {}): Promise<void> {
    await this.writeJsonFile('tsconfig.json', this.getDefaultConfig());
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
      exclude: ['node_modules', 'dist', 'build'],
      include: ['src/**/*.ts'],
    };
  }

  shouldRun(): boolean {
    return true;
  }
}
