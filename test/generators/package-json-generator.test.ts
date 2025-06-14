import { expect } from 'chai';
import { promises as fs } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import { PackageJsonGenerator } from '../../src/generators/package-json-generator.js';

describe('PackageJsonGenerator', () => {
  it('writes package.json with merged dependencies', async () => {
    const dir = await fs.mkdtemp(join(tmpdir(), 'dcore-pkg-'));
    const pkg = new PackageJsonGenerator(dir);
    pkg.addDependency('foo', '^1.0.0');
    pkg.addDevDependency('bar', '^2.0.0');
    pkg.addPeerDependency('baz', '^3.0.0');
    pkg.addOptionalDependency('qux', '^4.0.0');

    const config = {
      dependencies: {
        dependencies: { express: '^5.0.0' },
        devDependencies: { eslint: '^8.0.0' },
      },
      projectName: 'demo',
      projectType: 'ts-lib',
      tools: {},
    };

    await pkg.generate(config);

    const raw = JSON.parse(await fs.readFile(join(dir, 'package.json'), 'utf8'));
    expect(raw.name).to.equal('demo');
    expect(raw.dependencies.foo).to.equal('^1.0.0');
    expect(raw.dependencies.express).to.equal('^5.0.0');
    expect(raw.devDependencies.bar).to.equal('^2.0.0');
    expect(raw.devDependencies.eslint).to.equal('^8.0.0');
    expect(raw.peerDependencies.baz).to.equal('^3.0.0');
    expect(raw.optionalDependencies.qux).to.equal('^4.0.0');
  });
});
