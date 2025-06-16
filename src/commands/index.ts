import { Command } from '@oclif/core';

import { loadDcoreConfig } from '../config/load-config.js';
import { ProjectGenerator } from '../projects/project-generator.js';

export default class Dcore extends Command {
  static description = 'Regenerate project files based on .dcorerc config';

  async run(): Promise<void> {
    this.log('🔍 Loading .dcorerc configuration...');
    const config = await loadDcoreConfig();
    this.log('✅ Configuration loaded.');

    const generator = new ProjectGenerator({ ...config, isInit: false });
    await generator.generateAll();

    this.log('🎉 Project updated successfully!');
  }
}
