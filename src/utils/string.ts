/**
 * Convert a string to PascalCase.
 *
 * Every non alphanumeric character starts a new word and will be removed in the
 * final result.
 *
 * @param input - The string to transform
 * @returns The PascalCase version of the input
 */
export function pascalCase(input: string): string {
  return input
    .replaceAll(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_m, _p1, p2) => p2.toUpperCase())
    .replaceAll(/[^a-zA-Z0-9]/g, '');
}
