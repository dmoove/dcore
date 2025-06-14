import { GeneratorConfig, ToolGenerator } from './tool-generator.js';

export class PackageJsonGenerator extends ToolGenerator {
  name = 'package.json';
private dependencies = new Map<string, string>();
  private devDependencies = new Map<string, string>();
  private optionalDependencies = new Map<string, string>();
  private peerDependencies = new Map<string, string>();

  addDependency(pkg: string, version: string): void {
    this.dependencies.set(pkg, version);
  }

  addDevDependency(pkg: string, version: string): void {
    this.devDependencies.set(pkg, version);
  }

  addOptionalDependency(pkg: string, version: string): void {
    this.optionalDependencies.set(pkg, version);
  }

  addPeerDependency(pkg: string, version: string): void {
    this.peerDependencies.set(pkg, version);
  }

  async generate(config: GeneratorConfig): Promise<void> {
    const defaults = this.getDefaultConfig();
    const pkg: Record<string, unknown> = {
      ...defaults,
      author: config.projectAuthor || defaults.author,
      description: config.projectDesription || defaults.description,
      license: config.projectLicense || defaults.license,
      name: config.projectName || defaults.name,
      version: config.projectVersion || defaults.version,
    };

    const cfgDeps = (config.dependencies ?? {}) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
      optionalDependencies?: Record<string, string>;
      peerDependencies?: Record<string, string>;
    };

    pkg.dependencies = this.mergeDeps(
      cfgDeps.dependencies ?? {},
      this.dependencies
    );
    const extraDev = cfgDeps.devDependencies ?? {};
    pkg.devDependencies = this.mergeDeps(
      {
        ...(defaults.devDependencies as Record<string, string>),
        ...extraDev,
      },
      this.devDependencies
    );
    if (this.peerDependencies.size > 0 || cfgDeps.peerDependencies) {
      pkg.peerDependencies = this.mergeDeps(
        cfgDeps.peerDependencies ?? {},
        this.peerDependencies
      );
    }

    if (this.optionalDependencies.size > 0 || cfgDeps.optionalDependencies) {
      pkg.optionalDependencies = this.mergeDeps(
        cfgDeps.optionalDependencies ?? {},
        this.optionalDependencies
      );
    }

    await this.writeJsonFile('package.json', pkg);
  }

  protected override getDefaultConfig(): Record<string, unknown> {
    return {
      author: '',
      description: '',
      devDependencies: {
        eslint: '^8.56.0',
        prettier: '^3.2.5',
        typescript: '^5.3.3',
      },
      license: 'MIT',
      name: 'my-project',
      private: true,
      scripts: {
        build: 'tsc',
        format: 'prettier --check .',
        formatfix: 'prettier --write .',
        lint: 'eslint .',
      },
      type: 'module',
      version: '0.1.0',
    };
  }

  shouldRun(): boolean {
    return true;
  }

  private mergeDeps(
    base: Record<string, string> = {},
    extras: Map<string, string>
  ): Record<string, string> {
    const result = { ...base };
    for (const [name, version] of extras) result[name] = version;
    return result;
  }
}
