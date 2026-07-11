export interface IconInfo {
  filename: string;
  size: number;
}

export interface GenOptions {
  /** Output directory (for iOS PNG icons) */
  outDir?: string;
  /** Output file path (for macOS ICNS / Windows ICO) */
  outFile?: string;
}
