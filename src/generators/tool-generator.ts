import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { z } from 'zod';

import type { DcoreConfig } from '../config/load-config.js';

export const DEFAULT_IGNORE_ENTRIES = [
  'node_modules',
  'dist',
  'build',
  'coverage',
];

/**
 * Die Konfigurationsstruktur für jeden Generator
 */
export interface GeneratorConfig extends DcoreConfig {
  exports?: {
    exports?: Record<string, unknown>;
    files?: string[];
    main?: string;
    types?: string;
  };
  /** Indicates that generation is triggered during `dcore init` */
  isInit?: boolean;
  projectHomepage?: string;
  projectKeywords?: string[];
  projectRepository?: string;
}

/**
 * Abstrakte Basisklasse für Generatoren
 */
export abstract class ToolGenerator {
  abstract name: string;

  constructor(protected readonly projectRoot: string) {}

  protected static isRecord(val: unknown): val is Record<string, unknown> {
    return typeof val === 'object' && val !== null && !Array.isArray(val);
  }

  /**
   * Optional: zod-Schema für Tool-spezifische Konfiguration
   * (kann von Subklassen überschrieben werden)
   */
  static get configSchema(): undefined | z.ZodTypeAny {
    return undefined;
  }

  /**
   *
   * @param filename Name der Datei, die aktualisiert werden soll
   * @description Fügt Einträge zu einer .gitignore- oder .npmignore-Datei hinzu
   * @param entries Die Pfade oder Pattern, die ignoriert werden sollen
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
   * Retrieves the configuration block for this tool from the global config
   */
  protected getToolConfig(
    config: Partial<GeneratorConfig>
  ): boolean | Record<string, unknown> {
    return config.tools?.[this.name] ?? false;
  }

  /**
   * Soll der Generator ausgeführt werden?
   */
  abstract shouldRun(config: GeneratorConfig): boolean;

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
}
