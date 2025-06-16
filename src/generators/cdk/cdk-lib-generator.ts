import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { pascalCase } from '../../utils/string.js';
import { GeneratorConfig } from '../tool-generator.js';
import { CdkCommon } from './cdk-common.js';

/**
 * Generates scaffolding for an AWS CDK construct library.
 */
export class CdkLibGenerator extends CdkCommon {
  name = 'cdk-lib';

  /**
   * Create the construct library structure and update dependencies.
   */
  async generate(config: GeneratorConfig): Promise<void> {
    const name = config.projectName || 'cdk-lib';
    const pascal = pascalCase(name);

    await mkdir(resolve(this.projectRoot, 'lib'), { recursive: true });
    const libContent = `import { Construct } from 'constructs';

export interface ${pascal}Props {}

export class ${pascal} extends Construct {
  constructor(scope: Construct, id: string, props: ${pascal}Props = {}) {
    super(scope, id);
  }
}
`;
    await this.writeTextFile('lib/index.ts', libContent);

    this.addDevDependencies();
    this.addPeerDependencies();
  }

  /** Only runs when the project type is `cdk-lib`. */
  override shouldRun(config: GeneratorConfig): boolean {
    return config.projectType === 'cdk-lib';
  }
}
