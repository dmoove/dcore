export function pascalCase(input: string): string {
  return input
    .replaceAll(/(^|[^a-zA-Z0-9]+)([a-zA-Z0-9])/g, (_m, _p1, p2) => p2.toUpperCase())
    .replaceAll(/[^a-zA-Z0-9]/g, '');
}
