import { EslintGenerator } from '../generators/eslint/eslint-generator.js';
import { PackageJsonGenerator } from '../generators/package-json/package-json-generator.js';
import { PrettierGenerator } from '../generators/prettier/prettier-generator.js';
import { GeneratorConfig, ToolGenerator } from '../generators/tool-generator.js';
import { TsConfigGenerator } from '../generators/tsconfig/tsconfig-generator.js';

export class ProjectGenerator {
  private readonly generators: ToolGenerator[];

  constructor(private config: GeneratorConfig, private projectRoot = process.cwd()) {
    const pkg = new PackageJsonGenerator(this.projectRoot);
    this.generators = [
      pkg,
      new EslintGenerator(this.projectRoot, pkg),
      new TsConfigGenerator(this.projectRoot, pkg),
      new PrettierGenerator(this.projectRoot, pkg),
    ];
  }

  async generateAll(): Promise<void> {
    for (const generator of this.generators) {
      if (generator.shouldRun(this.config)) {
        console.log(`🔧 Generating ${generator.name}...`);
        // eslint-disable-next-line no-await-in-loop
        await generator.generate(this.config);
      }
    }
  }
}
