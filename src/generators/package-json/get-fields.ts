export function getBaseFields(config: any): Record<string, unknown> {
  return {
    name: config.projectName || 'my-project',
    version: config.projectVersion || '0.1.0',
    description: config.projectDesription || '',
    author: config.projectAuthor || '',
    license: config.projectLicense || 'MIT',
    private: true,
    type: 'module',
  };
}

export function getScripts(config: any): Record<string, string> {
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

export function getExportFields(config: any): Record<string, unknown> {
  const { main, types, exports: exp, files } = config.exports || {};

  const anyDefined = main || types || exp || files;
  const allDefined = main && types && exp && files;

  if (anyDefined && !allDefined) {
    throw new Error(
      'Invalid "exports" config in .dcorerc: If any of main/types/exports/files are set, all must be set.'
    );
  }

  if (allDefined) {
    return {
      main,
      types,
      exports: exp,
      files,
    };
  }

  // Defaults, if nothing provided
  if (config.projectType === 'ts-lib' || config.projectType === 'cdk-lib') {
    return {
      main: './dist/index.js',
      types: './dist/index.d.ts',
      exports: {
        '.': {
          import: './dist/index.js',
          types: './dist/index.d.ts',
        },
      },
      files: ['dist'],
    };
  }

  return {};
}

export function toObject(map: Map<string, string>): Record<string, string> {
  return Object.fromEntries(map.entries());
}
