#!/usr/bin/env node
import { parseArgs } from 'node:util';
import { genIosIcons, genMacIcon, genWinIcon } from '@/icon';
import { APP_NAME, APP_VERSION } from '@/version';
import { IOS_OUTPUT } from '@/generators/ios';
import { MAC_OUTPUT } from '@/generators/mac';
import { WIN_OUTPUT } from '@/generators/win';


const APP_DESCRIPTION = 'Generate app icons for Cocos projects';

function printUsage(): void {
  // eslint-disable-next-line no-console
  console.error(`Usage: ${APP_NAME} <source-image> [output-dir]
${APP_DESCRIPTION}

Options:
  -h, --help       Show this help message
  -v, --version    Show version number
  -i, --ios        Generate iOS icons only (default: all)
  -m, --mac        Generate macOS icon only (default: all)
  -w, --win        Generate Windows icon only (default: all)

When no platform flags are specified, all three icon sets are generated.

Examples:
  ${APP_NAME} icon.png
  ${APP_NAME} icon.png ./output
  ${APP_NAME} --ios icon.png
  ${APP_NAME} --mac --win icon.png

Version: v${APP_VERSION}`);
}

async function main(): Promise<void> {
  const { positionals, values } = parseArgs({
    args: process.argv.slice(2),
    allowPositionals: true,
    options: {
      help: { type: 'boolean', short: 'h' },
      version: { type: 'boolean', short: 'v' },
      ios: { type: 'boolean', short: 'i' },
      mac: { type: 'boolean', short: 'm' },
      win: { type: 'boolean', short: 'w' },
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
  const outDir = positionals[1] ?? '.';

  // Determine which platforms to generate
  const hasPlatformFlag = values.ios || values.mac || values.win;
  const genIos = hasPlatformFlag ? !!values.ios : true;
  const genMac = hasPlatformFlag ? !!values.mac : true;
  const genWin = hasPlatformFlag ? !!values.win : true;

  // eslint-disable-next-line no-console
  console.log(`Current Version: v${APP_VERSION}`);

  try {
    if (genIos) {
      await genIosIcons(source, `${outDir}/${IOS_OUTPUT}`);
    }
    if (genMac) {
      await genMacIcon(source, `${outDir}/${MAC_OUTPUT}`);
    }
    if (genWin) {
      await genWinIcon(source, `${outDir}/${WIN_OUTPUT}`);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err instanceof Error ? err.message : String(err));
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.log('Icons generated successfully!');
}

main();