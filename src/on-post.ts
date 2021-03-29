import { group, setFailed } from '@actions/core';
import { onSaveConfig } from './config';

async function main() {
  await group('Save Rclone Config', onSaveConfig);
}

main().catch(setFailed);
