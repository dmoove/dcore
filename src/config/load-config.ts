import { pathToFileURL } from 'url';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { z } from 'zod';

const toolSetting = z.union([z.boolean(), z.record(z.string(), z.any())]);

export const dcoreConfigSchema = z.object({
  projectType: z.enum(['cdk-app', 'cdk-lib', 'ts-lib']),
  projectName: z.string(),
  projectDesription: z.string().optional(),
  projectVersion: z.string().optional(),
  projectAuthor: z.string().optional(),
  projectLicense: z.string().optional(),
  tools: z.object({
    eslint: toolSetting.optional(),
    prettier: toolSetting.optional(),
    jest: toolSetting.optional(),
    typedoc: toolSetting.optional(),
  }),
  ci: z.enum(['github', 'gitlab']).optional(),
  release: z.enum(['changesets', 'semantic-release']).optional(),
});

export type DcoreConfig = z.infer<typeof dcoreConfigSchema>;

const CONFIG_FILES = ['.dcorerc.ts', '.dcorerc.js', '.dcorerc.json'];

export async function loadDcoreConfig(
  cwd = process.cwd()
): Promise<DcoreConfig> {
  for (const filename of CONFIG_FILES) {
    const path = resolve(cwd, filename);
    if (!existsSync(path)) continue;

    const fileUrl = pathToFileURL(path).href;
    let rawConfig: any;

    try {
      rawConfig = (await import(fileUrl)).default ?? (await import(fileUrl));
    } catch (err) {
      throw new Error(`Failed to load ${filename}: ${err}`);
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

  throw new Error(`No .dcorerc.ts/.js/.json found in ${cwd}`);
}
