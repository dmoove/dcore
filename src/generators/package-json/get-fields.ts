import type { GeneratorConfig } from '../tool-generator.js';

export function getBaseFields(config: Partial<GeneratorConfig>): Record<string, unknown> {
  return {
    author: config.projectAuthor || '',
    description: config.projectDesription || '',
    license: config.projectLicense || 'MIT',
    name: config.projectName || 'my-project',
    private: true,
    type: 'module',
    version: config.projectVersion || '0.1.0',
  };
}

export function getScripts(config: Partial<GeneratorConfig>): Record<string, string> {
  const scripts: Record<string, string> = {
    build: 'tsc',
    format: 'prettier --check .',
    formatfix: 'prettier --write .',
    lint: 'eslint .',
  };

  if (config.tools?.jest || config.tools?.vitest) {
    scripts.test = 'vitest run';
    scripts['test:watch'] = 'vitest watch';
  }

  if (config.projectType?.startsWith('cdk')) {
    scripts['cdk:deploy'] = 'cdk deploy';
    scripts['cdk:diff'] = 'cdk diff';
    scripts['cdk:synth'] = 'cdk synth';
  }

  return scripts;
}

export function getExportFields(config: Partial<GeneratorConfig>): Record<string, unknown> {
  const { exports: exp, files, main, types } = config.exports || {};

  const anyDefined = main || types || exp || files;
  const allDefined = main && types && exp && files;

  if (anyDefined && !allDefined) {
    throw new Error(
      'Invalid "exports" config in .dcorerc: If any of main/types/exports/files are set, all must be set.'
    );
  }

  if (allDefined) {
    return {
      exports: exp,
      files,
      main,
      types,
    };
  }

  // Defaults, if nothing provided
  if (config.projectType === 'ts-lib' || config.projectType === 'cdk-lib') {
    return {
      exports: {
        '.': {
          import: './dist/index.js',
          types: './dist/index.d.ts',
        },
      },
      files: ['dist'],
      main: './dist/index.js',
      types: './dist/index.d.ts',
    };
  }

  return {};
}

export function toObject(map: Map<string, string>): Record<string, string> {
  return Object.fromEntries(map.entries());
}
