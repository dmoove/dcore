import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { EslintGenerator } from '../../src/generators/eslint/eslint-generator.js';
import { PackageJsonGenerator } from '../../src/generators/package-json/package-json-generator.js';

describe('EslintGenerator', () => {
  it('generates config and registers dependency', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dcore-eslint-'));
    const pkg = new PackageJsonGenerator(dir);
    const gen = new EslintGenerator(dir, pkg);

    await gen.generate({ projectName: 'demo', projectType: 'ts-lib', tools: { eslint: true } });
    await pkg.generate({ projectName: 'demo', projectType: 'ts-lib', tools: {} });

    const rcPath = join(dir, '.eslintrc.cjs');
    const pkgJson = JSON.parse(await fs.readFile(join(dir, 'package.json'), 'utf8'));

    expect(await fs.readFile(rcPath, 'utf8')).to.contain('ESLint legacy config');
    expect(pkgJson.devDependencies.eslint).to.equal('^8.56.0');
  });
});
