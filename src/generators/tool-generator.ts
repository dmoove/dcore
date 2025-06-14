// src/core/tool-generator.ts
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

export abstract class ToolGenerator {
  abstract name: string;

  constructor(protected readonly projectRoot: string) {}

  abstract shouldRun(config: any): boolean;
  abstract generate(config: any): Promise<void>;

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

  /**
   * Optionale Unterstützung für Tools mit Standardkonfiguration
   */
  protected getDefaultConfig(): Record<string, any> {
    return {};
  }

  protected getMergedConfig(userConfig: boolean | object): Record<string, any> {
    return typeof userConfig === 'object'
      ? { ...this.getDefaultConfig(), ...userConfig }
      : this.getDefaultConfig();
  }
}
