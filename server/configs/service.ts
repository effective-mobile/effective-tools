import { paths } from '../../config.ts';
import { exists, path, readEnv } from '../../deps.ts';
import { LogicErrorCode, Result } from '../core.ts';

export class ConfigsService {
  public async list() {
    const payload = [...Deno.readDirSync(paths.configDir)].map(entry => entry.name);
    return Result.success(payload);
  }

  public async configText(name: string) {
    const filePath = path.join(paths.configDir, name);
    if (exists(filePath)) {
      return Result.success(await Deno.readTextFile(filePath));
    }
    return Result.error(LogicErrorCode.NotFound);
  }

  public async configJson(name: string) {
    const filePath = path.join(paths.configDir, name);
    if (await exists(filePath)) {
      return Result.success(await readEnv({ path: filePath }));
    }
    return Result.error(LogicErrorCode.NotFound);
  }

  public async packageJson() {
    const filePath = path.join(paths.rootDir, 'package.json');
    if (exists(filePath)) {
      return await Deno.readTextFile(filePath);
    }
    return undefined;
  }
}
