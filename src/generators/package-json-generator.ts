import { ToolGenerator } from './tool-generator.js';

export class PackageJsonGenerator extends ToolGenerator {
  name = 'package.json';

  shouldRun(): boolean {
    return true;
  }

  protected override getDefaultConfig(): Record<string, any> {
    return {
      name: 'my-project',
      version: '0.1.0',
      description: '',
      author: '',
      license: 'MIT',
      private: true,
      type: 'module',
      scripts: {
        build: 'tsc',
        lint: 'eslint .',
        format: 'prettier --check .',
        formatfix: 'prettier --write .',
      },
      devDependencies: {
        typescript: '^5.3.3',
        eslint: '^8.56.0',
        prettier: '^3.2.5',
      },
    };
  }

  async generate(config: any): Promise<void> {
    const defaults = this.getDefaultConfig();
    const pkg = {
      ...defaults,
      name: config.projectName || defaults.name,
      version: config.projectVersion || defaults.version,
      description: config.projectDesription || defaults.description,
      author: config.projectAuthor || defaults.author,
      license: config.projectLicense || defaults.license,
    };

    await this.writeJsonFile('package.json', pkg);
  }
}
