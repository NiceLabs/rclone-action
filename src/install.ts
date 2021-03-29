import { addPath, info } from '@actions/core';
import { downloadTool, extractZip } from '@actions/tool-cache';
import os from 'os';
import path from 'path';
import { github } from './shared';

export async function install() {
  info('Find latest release');
  const release = await getAssetURL();
  info(`Downloading only rclone binary from ${release.browser_download_url}`);
  const archivePath = await downloadTool(release.browser_download_url);
  info('Extracting ...');
  const extractedPath = await extractZip(archivePath, process.env.HOME);
  info('Add to PATH');
  const binPath = path.join(
    extractedPath,
    path.basename(release.name, path.extname(release.name))
  );
  addPath(binPath);
  info('Done');
}

const getAssetURL = async () => {
  const suffix = getAssetSuffix();
  const { data } = await github.repos.getLatestRelease({
    owner: 'rclone',
    repo: 'rclone',
  });
  const asset = data.assets.find(({ name }) => name.endsWith(suffix));
  if (asset === undefined) {
    throw new Error('The release file not found');
  }
  return asset;
};

const getAssetSuffix = () => {
  let platform = os.platform().toString();
  const arch = os.arch() === 'x64' ? 'amd64' : '386';
  if (platform === 'win32') {
    platform = 'windows';
  } else if (platform === 'darwin') {
    platform = 'osx';
  }
  return `-${platform}-${arch}.zip`;
};
