#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { genIosIcons, genMacIcon, genWinIcon } from '@/icon.js';
import { APP_NAME, APP_VERSION } from '@/version.js';

const APP_DESCRIPTION = 'Generate app icons for Cocos projects';

function printUsage(): void {
  // eslint-disable-next-line no-console
  console.error(`Usage: ${APP_NAME} <source-image>
${APP_DESCRIPTION}
Version: v${APP_VERSION}`);
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
    process.exit(0);
  }

  if (values.version) {
    // eslint-disable-next-line no-console
    console.log(`v${APP_VERSION}`);
    process.exit(0);
  }

  if (positionals.length < 1) {
    printUsage();
    process.exit(1);
  }

  const source = positionals[0];

  // eslint-disable-next-line no-console
  console.log(`Current Version: v${APP_VERSION}`);

  try {
    genIosIcons(source);
    genMacIcon(source);
    genWinIcon(source);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log('Icons generated successfully!');
}

main();
