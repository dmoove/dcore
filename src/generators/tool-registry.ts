import { z } from 'zod';
import { EslintGenerator } from './eslint/eslint-generator';
import { PrettierGenerator } from './prettier/prettier-generator';
import { PackageJsonGenerator } from './package-json/package-json-generator';
import { TsConfigGenerator } from './tsconfig/tsconfig-generator';

export const toolGenerators = [
  EslintGenerator,
  PrettierGenerator,
  PackageJsonGenerator,
  TsConfigGenerator,
];

export function buildToolSchema(): z.ZodObject<any> {
  const entries = toolGenerators
    .filter((g) => !!g.configSchema)
    .map((g) => [g.prototype.name, g.configSchema!]);

  return z.object(Object.fromEntries(entries));
}
