// src/core/tool-generator.ts
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface GeneratorConfig {
  [key: string]: unknown;
  tools?: Record<string, unknown>;
}

export abstract class ToolGenerator {
  abstract name: string;

  constructor(protected readonly projectRoot: string) {}

  abstract generate(config: GeneratorConfig): Promise<void>;
  /**
   * Optionale Unterstützung für Tools mit Standardkonfiguration
   */
  protected getDefaultConfig(): Record<string, unknown> {
    return {};
  }

  protected getMergedConfig(userConfig: boolean | object): Record<string, unknown> {
    return typeof userConfig === 'object'
      ? { ...this.getDefaultConfig(), ...userConfig }
      : this.getDefaultConfig();
  }

  abstract shouldRun(config: GeneratorConfig): boolean;

  protected async writeJsonFile(
    filename: string,
    data: unknown
  ): Promise<void> {
    const path = resolve(this.projectRoot, filename);
    await writeFile(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }

  protected async writeTextFile(
    filename: string,
    content: string
  ): Promise<void> {
    const path = resolve(this.projectRoot, filename);
    await writeFile(path, content, 'utf8');
  }
}
