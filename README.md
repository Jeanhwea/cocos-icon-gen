# @jeansoft/cocos-icon-gen

Generate iOS, macOS, and Windows app icons for Cocos Creator projects from a single source image.

## Install

```bash
pnpm add -g @jeansoft/cocos-icon-gen
```

Or use directly via `npx` without installing:

```bash
npx @jeansoft/cocos-icon-gen <source-image> [output-dir]
```

## CLI

```bash
cocos-icon-gen <source-image> [output-dir] [options]
```

- `<source-image>` — Source image path (supports PNG, JPEG, WebP, and other formats supported by sharp; minimum 1024×1024 recommended for macOS ICNS)
- `output-dir` — Output directory (default: current directory `.`)
- `-h, --help` — Show help
- `-v, --version` — Show version number
- `-i, --ios` — Generate iOS icons only
- `-m, --mac` — Generate macOS icon only
- `-w, --win` — Generate Windows icon only

When no platform flags are specified, all three icon sets are generated.

### Examples

```bash
# Generate all three icon sets
cocos-icon-gen icon.png

# Custom output directory
cocos-icon-gen icon.png ./my-icons

# Generate only iOS icons
cocos-icon-gen --ios icon.png

# Generate macOS and Windows icons only
cocos-icon-gen --mac --win icon.png
```

### Output Layout

Output paths match Cocos Creator project conventions:

| Platform | Path                                                                                   |
| -------- | -------------------------------------------------------------------------------------- |
| iOS      | `proj.ios_mac/ios/Images.xcassets/AppIcon.appiconset/` (20 PNG files)                  |
| macOS    | `proj.ios_mac/mac/Icon.icns` (true ICNS format, 12 sizes 16×16 to 1024×1024)           |
| Windows  | `proj.win32/res/game.ico` (true multi-resolution ICO format: 16, 32, 48, 64, 128, 256) |

## API

```ts
import {
  genIosIcons,
  genMacIcon,
  genWinIcon,
  IOS_ICONS,
  IOS_ICON_NAMES,
  IOS_OUTPUT,
  MAC_OUTPUT,
  WIN_OUTPUT,
  parseIconSize,
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
} from '@jeansoft/cocos-icon-gen';

import type { IconInfo } from '@jeansoft/cocos-icon-gen';

// Generate icon sets
await genIosIcons('icon.png'); // default: proj.ios_mac/ios/...
await genIosIcons('icon.png', 'output/ios'); // custom directory
await genMacIcon('icon.png'); // default: proj.ios_mac/mac/Icon.icns
await genMacIcon('icon.png', 'output/mac/Icon.icns');
await genWinIcon('icon.png'); // default: proj.win32/res/game.ico
await genWinIcon('icon.png', 'output/win/game.ico');

// Introspection
console.log(IOS_ICONS);
// → [{ filename: 'Icon-29.png', size: 29 }, ...]

console.log(IOS_ICON_NAMES);
// → ['Icon-29.png', 'Icon-76@2x.png', ...]

parseIconSize('Icon-83.5@2x.png');
// → 167

console.log(IOS_OUTPUT); // 'proj.ios_mac/ios/Images.xcassets/AppIcon.appiconset'
console.log(MAC_OUTPUT); // 'proj.ios_mac/mac/Icon.icns'
console.log(WIN_OUTPUT); // 'proj.win32/res/game.ico'
```

### `IconInfo`

```ts
interface IconInfo {
  filename: string;
  size: number; // pixel size (e.g. 167 for Icon-83.5@2x.png)
}
```

## Development

```bash
pnpm install
pnpm build
pnpm typecheck
pnpm test
pnpm format
```

## License

MIT
