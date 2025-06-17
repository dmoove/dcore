import { Command } from '@oclif/core';

import { loadDmpakConfig } from '../config/load-config.js';
import { ProjectGenerator } from '../projects/project-generator.js';

/**
 * Default command which regenerates all project files according to the
 * configuration.
 */
export default class Dmpak extends Command {
  static description = 'Regenerate project files based on .dmpakrc config';

  /**
   * Execute the command.
   */
  async run(): Promise<void> {
    this.log('🔍 Loading .dmpakrc configuration...');
    const config = await loadDmpakConfig();
    this.log('✅ Configuration loaded.');

    const generator = new ProjectGenerator({ ...config, isInit: false });
    await generator.generateAll();

    this.log('🎉 Project updated successfully!');
  }
}
