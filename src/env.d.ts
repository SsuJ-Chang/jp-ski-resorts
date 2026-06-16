/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string
}

declare module 'node:child_process' {
  export function execFileSync(
    command: string,
    args: readonly string[],
    options: { encoding: 'utf8'; stdio?: readonly ['ignore', 'pipe', 'ignore'] },
  ): string
}

declare module 'node:fs' {
  export function statSync(path: string): { mtime: Date }
}
