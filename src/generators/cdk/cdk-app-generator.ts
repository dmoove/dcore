import { mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { pascalCase } from '../../utils/string.js';
import { GeneratorConfig } from '../tool-generator.js';
import { CdkCommon } from './cdk-common.js';

export class CdkAppGenerator extends CdkCommon {
  name = 'cdk-app';

  async generate(config: GeneratorConfig): Promise<void> {
    const name = config.projectName || 'cdk-app';
    const pascal = pascalCase(name);

    await this.writeJsonFile('cdk.json', {
      app: `npx ts-node --prefer-ts-exts bin/${name}.ts`,
    });

    await mkdir(resolve(this.projectRoot, 'bin'), { recursive: true });
    await mkdir(resolve(this.projectRoot, 'lib'), { recursive: true });

    const binContent = `#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { ${pascal}Stack } from '../lib/${name}-stack.js';

const app = new cdk.App();
new ${pascal}Stack(app, '${pascal}Stack');
`;
    const stackContent = `import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class ${pascal}Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
  }
}
`;

    await this.writeTextFile(`bin/${name}.ts`, binContent);
    await this.writeTextFile(`lib/${name}-stack.ts`, stackContent);

    this.addRuntimeDependencies();
    this.addDevDependencies();
    this.pkg?.addDevDependency('ts-node', '^10.9.2');
  }

  override shouldRun(config: GeneratorConfig): boolean {
    return config.projectType === 'cdk-app';
  }
}
