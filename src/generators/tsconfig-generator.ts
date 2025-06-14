import { ToolGenerator } from './tool-generator';

export class TsConfigGenerator extends ToolGenerator {
  name = 'tsconfig';

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
      exclude: ['node_modules', 'dist', 'build'],
    };
  }

  async generate(): Promise<void> {
    await this.writeJsonFile('tsconfig.json', this.getDefaultConfig());
  }
}
