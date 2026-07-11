# @jeansoft/cocos-icon-gen

为 Cocos Creator 项目生成 iOS、macOS、Windows 应用图标的命令行工具

## 安装

```bash
pnpm add -g @jeansoft/cocos-icon-gen
```

## 使用

```bash
npx @jeansoft/cocos-icon-gen <source-image> [output-dir]
```

- `<source-image>` — 源图片路径（PNG 格式，建议 1024×1024 以上）
- `output-dir` — 输出目录（默认 `./output-icons`）

示例：

```bash
npx @jeansoft/cocos-icon-gen icon.png ./my-icons
```

输出目录会生成以下子目录和文件：

- `ios/` — iOS 图标集（20 个尺寸，含 @2x/@3x）
 - `mac/` — macOS 图标集（输出为 512×512 PNG 文件，命名为 `Icon.png`；由于兼容性原因，文件名后缀为 `.icns`，但实际内容为 PNG 格式）
 - `win/` — Windows 图标集（输出为 128×128 PNG 文件，命名为 `game.ico`；由于兼容性原因，文件名后缀为 `.ico`，但实际内容为 PNG 格式）

## API

```ts
import { genIosIcons, genMacIcon, genWinIcon } from '@jeansoft/cocos-icon-gen';

genIosIcons('icon.png', 'output/ios');
genMacIcon('icon.png', 'output/mac');
genWinIcon('icon.png', 'output/win');
```

## 开发

```bash
pnpm install
pnpm build
pnpm typecheck
pnpm test
pnpm format
```

## License

MIT
