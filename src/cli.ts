#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { genIosIcons, genMacIcon, genWinIcon } from './icon.js';
import { APP_DESCRIPTION, APP_NAME, APP_VERSION } from './version.js';

function printUsage(): void {
  // eslint-disable-next-line no-console
  console.error(`Usage: ${APP_NAME} <source-image> [output-dir]
${APP_DESCRIPTION}
Version: ${APP_VERSION}`);
}

function main(): void {
  const { positionals, values } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
    },
  });

  if (values.help) {
    printUsage();
    return;
  }

  if (values.version) {
    console.log(`v${APP_VERSION}`);
    return;
  }

  if (positionals.length < 1) {
    printUsage();
    process.exit(1);
  }

  const source = positionals[0];

  // eslint-disable-next-line no-console
  console.log(`Current Version: ${APP_VERSION}`);

  genIosIcons(source);
  genMacIcon(source);
  genWinIcon(source);

  // eslint-disable-next-line no-console
  console.log('Icons generated successfully!');
}

main();
