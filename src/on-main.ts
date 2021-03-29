import { group, setFailed } from '@actions/core';
import { onLoadConfig } from './config';
import { install } from './install';

async function main() {
  await group('Install Rclone', install);
  await group('Load Rclone Config', onLoadConfig);
}

main().catch(setFailed);
