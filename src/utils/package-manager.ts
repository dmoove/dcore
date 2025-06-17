import { spawn } from 'node:child_process';

/**
 * Install dependencies using the specified package manager.
 *
 * @param packageManager - Command like 'pnpm', 'npm', or 'yarn'
 */
export async function runInstall(packageManager: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const proc = spawn(packageManager, ['install'], { stdio: 'inherit' });
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${packageManager} install failed with exit code ${code}`));
    });
    proc.on('error', reject);
  });
}
