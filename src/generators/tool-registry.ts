import { z } from 'zod';

import { EslintGenerator } from './eslint/eslint-generator';
import { GitGenerator } from './git/git-generator';
import { PackageJsonGenerator } from './package-json/package-json-generator';
import { PrettierGenerator } from './prettier/prettier-generator';
import { TsConfigGenerator } from './tsconfig/tsconfig-generator';

export const toolGenerators = [
  EslintGenerator,
  GitGenerator,
  PackageJsonGenerator,
  PrettierGenerator,
  TsConfigGenerator,
];

export function buildToolSchema(): z.AnyZodObject {
  const entries = toolGenerators
    .filter((g) => Boolean(g.configSchema))
    .map((g) => [g.prototype.name, g.configSchema!.optional()]);

  return z.object(Object.fromEntries(entries));
}
