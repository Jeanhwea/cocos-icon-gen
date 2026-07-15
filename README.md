# @jeansoft/cocos-icon-gen

[![npm version](https://img.shields.io/npm/v/@jeansoft/cocos-icon-gen.svg)](https://www.npmjs.com/package/@jeansoft/cocos-icon-gen)
[![license](https://img.shields.io/npm/l/@jeansoft/cocos-icon-gen.svg)](https://github.com/Jeanhwea/cocos-icon-gen/blob/master/LICENSE)

Generate iOS, macOS, and Windows app icons for Cocos Creator projects from a single source image.

## Install

```bash
pnpm add -g @jeansoft/cocos-icon-gen
```

Or use directly via `npx`:

```bash
npx @jeansoft/cocos-icon-gen <source-image> [output-dir]
```

## Usage

```bash
cocos-icon-gen <source-image> [output-dir] [options]
```

- `<source-image>` — Source image path (PNG, JPEG, WebP, etc.; min 1024×1024 recommended for ICNS)
- `output-dir` — Output directory (default: current directory `.`)
- `-h, --help` — Show help
- `-v, --version` — Show version number
- `-i, --ios` — iOS icons only
- `-m, --mac` — macOS icon only
- `-w, --win` — Windows icon only

Omitting platform flags generates all three.

### Examples

```bash
# All three icon sets
cocos-icon-gen icon.png

# Custom output directory
cocos-icon-gen icon.png ./my-icons

# iOS only
cocos-icon-gen --ios icon.png

# macOS and Windows
cocos-icon-gen --mac --win icon.png
```

### Output Layout

| Platform | Path |
| -------- | ---- |
| iOS      | `proj.ios_mac/ios/Images.xcassets/AppIcon.appiconset/` (20 PNGs) |
| macOS    | `proj.ios_mac/mac/Icon.icns` (ICNS, 12 sizes 16×16 to 1024×1024) |
| Windows  | `proj.win32/res/game.ico` (multi-ICO: 16, 32, 48, 64, 128, 256) |

## API

```ts
import {
  genIosIcons,   // (sourcePath, outDir?) => Promise<void>
  genMacIcon,    // (sourcePath, outFile?) => Promise<void>
  genWinIcon,    // (sourcePath, outFile?) => Promise<void>
  IOS_ICONS,     // IconInfo[] — 20 icon definitions
  IOS_ICON_NAMES,// string[]
  IOS_OUTPUT,    // 'proj.ios_mac/ios/Images.xcassets/AppIcon.appiconset'
  MAC_OUTPUT,    // 'proj.ios_mac/mac/Icon.icns'
  WIN_OUTPUT,    // 'proj.win32/res/game.ico'
  parseIconSize, // (filename: string) => number
} from '@jeansoft/cocos-icon-gen';

import type { IconInfo } from '@jeansoft/cocos-icon-gen';
// { filename: string; size: number }
```

```ts
// Default outputs match Cocos Creator project layout:
await genIosIcons('icon.png');                     // proj.ios_mac/ios/...
await genIosIcons('icon.png', 'output/ios');
await genMacIcon('icon.png');                      // proj.ios_mac/mac/Icon.icns
await genMacIcon('icon.png', 'output/mac/Icon.icns');
await genWinIcon('icon.png');                      // proj.win32/res/game.ico
await genWinIcon('icon.png', 'output/win/game.ico');
```

## Development

```bash
pnpm install
pnpm build
pnpm typecheck
pnpm test
```

## License

MIT
