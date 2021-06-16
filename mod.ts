#!/usr/bin/env -S deno run --allow-read=.. --allow-write=.. --allow-run --unstable

import { maybePlatform } from './config.ts';
import { cliffy } from './deps.ts';
import { updateGoogleConfigs } from './update_firebase_configs.ts';

const { Command, HelpCommand } = cliffy;

if (import.meta.main) {
  main().then();
}

async function main() {
  await new Command()
    .name('effective')
    .version('1.0.0')
    .description('Command line framework for effective mobile projects')
    .command('help', new HelpCommand())
    .command('firebase',
      new Command()
        .command('help', new HelpCommand())
        .command('config_update [platform:string]',
          new Command()
            .description('Fetch and update firebase google config files')
            .action(async (a1: any, a2: any, a3: any) => {
              const _platform = maybePlatform(a2);
              if (!_platform) {
                throw new Error(`Invalid platform specified: ${a2}`);
              }
              await updateGoogleConfigs(_platform);
            })
            .command('help', new HelpCommand()),
        )
      ,
    )
    .parse(Deno.args);
}
