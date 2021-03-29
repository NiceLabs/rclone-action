import { getInput, info } from '@actions/core';
import { mkdirP } from '@actions/io';
import { promises as fs } from 'fs';
import path from 'path';
import { setRepoSecret } from './shared';

const configDir = path.join(process.env.HOME!, '.config', 'rclone');
const configFile = path.join(configDir, 'rclone.conf');

export const onLoadConfig = async () => {
  const content = getInput('config', { required: true });
  await mkdirP(configDir);
  info(`Write to ${configFile}`);
  await fs.writeFile(configFile, content, 'utf-8');
  info('Done');
};

export const onSaveConfig = async () => {
  const name = getInput('config-secret-name');
  if (name === '') {
    return;
  }
  info(`Read from ${configFile}`);
  const content = await fs.readFile(configFile, 'utf-8');
  info(`Update "${name}" repository secret`);
  await setRepoSecret(name, content);
  info('Done');
};
