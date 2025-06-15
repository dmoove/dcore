import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { PackageJsonGenerator } from '../../src/generators/package-json/package-json-generator.js';
import { TsConfigGenerator } from '../../src/generators/tsconfig/tsconfig-generator.js';

describe('TsConfigGenerator', () => {
  it('creates tsconfig and registers dependency', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dcore-tsconfig-'));
    const pkg = new PackageJsonGenerator(dir);
    const gen = new TsConfigGenerator(dir, pkg);

    await gen.generate();
    await pkg.generate({ projectName: 'demo', projectType: 'ts-lib', tools: {} });

    const cfg = JSON.parse(await fs.readFile(join(dir, 'tsconfig.json'), 'utf8'));
    const pkgJson = JSON.parse(await fs.readFile(join(dir, 'package.json'), 'utf8'));

    expect(cfg.compilerOptions.module).to.equal('ESNext');
    expect(pkgJson.devDependencies.typescript).to.equal('^5.3.3');
  });
});
