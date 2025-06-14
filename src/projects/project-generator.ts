import { EslintGenerator } from '../generators/eslint-generator';
import { PackageJsonGenerator } from '../generators/package-json-generator';
import { PrettierGenerator } from '../generators/prettier-generator';
import { GeneratorConfig, ToolGenerator } from '../generators/tool-generator';
import { TsConfigGenerator } from '../generators/tsconfig-generator';

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
