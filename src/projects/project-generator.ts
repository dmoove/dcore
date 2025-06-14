import { EslintGenerator } from '../generators/eslint-generator';
import { PackageJsonGenerator } from '../generators/package-json-generator';
import { PrettierGenerator } from '../generators/prettier-generator';
import { ToolGenerator } from '../generators/tool-generator';
import { TsConfigGenerator } from '../generators/tsconfig-generator';

export class ProjectGenerator {
  private readonly generators: ToolGenerator[];

  constructor(private config: any, private projectRoot = process.cwd()) {
    this.generators = [
      new PackageJsonGenerator(this.projectRoot),
      new EslintGenerator(this.projectRoot),
      new TsConfigGenerator(this.projectRoot),
      new PrettierGenerator(this.projectRoot),
    ];
  }

  async generateAll(): Promise<void> {
    for (const generator of this.generators) {
      if (generator.shouldRun(this.config)) {
        console.log(`🔧 Generating ${generator.name}...`);
        await generator.generate(this.config);
      }
    }
  }
}
