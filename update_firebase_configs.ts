import { configs, paths, PlatformEnum } from './config.ts';
import { capitalize, path, readEnv } from './deps.ts';
import { IGoogleServicesJson } from './types.ts';

export async function updateGoogleConfigs(platform: PlatformEnum) {
  const variations = {
    [PlatformEnum.ios]: {
      getGoogleConfigPaths: getGoogleConfigPathsIos,
      processConfigData: undefined,
    },
    [PlatformEnum.android]: {
      getGoogleConfigPaths: getGoogleConfigPathsAndroid,
      processConfigData: processConfigDataAndroid,
    },
  };

  function* getConfigItems() {
    for (const config of configs) {
      const envFilePath = path.join(paths.configDir, `${config}.${platform}.env`);
      const env = readEnv({ path: envFilePath });
      const firebaseProjectId = env?.FIREBASE_PROJECT_ID;
      const firebaseAppId = env?.FIREBASE_APP_ID;
      const googleConfigPaths = variations[platform].getGoogleConfigPaths(config);

      yield {
        config,
        platform,
        envFilePath,
        googleConfigPaths,
        firebaseProjectId,
        firebaseAppId,
      };
    }
  }

  function getGoogleConfigPathsIos(config: string) {
    const modes = ['Release', 'Debug'];
    return modes.map(mode => path.join(
      paths.ios.googleConfigDir, `GoogleService-Info-${capitalize(config)}${mode}.plist`));
  }

  function getGoogleConfigPathsAndroid(config: string) {
    const modes = ['release', 'debug'];
    return modes.map(mode => path.join(
      paths.android.googleConfigDir, mode, config, 'google-services.json'));
  }

  function processConfigDataAndroid(data: string, info: { firebaseAppId: string }) {
    const json = JSON.parse(data) as IGoogleServicesJson;
    const clients = json?.client?.filter(client => client.client_info?.mobilesdk_app_id === info.firebaseAppId);
    json.client = clients;
    return JSON.stringify(json, undefined, 2);
  }

  async function fetchAppConfig(opts: { firebaseProjectId: string; firebaseAppId: string }) {
    const { firebaseProjectId, firebaseAppId } = opts;
    await Deno.run({ cmd: ['firebase', 'use', firebaseProjectId] }).status();
    const p = Deno.run({ cmd: ['firebase', 'apps:sdkconfig', platform, firebaseAppId], stdout: 'piped' });
    await p.status();
    let data = new TextDecoder().decode(await p.output());
    data = variations[platform].processConfigData?.(data, opts) || data;
    return data;
  }

  const configItems = [...getConfigItems()];
  // console.log('configItems', configItems);
  // return;

  for (const item of configItems) {
    const data = await fetchAppConfig(item);
    for (const googlePath of item.googleConfigPaths) {
      await Deno.writeTextFile(googlePath, data);
    }
  }
}
