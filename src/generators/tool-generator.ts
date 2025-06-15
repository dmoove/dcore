import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { z } from 'zod';

export const DEFAULT_IGNORE_ENTRIES = [
  'node_modules',
  'dist',
  'build',
  'coverage',
];

/**
 * Die Konfigurationsstruktur für jeden Generator
 */
export interface GeneratorConfig {
  projectName: string;
  projectType: 'cdk-app' | 'cdk-lib' | 'ts-lib';
  projectVersion?: string;
  projectAuthor?: string;
  projectDesription?: string;
  projectLicense?: string;
  projectRepository?: string;
  projectHomepage?: string;
  projectKeywords?: string[];
  release?: 'changesets' | 'semantic-release';
  ci?: 'github' | 'gitlab';
  tools?: Record<string, boolean | Record<string, unknown>>;
  dependencies?: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
  };
}

/**
 * Abstrakte Basisklasse für Generatoren
 */
export abstract class ToolGenerator {
  abstract name: string;

  constructor(protected readonly projectRoot: string) {}

  /**
   * Optional: zod-Schema für Tool-spezifische Konfiguration
   * (kann von Subklassen überschrieben werden)
   */
  static get configSchema(): z.ZodTypeAny | undefined {
    return undefined;
  }

  /**
   * Soll der Generator ausgeführt werden?
   */
  abstract shouldRun(config: GeneratorConfig): boolean;

  /**
   * Führt die Generierung aus
   */
  abstract generate(config: GeneratorConfig): Promise<void>;

  /**
   * Optional: Default-Konfiguration für Tool
   */
  protected getDefaultConfig(): Record<string, unknown> {
    return {};
  }

  /**
   * Nutzt die Default-Konfiguration, gemerged mit der User-Konfiguration
   */
  protected getMergedConfig(
    userConfig: boolean | Record<string, unknown>
  ): Record<string, unknown> {
    return typeof userConfig === 'object'
      ? { ...this.getDefaultConfig(), ...userConfig }
      : this.getDefaultConfig();
  }

  /**
   * Hilfsmethode zum Schreiben von JSON-Dateien
   */
  protected async writeJsonFile(
    filename: string,
    data: unknown
  ): Promise<void> {
    const path = resolve(this.projectRoot, filename);
    await writeFile(path, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }

  protected static isRecord(val: unknown): val is Record<string, unknown> {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
  }

  /**
   * Hilfsmethode zum Schreiben von Text-Dateien
   */
  protected async writeTextFile(
    filename: string,
    content: string
  ): Promise<void> {
    const path = resolve(this.projectRoot, filename);
    await writeFile(path, content, 'utf8');
  }

  /**
   *
   * @param filename Name der Datei, die aktualisiert werden soll
   * @description Fügt Einträge zu einer .gitignore- oder .npmignore-Datei hinzu
   * @param entries
   */
  protected async appendToIgnoreFile(
    filename: string,
    ...entries: string[]
  ): Promise<void> {
    const path = resolve(this.projectRoot, filename);

    const existing = existsSync(path) ? await readFile(path, 'utf8') : '';

    const lines = new Set(
      existing
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
    );

    for (const entry of entries) {
      lines.add(entry);
    }

    const newContent = [...lines].sort().join('\n') + '\n';
    await writeFile(path, newContent, 'utf8');
  }
}
