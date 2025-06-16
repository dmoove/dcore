import { Command, Flags } from '@oclif/core';
import { existsSync } from 'node:fs';
import { writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';

import { loadDcoreConfig } from '../config/load-config.js';
import { ProjectGenerator } from '../projects/project-generator.js';

/**
 * Initialize a new project by creating a configuration file and generating
 * default project files.
 */
export default class Init extends Command {
  static description = 'Create a new .dcorerc.ts and generate project files';
  static flags = {
    force: Flags.boolean({
      char: 'f',
      default: false,
      description: 'Overwrite existing configuration',
    }),
    type: Flags.string({
      char: 't',
      description: 'Project template type',
      options: ['cdk-lib', 'cdk-app', 'ts-lib'],
      required: true,
    }),
  };

  /**
   * Execute the command.
   */
  async run(): Promise<void> {
    const { flags } = await this.parse(Init);
    const file = resolve(process.cwd(), '.dcorerc.ts');

    if (existsSync(file) && !flags.force) {
      this.error('.dcorerc.ts already exists. Use --force to overwrite.');
      return;
    }

    const name = basename(process.cwd());
    const content = `export default {
  projectName: '${name}',
  projectType: '${flags.type}',
  tools: { eslint: true, prettier: true },
};
`;

    await writeFile(file, content, 'utf8');
    this.log('✅ Created .dcorerc.ts');

    const config = await loadDcoreConfig();
    const generator = new ProjectGenerator({ ...config, isInit: true });
    await generator.generateAll();

    this.log('🎉 Project initialized successfully!');
  }
}
