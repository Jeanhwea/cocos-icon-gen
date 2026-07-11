<div align="center">
  <h1>@jeansoft/cocos-icon-gen</h1>
  <p>为 Cocos Creator 项目生成 iOS、macOS、Windows 应用图标的命令行工具，基于 <a href="https://sharp.pixelplumbing.com/">sharp</a>。</p>
</div>

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
- `mac/` — macOS 图标集
- `win/` — Windows 图标集

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
