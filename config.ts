import { __, path } from './deps.ts';

const { __dirname } = __(import.meta);

export enum PlatformEnum {
  ios = 'ios',
  android = 'android'
}

export const platforms = [PlatformEnum.ios, PlatformEnum.android];
// const configs = ['development', 'staging', 'preview', 'preproduction', 'production'];
export const configs = ['development', 'staging', 'preview', 'preproduction'];

export const paths = {
  get rootDir() {
    return path.join(__dirname, '..');
  },
  get configDir() {
    return path.join(__dirname, '../config');
  },
  ios: {
    get googleConfigDir() {
      return path.join(__dirname, '../ios/GoogleServiceInfoPlists');
    },
  },
  android: {
    get googleConfigDir() {
      return path.join(__dirname, '../android/app/src');
    },
  },
};

export function maybePlatform(val: any): PlatformEnum | undefined {
  return platforms.find(p => p === val);
}
