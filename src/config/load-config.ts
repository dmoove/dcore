import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { z } from 'zod';

import { buildToolSchema } from '../generators/tool-registry.js';

export const dcoreConfigSchema = z.object({
  ci: z.enum(['github', 'gitlab']).optional(),
  dependencies: z
    .object({
      dependencies: z.record(z.string(), z.string()).optional(),
      devDependencies: z.record(z.string(), z.string()).optional(),
      optionalDependencies: z.record(z.string(), z.string()).optional(),
      peerDependencies: z.record(z.string(), z.string()).optional(),
    })
    .optional(),
  projectAuthor: z.string().optional(),
  projectDesription: z.string().optional(),
  projectLicense: z.string().optional(),
  projectName: z.string(),
  projectType: z.enum(['cdk-app', 'cdk-lib', 'ts-lib']),
  projectVersion: z.string().optional(),
  release: z.enum(['changesets', 'semantic-release']).optional(),
  tools: buildToolSchema(),
});

export type DcoreConfig = z.infer<typeof dcoreConfigSchema>;

const CONFIG_FILES = [
  '.dcorerc.ts',
  '.dcorerc.js',
  '.dcorerc.cjs',
  '.dcorerc.json',
  '.dcorets.ts',
  '.dcorets.cjs',
];

export async function loadDcoreConfig(
  cwd = process.cwd()
): Promise<DcoreConfig> {
  for (const filename of CONFIG_FILES) {
    const path = resolve(cwd, filename);
    if (!existsSync(path)) continue;

    const fileUrl = pathToFileURL(path).href;
    let rawConfig: unknown;

    try {
      // eslint-disable-next-line no-await-in-loop
      const imported = await import(fileUrl);
      rawConfig = imported.default ?? imported;
    } catch (error) {
      throw new Error(`Failed to load ${filename}: ${error}`);
    }

    const parseResult = dcoreConfigSchema.safeParse(rawConfig);
    if (!parseResult.success) {
      throw new Error(
        `Invalid config in ${filename}:\n${JSON.stringify(
          parseResult.error.format(),
          null,
          2
        )}`
      );
    }

    return parseResult.data;
  }

  throw new Error(`No dcore config found in ${cwd}`);
}
