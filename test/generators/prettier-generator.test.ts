import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { PackageJsonGenerator } from '../../src/generators/package-json/package-json-generator.js';
import { PrettierGenerator } from '../../src/generators/prettier/prettier-generator.js';

describe('PrettierGenerator', () => {
  it('creates files and registers dependency', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dmpak-prettier-'));
    const pkg = new PackageJsonGenerator(dir);
    const gen = new PrettierGenerator(dir, pkg);

    await gen.generate({ projectName: 'demo', projectType: 'ts-lib', tools: { prettier: true } });
    await pkg.generate({ projectName: 'demo', projectType: 'ts-lib', tools: {} });

    const rcPath = join(dir, '.prettierrc');
    const ignorePath = join(dir, '.prettierignore');
    const pkgJson = JSON.parse(await fs.readFile(join(dir, 'package.json'), 'utf8'));

    expect(await fs.readFile(rcPath, 'utf8')).to.contain('singleQuote');
    expect(await fs.readFile(ignorePath, 'utf8')).to.contain('node_modules');
    expect(pkgJson.devDependencies.prettier).to.equal('^3.2.5');
  });
});
