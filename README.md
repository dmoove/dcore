dcore
=================

A lightweight ESM-based CLI framework for bootstrapping and managing TypeScript project configurations with CI/CD support.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dcore.svg)](https://npmjs.org/package/dcore)
[![Downloads/week](https://img.shields.io/npm/dw/dcore.svg)](https://npmjs.org/package/dcore)


<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Configuration

dcore reads configuration from `.dcorerc.*` or `.dcorets.ts` in the project
root. Besides enabling tools you can declare additional dependencies which will
be merged into the generated `package.json`:

```ts
export default {
  projectName: 'my-app',
  tools: { eslint: true, prettier: true },
  dependencies: {
    devDependencies: {
      eslint: '^8.56.0',
      prettier: '^3.2.5',
    },
  },
};
```

# Usage
<!-- usage -->
```sh-session
$ npm install -g dcore
$ dcore COMMAND
running command...
$ dcore (--version)
dcore/0.0.0 linux-x64 node-v20.19.0
$ dcore --help [COMMAND]
USAGE
  $ dcore COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dcore hello PERSON`](#dcore-hello-person)
* [`dcore hello world`](#dcore-hello-world)
* [`dcore help [COMMAND]`](#dcore-help-command)
* [`dcore plugins`](#dcore-plugins)
* [`dcore plugins add PLUGIN`](#dcore-plugins-add-plugin)
* [`dcore plugins:inspect PLUGIN...`](#dcore-pluginsinspect-plugin)
* [`dcore plugins install PLUGIN`](#dcore-plugins-install-plugin)
* [`dcore plugins link PATH`](#dcore-plugins-link-path)
* [`dcore plugins remove [PLUGIN]`](#dcore-plugins-remove-plugin)
* [`dcore plugins reset`](#dcore-plugins-reset)
* [`dcore plugins uninstall [PLUGIN]`](#dcore-plugins-uninstall-plugin)
* [`dcore plugins unlink [PLUGIN]`](#dcore-plugins-unlink-plugin)
* [`dcore plugins update`](#dcore-plugins-update)

## `dcore hello PERSON`

Say hello

```
USAGE
  $ dcore hello PERSON -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ dcore hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [src/commands/hello/index.ts](https://github.com/dmoove/dcore/blob/v0.0.0/src/commands/hello/index.ts)_

## `dcore hello world`

Say hello world

```
USAGE
  $ dcore hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ dcore hello world
  hello world! (./src/commands/hello/world.ts)
```

_See code: [src/commands/hello/world.ts](https://github.com/dmoove/dcore/blob/v0.0.0/src/commands/hello/world.ts)_

## `dcore help [COMMAND]`

Display help for dcore.

```
USAGE
  $ dcore help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for dcore.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `dcore plugins`

List installed plugins.

```
USAGE
  $ dcore plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ dcore plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/index.ts)_

## `dcore plugins add PLUGIN`

Installs a plugin into dcore.

```
USAGE
  $ dcore plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into dcore.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DCORE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DCORE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dcore plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dcore plugins add myplugin

  Install a plugin from a github url.

    $ dcore plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dcore plugins add someuser/someplugin
```

## `dcore plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ dcore plugins inspect PLUGIN...

ARGUMENTS
  PLUGIN...  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ dcore plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/inspect.ts)_

## `dcore plugins install PLUGIN`

Installs a plugin into dcore.

```
USAGE
  $ dcore plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

ARGUMENTS
  PLUGIN...  Plugin to install.

FLAGS
  -f, --force    Force npm to fetch remote resources even if a local copy exists on disk.
  -h, --help     Show CLI help.
  -s, --silent   Silences npm output.
  -v, --verbose  Show verbose npm output.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Installs a plugin into dcore.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DCORE_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DCORE_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dcore plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dcore plugins install myplugin

  Install a plugin from a github url.

    $ dcore plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dcore plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/install.ts)_

## `dcore plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ dcore plugins link PATH [-h] [--install] [-v]

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help          Show CLI help.
  -v, --verbose
      --[no-]install  Install dependencies after linking the plugin.

DESCRIPTION
  Links a plugin into the CLI for development.

  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ dcore plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/link.ts)_

## `dcore plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dcore plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dcore plugins unlink
  $ dcore plugins remove

EXAMPLES
  $ dcore plugins remove myplugin
```

## `dcore plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ dcore plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/reset.ts)_

## `dcore plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dcore plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dcore plugins unlink
  $ dcore plugins remove

EXAMPLES
  $ dcore plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/uninstall.ts)_

## `dcore plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dcore plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dcore plugins unlink
  $ dcore plugins remove

EXAMPLES
  $ dcore plugins unlink myplugin
```

## `dcore plugins update`

Update installed plugins.

```
USAGE
  $ dcore plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/update.ts)_
<!-- commandsstop -->

## Release

The GitHub Actions workflow publishes to npm when a GitHub release is created. Set the
`NPM_TOKEN` secret in your repository so the workflow can authenticate with the registry.
