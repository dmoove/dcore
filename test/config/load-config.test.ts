import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { loadDcoreConfig } from '../../src/config/load-config.js';

describe('loadDcoreConfig', () => {
  it('loads configuration from .dcorerc.cjs', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dcore-'));
    await fs.writeFile(
      join(dir, '.dcorerc.cjs'),
      "module.exports = { projectType: 'ts-lib', projectName: 'demo', tools: {}, dependencies: { devDependencies: { jest: '^1.0.0' } } };\n",
      'utf8'
    );

    const cfg = await loadDcoreConfig(dir);
    expect(cfg.projectName).to.equal('demo');
    expect(cfg.dependencies?.devDependencies?.jest).to.equal('^1.0.0');
  });
});
