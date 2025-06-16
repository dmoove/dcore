import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { simpleGit } from 'simple-git';

import { DEFAULT_IGNORE_ENTRIES, GeneratorConfig, ToolGenerator } from '../tool-generator.js';

export class GitGenerator extends ToolGenerator {
  name = 'git';

  async generate(config: GeneratorConfig): Promise<void> {
    const entries = [
      ...DEFAULT_IGNORE_ENTRIES,
      'tmp',
      '*-debug.log',
      '*-error.log',
      '**/.DS_Store',
      '.idea',
    ];

    await this.appendToIgnoreFile('.gitignore', ...entries);

    if (config.isInit) {
      const gitDir = resolve(this.projectRoot, '.git');
      if (!existsSync(gitDir)) {
        const git = simpleGit(this.projectRoot);
        await git.init();
      }
    }
  }

  shouldRun(): boolean {
    return true;
  }
}
