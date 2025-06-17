import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { loadDmpakConfig } from '../../src/config/load-config.js';

describe('loadDmpakConfig', () => {
  it('loads configuration from .dmpakrc.cjs', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dmpak-'));
    await fs.writeFile(
      join(dir, '.dmpakrc.cjs'),
      "module.exports = { projectType: 'ts-lib', projectName: 'demo', tools: {}, dependencies: { devDependencies: { jest: '^1.0.0' } } };\n",
      'utf8'
    );

    const cfg = await loadDmpakConfig(dir);
    expect(cfg.projectName).to.equal('demo');
    expect(cfg.dependencies?.devDependencies?.jest).to.equal('^1.0.0');
  });

  it('loads configuration from .dmpakrc.mjs before others', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dmpak-'));

    await fs.writeFile(
      join(dir, '.dmpakrc.js'),
      "export default { projectType: 'ts-lib', projectName: 'js', tools: {} };\n",
      'utf8'
    );

    await fs.writeFile(
      join(dir, '.dmpakrc.mjs'),
      "export default { projectType: 'ts-lib', projectName: 'mjs', tools: {} };\n",
      'utf8'
    );

    const cfg = await loadDmpakConfig(dir);
    expect(cfg.projectName).to.equal('mjs');
  });

  it('loads configuration from .dmpakrc.ts', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dmpak-'));
    await fs.writeFile(
      join(dir, '.dmpakrc.ts'),
      "export default { projectType: 'ts-lib', projectName: 'ts', tools: {} };\n",
      'utf8'
    );

    const cfg = await loadDmpakConfig(dir);
    expect(cfg.projectName).to.equal('ts');
  });
});
