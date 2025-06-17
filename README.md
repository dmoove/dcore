dmpak
=================

A lightweight ESM-based CLI framework for bootstrapping and managing TypeScript project configurations with CI/CD support.


[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/dmpak.svg)](https://npmjs.org/package/dmpak)
[![Downloads/week](https://img.shields.io/npm/dw/dmpak.svg)](https://npmjs.org/package/dmpak)


<!-- toc -->
* [Configuration](#configuration)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Configuration

dmpak reads configuration from `.dmpakrc.*` or `.dmpakts.ts` in the project
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
$ npm install -g dmpak
$ dmpak COMMAND
running command...
$ dmpak (--version)
dmpak/0.0.1 linux-x64 node-v22.16.0
$ dmpak --help [COMMAND]
USAGE
  $ dmpak COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`dmpak help [COMMAND]`](#dmpak-help-command)
* [`dmpak plugins`](#dmpak-plugins)
* [`dmpak plugins add PLUGIN`](#dmpak-plugins-add-plugin)
* [`dmpak plugins:inspect PLUGIN...`](#dmpak-pluginsinspect-plugin)
* [`dmpak plugins install PLUGIN`](#dmpak-plugins-install-plugin)
* [`dmpak plugins link PATH`](#dmpak-plugins-link-path)
* [`dmpak plugins remove [PLUGIN]`](#dmpak-plugins-remove-plugin)
* [`dmpak plugins reset`](#dmpak-plugins-reset)
* [`dmpak plugins uninstall [PLUGIN]`](#dmpak-plugins-uninstall-plugin)
* [`dmpak plugins unlink [PLUGIN]`](#dmpak-plugins-unlink-plugin)
* [`dmpak plugins update`](#dmpak-plugins-update)

## `dmpak help [COMMAND]`

Display help for dmpak.

```
USAGE
  $ dmpak help [COMMAND...] [-n]

ARGUMENTS
  COMMAND...  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for dmpak.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v6.2.29/src/commands/help.ts)_

## `dmpak plugins`

List installed plugins.

```
USAGE
  $ dmpak plugins [--json] [--core]

FLAGS
  --core  Show core plugins.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ dmpak plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/index.ts)_

## `dmpak plugins add PLUGIN`

Installs a plugin into dmpak.

```
USAGE
  $ dmpak plugins add PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into dmpak.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DMPAK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DMPAK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dmpak plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dmpak plugins add myplugin

  Install a plugin from a github url.

    $ dmpak plugins add https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dmpak plugins add someuser/someplugin
```

## `dmpak plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ dmpak plugins inspect PLUGIN...

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
  $ dmpak plugins inspect myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/inspect.ts)_

## `dmpak plugins install PLUGIN`

Installs a plugin into dmpak.

```
USAGE
  $ dmpak plugins install PLUGIN... [--json] [-f] [-h] [-s | -v]

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
  Installs a plugin into dmpak.

  Uses npm to install plugins.

  Installation of a user-installed plugin will override a core plugin.

  Use the DMPAK_NPM_LOG_LEVEL environment variable to set the npm loglevel.
  Use the DMPAK_NPM_REGISTRY environment variable to set the npm registry.

ALIASES
  $ dmpak plugins add

EXAMPLES
  Install a plugin from npm registry.

    $ dmpak plugins install myplugin

  Install a plugin from a github url.

    $ dmpak plugins install https://github.com/someuser/someplugin

  Install a plugin from a github slug.

    $ dmpak plugins install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/install.ts)_

## `dmpak plugins link PATH`

Links a plugin into the CLI for development.

```
USAGE
  $ dmpak plugins link PATH [-h] [--install] [-v]

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
  $ dmpak plugins link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/link.ts)_

## `dmpak plugins remove [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dmpak plugins remove [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dmpak plugins unlink
  $ dmpak plugins remove

EXAMPLES
  $ dmpak plugins remove myplugin
```

## `dmpak plugins reset`

Remove all user-installed and linked plugins.

```
USAGE
  $ dmpak plugins reset [--hard] [--reinstall]

FLAGS
  --hard       Delete node_modules and package manager related files in addition to uninstalling plugins.
  --reinstall  Reinstall all plugins after uninstalling.
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/reset.ts)_

## `dmpak plugins uninstall [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dmpak plugins uninstall [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dmpak plugins unlink
  $ dmpak plugins remove

EXAMPLES
  $ dmpak plugins uninstall myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v5.4.40/src/commands/plugins/uninstall.ts)_

## `dmpak plugins unlink [PLUGIN]`

Removes a plugin from the CLI.

```
USAGE
  $ dmpak plugins unlink [PLUGIN...] [-h] [-v]

ARGUMENTS
  PLUGIN...  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ dmpak plugins unlink
  $ dmpak plugins remove

EXAMPLES
  $ dmpak plugins unlink myplugin
```

## `dmpak plugins update`

Update installed plugins.

```
USAGE
  $ dmpak plugins update [-h] [-v]

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
