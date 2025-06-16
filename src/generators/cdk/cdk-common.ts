import { PackageJsonGenerator } from '../package-json/package-json-generator.js';
import { ToolGenerator } from '../tool-generator.js';

export const AWS_CDK_VERSION = '^2.201.0';
export const CONSTRUCTS_VERSION = '^10.4.2';

/**
 * Shared helper logic for CDK generators.
 */
export abstract class CdkCommon extends ToolGenerator {
  constructor(projectRoot: string, protected readonly pkg?: PackageJsonGenerator) {
    super(projectRoot);
  }

  /** Add CDK related devDependencies. */
  protected addDevDependencies(): void {
    this.pkg?.addDevDependency('aws-cdk-lib', AWS_CDK_VERSION);
    this.pkg?.addDevDependency('constructs', CONSTRUCTS_VERSION);
  }

  /** Add CDK related peerDependencies. */
  protected addPeerDependencies(): void {
    this.pkg?.addPeerDependency('aws-cdk-lib', AWS_CDK_VERSION);
    this.pkg?.addPeerDependency('constructs', CONSTRUCTS_VERSION);
  }

  /** Add CDK related runtime dependencies. */
  protected addRuntimeDependencies(): void {
    this.pkg?.addDependency('aws-cdk-lib', AWS_CDK_VERSION);
    this.pkg?.addDependency('constructs', CONSTRUCTS_VERSION);
  }
}
