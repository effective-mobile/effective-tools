export { config as readEnv } from 'https://deno.land/x/dotenv@v2.0.0/mod.ts';
export * as path from 'https://deno.land/std/path/mod.ts';
export { exists } from 'https://deno.land/std/fs/mod.ts';
export { capitalize } from 'https://deno.land/x/nodash@4.17.9.2/src/mod.ts';
export * as flags from 'https://deno.land/std@0.98.0/flags/mod.ts';
export * as cliffy from 'https://deno.land/x/cliffy@v0.19.1/mod.ts';
import makeloc from 'https://deno.land/x/dirname/mod.ts';

export const __ = makeloc;
