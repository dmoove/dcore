import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { GeneratorConfig, ToolGenerator } from '../../src/generators/tool-generator.js';

class DummyGenerator extends ToolGenerator {
  name = 'dummy';

  async add(...entries: string[]): Promise<void> {
    await this.appendToIgnoreFile('.testignore', ...entries);
  }

  // Unused but required abstract methods
  async generate(_config: GeneratorConfig): Promise<void> {
    /* noop */
  }

  shouldRun(): boolean {
    return true;
  }
}

describe('ToolGenerator.appendToIgnoreFile', () => {
  it('deduplicates entries and adds trailing newline', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dcore-ignore-'));
    const gen = new DummyGenerator(dir);

    await gen.add('dist', 'node_modules', 'dist');
    await gen.add('build', 'node_modules');

    const content = await fs.readFile(join(dir, '.testignore'), 'utf8');

    // Ensure there is a trailing newline
    expect(content.endsWith('\n')).to.equal(true);

    const lines = content.trimEnd().split('\n');

    // Expect sorted unique entries
    expect(lines).to.deep.equal(['build', 'dist', 'node_modules']);
  });
});
