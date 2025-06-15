import { GeneratorConfig, ToolGenerator } from '../tool-generator.js';
import { getBaseFields, getExportFields, getScripts } from './get-fields.js';

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

  shouldRun(): boolean {
    return true;
  }

  protected getDefaultDevDeps(): Record<string, string> {
    return {
      eslint: '^8.56.0',
      prettier: '^3.2.5',
      typescript: '^5.3.3',
    };
  }

  private mergeDeps(
    base: Record<string, string> = {},
    extras: Map<string, string>
  ): Record<string, string> {
    const result = { ...base };
    for (const [name, version] of extras) {
      result[name] = version;
    }
    return result;
  }

  async generate(config: GeneratorConfig): Promise<void> {
    const base = getBaseFields(config);
    const scripts = getScripts(config);
    const exports = getExportFields(config);
    const extraDeps = (config.dependencies ?? {}) as Record<
      string,
      Record<string, string>
    >;

    const pkg: Record<string, unknown> = {
      ...base,
      scripts,
      ...exports,
      dependencies: this.mergeDeps(
        extraDeps.dependencies ?? {},
        this.dependencies
      ),
      devDependencies: this.mergeDeps(
        {
          ...this.getDefaultDevDeps(),
          ...(extraDeps.devDependencies ?? {}),
        },
        this.devDependencies
      ),
    };

    if (this.peerDependencies.size > 0 || extraDeps.peerDependencies) {
      pkg.peerDependencies = this.mergeDeps(
        extraDeps.peerDependencies ?? {},
        this.peerDependencies
      );
    }

    if (this.optionalDependencies.size > 0 || extraDeps.optionalDependencies) {
      pkg.optionalDependencies = this.mergeDeps(
        extraDeps.optionalDependencies ?? {},
        this.optionalDependencies
      );
    }

    await this.writeJsonFile('package.json', pkg);
  }
}
